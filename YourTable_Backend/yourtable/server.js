require("dotenv").config();

//https://dev.to/carminezacc/user-authentication-jwt-authorization-with-flutter-and-node-176l

const express = require("express");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const passport = require("passport");
const session = require("express-session");
const Pool = require("pg").Pool;
const app = express();
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const serverPort = process.env.PORT || 8000;
const port = 5432; //db port

const pool = new Pool({
  user: "yfnktala",
  host: "tai.db.elephantsql.com",
  database: "yfnktala",
  password: "M81ZjaAvNDzWhIcTaxjfO2l__1ZJosAX",
  port: port,
});

app.use(bodyparser());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the API of YourTable!");
});

app.get("/trySelect/:id", (req, res) => {
  pool.query(
    "SELECT * FROM customer WHERE CUSTOMER_USERNAME = $1",
    [req.params.id],
    function (err, row) {
      console.log(row.rowCount);
      if (row.rowCount < 1) {
        res.status(409).send("There is no User with " + req.params.id);
      } else {
        res.status(201).send("There is a User with " + req.params.id);
      }
    }
  );
});

app.get("/reservations", (req, res) => {
  pool.query("SELECT * FROM RESERVATION", function (err, row) {
    if (row.rowCount < 1) {
      res.status(409).send(null);
    } else {
      res.status(200).json(row.rows);
    }
  });
});

app.get("/users", (req, res) => {
  if (verify(req)) {
    res.status(200).send("Allowed");
  } else {
    res.status(403).send("Forbidden");
  }
});

app.get("/bcrypt", async (req, res) => {
  res.send(await bcrypt.hash("Passw0rd", 5));
});

app.post("/users/register", express.urlencoded(), async function (req, res) {
  const salt = Math.trunc(Math.random() * 20 + 10);
  const hashedPW = await bcrypt.hash(req.body.password, salt);
  console.log("register");
  pool.query(
    "SELECT FROM CUSTOMER WHERE CUSTOMER_EMAIL = $1",
    [req.body.email],
    function (err, row) {
      if (err) {
        console.log(err);
        res.status(401).send(err);
        return;
      }
      if (row.rowCount > 0) {
        console.error("can't create user " + req.body.email);
        res.status(409).send("An user with that username already exists");
      } else {
        console.log("Can create user " + req.body.email);
        pool.query(
          "INSERT INTO CUSTOMER(CUSTOMER_FIRSTNAME,CUSTOMER_SECONDNAME,CUSTOMER_EMAIL,CUSTOMER_USERNAME,CUSTOMER_PASSWORD,CUSTOMER_PHONE,CUSTOMER_SALT) VALUES  ($1, $2, $3, $4, $5, $6,$7)",
          [
            "Sample",
            "Name",
            req.body.email,
            req.body.email.split("@")[0],
            hashedPW,
            "+435633432422",
            salt,
          ],
          (error, results) => {
            if (error) {
              console.log(error);
              res.status(403);
            } else {
              login(req.body.email, req.body.password, res);
              console.log("User created!!");
            }
          }
        );
      }
    }
  );
});

const login = (username, password, res) => {
  console.log("Trying to login with " + username + " and " + password);
  pool.query(
    `Select * from customer where (${
      username.split("@").length > 0 ? "customer_email" : "customer_username"
    }) = ($1)`,
    [username],
    async (error, results) => {
      if (error) {
        console.log("Error: " + error);
        return;
      }

      bcrypt.compare(
        password,
        results.rows[0].customer_password,
        function (err, result) {
          if (result) {
            var payload = {
              username: username,
            };
            var token = jwt.sign(payload, process.env.TOKEN_SECRET, {
              algorithm: "HS256",
              expiresIn: "1d",
            });
            console.log("Success");
            console.log(token);
            res.status(200).send(token);
          } else {
            console.log("Error: " + err);
            res.status(403).send(null);
          }
        }
      );
    }
  );
};

app.post("/users/login", express.urlencoded(), async function (req, res) {
  console.log("login");
  login(req.body.email, req.body.password, res);
});

const verify = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  try {
    jwt.verify(token, process.env.TOKEN_SECRET, { algorithm: "HS256" });
    return true;
  } catch {
    return false;
  }
};

app.listen(serverPort, () => {
  console.log("Server successfully running on port " + serverPort);
});

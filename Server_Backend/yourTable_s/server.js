if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

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
const serverPort = process.env.serverPort || 8000;
const port = 5432; //db port

const pool = new Pool({
  user: "postgres",
  host: "193.170.109.2",
  database: "postgres",
  password: "vKK7SyQLcJ6cI0p3h0iG",
  port: port,
});

app.use(bodyparser());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("", (req, res) => {
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

app.get("/users", (req, res) => {
  if (verify(req)) {
    res.send("lol");
  } else {
    res.status(403).send("Du Hund");
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
        res.status(401);
        res.send(err);
        return;
      }
      if (row.rowCount > 0) {
        console.error("can't create user " + req.body.email);
        res.status(409);
        res.send("An user with that username already exists");
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
              res.status(201);
              res.send("Success");
              console.log("User created!!");
            }
          }
        );
      }
    }
  );
});

const login = (username, password) => {};

app.post("/users/login", express.urlencoded(), async function (req, res) {
  pool.query(
    "Select salt from users where username = $1",
    [req.body.username],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      const hashedPW = await bcrypt.hash(req.body.password, 5);
      console.log("Login: ");
      console.log(hashedPW);
      pool.query(
        "SELECT * FROM CUSTOMER WHERE (CUSTOMER_EMAIL) = ($1)",
        [req.body.email],
        (error, results) => {
          if (results.rowCount > 0) {
            bcrypt.compare(
              req.body.password,
              results.rows[0].customer_password,
              function (err, result) {
                if (result) {
                  console.log(result);
                  var payload = {
                    username: req.body.email,
                  };
                  var token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: "15d",
                  });
                  console.log("Success");
                  console.log(token);

                  res.send(token);
                } else {
                  console.log(result);
                  console.log(err);
                  res.status(403).send(null);
                }
              }
            );
          } else {
            console.error("Failure: " + error);
            res.status(401);
            res.send("Wrong Userdata");
          }
        }
      );
    }
  );
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

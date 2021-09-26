if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//https://dev.to/carminezacc/user-authentication-jwt-authorization-with-flutter-and-node-176l

const express = require('express')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const passport = require('passport')
const session = require('express-session')
const Pool = require('pg').Pool
const app = express()
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken');
const serverPort = process.env.serverPort || 8000;
const port = 5432; //db port

const pool = new Pool({
    user: 'postgres',
    host: '34.141.62.161',
    database: 'postgres',
    password: 'Admin1',
    port: port
})

app.use(bodyparser())
app.use(bodyparser.urlencoded({extended: true}))

app.get('',(req,res)=>{
    res.send("Welcome to the API of YourTable!");
})

app.get('/users', (req, res) => {
    if(verify(req)){
        res.send("lol")
    }
    else {
        res.status(403).send("forbidden")
    }
})


app.post('/users/register', express.urlencoded(),async function(req, res) {

    const salt = Math.random()*20+10
    const hashedPW = await bcrypt.hash(req.body.password,salt)

    pool.query("SELECT FROM users WHERE username = $1", [req.body.username], function(err, row) {
        if(row != undefined ) {
            console.error("can't create user " + req.body.username);

            res.status(409);
            res.send("An user with that username already exists");
        } else {
            console.log("Can create user " + req.body.username);
            pool.query('INSERT INTO users (_name, email, username, _password,  salt) VALUES ($1, $2, $3, $4, $5)', [req.body.name, req.body.email, req.body.username, hashedPW, salt], (error, results) => {
                if (error) {
                    console.log(error)
                    res.status(403);
                }
                else{
                    res.status(201);
                    res.send("Success");
                }

            })

        }
    });
});

app.post('/users/login', express.urlencoded(),async function(req, res) {
    //pool.query('Select salt from users where username = $1',[req.body.username], async (error, results) => {
        //if(error){
        //    console.log(error)
        //}
        //console.log(results.rows[0].salt);
        //const hashedPW = await bcrypt.hash(req.body.password,results.rows[0].salt) ;
        //pool.query("SELECT * FROM users WHERE (username, _password) = ($1, $2)", [req.body.username, hashedPW], (error, results)=> {
         //   if(results != undefined ) {
              var payload = {
                   username: req.body.username,
                };
                var token = jwt.sign(payload, "abc", {algorithm: 'HS256', expiresIn: "15d"});
                console.log("Success");
    console.log(token)

    res.send(token);
            //} else {
              //  console.error("Failure"+error);
            //    res.status(401)
          //      res.send("There's no user matching that");
         //   }
        //});
   // })
});

const verify = (req) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)


    try {
        jwt.verify(token, "abc", {algorithm: 'HS256'});
        return true
    } catch {
        return false
    }
}


app.listen(serverPort, () =>{
    console.log("Server successfully running on port "+serverPort);
})










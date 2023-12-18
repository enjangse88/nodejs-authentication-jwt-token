//import http from "http";
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.listen('3000', () => {console.log("Server berjalan di port 3000");}) 

app.get('/', (req, res) => {
    console.log("Hello world");
    res.json({message:"Hello world"})
})

/*app.post('/', (req, res) => {
    res.json({message: "Hello world Post"})
})*/

app.post('/', verifiedUser, (req, res) => {
    res.json({
        message: "User berhasil terverifikasi",
    })
})

app.post('/login', (req, res) => {
    const user = {
        id : 1,
        username : "xxyyxx",
        email: "xxxx@yyy.com"

    }
    jwt.sign(user, 'secret', (err, token) => {
        if (err) {
            console.log(err);
            res.sendStatus(304);
            return 

        }
        const Token = token;
        res.json({
            user: user,
            token: Token
        })
    })
    //res.json({message: "login"})
})


// function use sync
function verifiedUser(req, res, next) {
    const bearer = req.headers.bearer; 
    jwt.verify(bearer, 'secret', (err, data) => {
        if (err) {
            console.log(err.message);
            res.json(err);
            return
        }
        req.body = data;
        next()
    }) 
}
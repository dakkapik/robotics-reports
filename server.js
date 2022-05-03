const express = require('express')
const app = express()
require('dotenv').config()
require('./db')
const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/' , (req , res)=>{
    res.sendFile(__dirname, "index.html");
})

app.post('/report' , (req , res)=>{
    
    console.log(req.body)
    res.send("thanks for reporting ", req.body.name)
})

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))

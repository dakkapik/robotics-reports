const router = require('express').Router()
const { networkInterfaces } = require('os')
const User = require('../model/User')

const nets = networkInterfaces()
const results = {}

for(const name of Object.keys(nets)){
    for(const net of nets[name]){
        if(net.family === 'IPv4' && !net.internal){
            if(!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address)
        }
    }
}

const address = "http://" + Object.values(results)[0] + ":" + process.env.PORT

router.get('/' , (req , res)=> res.render("index", { address }))
router.get('/new-user' , (req , res)=> res.render("new-user", { address }))
router.get('/post-report' , (req , res)=> {
    User.find({}, 
    (err, docs) => {
        if(err){
            console.log(`Error: ` + err)
        } else{
            if(docs.length === 0){
                console.log("> User not found on this database")
            } else{
                res.render("post-report", { address, users: docs })
            }
        }
    });
})

module.exports  = router
const router = require('express').Router()
const {User} = require('../model/User')
const address = require('../util/address')

router.get('/' , (req , res)=> res.render("index", { address }))
router.get('/new-user' , (req , res)=> res.render("new-user", { address }))
router.get('/post-report' , (req , res)=> {
    User.find({}, 
    (err, docs) => {
        if(err){
            res.render("index", {address, error: err})
            console.log(`Error: ` + err)
        } else{
            if(docs.length === 0){
                res.render("index", {address, error: "No users found in current database"})
                console.log("> User not found on this database")
            } else{
                res.render("post-report", { address, users: docs , message: ""})
            }
        }
    });
})

module.exports  = router
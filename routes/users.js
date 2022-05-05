const router = require('express').Router()
const User = require("../model/User")

router.get('/' , (req , res)=>{
    User.find({}, (err, docs) => {
       if(err){
           console.log(`Error: ` + err)
       } else{
         if(docs.length === 0){
             console.log("> No users are in current DataBase")
         } else{
           res.send(docs)
         }
       }
    });
})

router.post('/' , (req , res)=>{

  const createUser = (doc) => {
    if (doc !== []) {
      User.create(req.body)
      .then((docs) => res.send(docs))
    } else{
      console.log("THIS HAPPENED")
      //send what part exists
      res.send("ERROR user already exists").status(400)
    }
  }

  User.find({$or:[{email: req.body.email}, {mobile: req.body.mobile}]})
  .then( createUser )
  .catch(err => {
    console.error("ERROR: ", err)
    res.send("ERROR: ", error).status(400)
  })
  
})

module.exports  = router
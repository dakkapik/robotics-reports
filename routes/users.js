const router = require('express').Router()
const { User, validateUser } = require("../model/User")
const sec = require("../util/sec")
const address = require("../util/address")

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

router.post('/' , async (req , res)=>{
  try {
    const { error } = validateUser(req.body)
    if(error) return res.render("index", {address, error: error})

    let user = await User.findOne({$or:[{email: req.body.email}, {mobile: req.body.mobile}]})

    if(user !== null) return res.render("index", {address, error: user + "user already exists"})

    // console.log("THIS HAPPENED")
    sec.cryptPassword(req.body.password, (err, pswrd) => {
      if(err) throw new Error(err)
      else {
        user = {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          password: pswrd
        }

        User.create(user)
        .then((docs) => res.render("index", {address, error: ""}))
        .catch(error => console.error(error))
      }
    })
  } catch(err) {
    console.error(err)
    res.render("index", {address, error: "UNKNOWN: ",err})
    // res.sendStatus(400)
  }
})

module.exports  = router
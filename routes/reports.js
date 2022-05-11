const router = require('express').Router()
const { Report, validateReport } = require("../model/Report")
const { User } = require("../model/User")
const { comparePassword } = require("../util/sec")
const address = require("../util/address")

router.get('/' , (req , res)=>{
    Report.find({}, (err, docs) => {
       if(err){
           console.log(`Error: ` + err)
       } else{
         if(docs.length === 0){
             console.log("No reports found in this database")
         } else{
           res.send(docs)
         }
       }
    });
})

router.post('/' , (req , res)=>{
    const { error } = validateReport({user_id: req.body.user_id, goals: req.body.goals, results: req.body.results})
    if(error) res.send({ error })

    User.findById(req.body.user_id).then(user => {
        
        comparePassword(req.body.password, user.password, (err, match) => {
            if(err) res.send({ error })
            if(match){
                let report = {
                    user_id: req.body.user_id,
                    goals: req.body.goals,
                    results: req.body.results
                }
    
                Report.create(report).then(report => res.send(report))
                
            } else {
                res.send({error: "password is not correct for " +  user.name})
            }
        })
    })
})

module.exports  = router;
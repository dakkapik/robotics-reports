const router = require('express').Router()
const { Report, validateReport } = require("../model/Report")
const { User } = require("../model/User")
const { comparePassword } = require("../util/sec")
const moment = require("moment-timezone")

router.get('/:page' , async (req , res)=>{
    const recordLimit = 10

    try{
        const reports = await Report
        .find()
        .sort([['_id', -1]])
        .skip(recordLimit * req.params.page)
        .limit(recordLimit)

        const docCount = await Report.countDocuments({})

        const usersReq = reports.map((report) => User.findById(report.user_id).select({name: 1, email: 1, mobile: 1}))

        const users = await Promise.allSettled(usersReq)

        const rep = reports.map((report, index) => Object.assign({}, {report, author: users[index].value}))
        // users
        //     .filter(({status}) => status === 'rejected')
        //     //better rejection method
        //     .forEach(({reason}) => console.error(reason))
        
        // const data = reports
        //     .filter((report, index)=> users[] ==='fulfilled')
        //     .map(({value}, index) => reports[index].author = value)

        //better rejection method
        res.send({ records: rep , pageCeil: Math.ceil(docCount / recordLimit)})

        // stop request at max number of records 

    } catch (err) {
        console.error("REPORT GET ERROR: ", err)
    }
})

router.post('/' , (req , res)=>{
    if(req.body.user_id === "REPORTER NAME") return res.send({error: "must select an reporter and type password"})// this was a quick fix, should review
    // cannot spam submmit reports, only one report for day
    const { error } = validateReport({user_id: req.body.user_id, goals: req.body.goals, results: req.body.results})
    if(error) return res.send({ error })

    User.findById(req.body.user_id).then(async ( user ) => {
        const duplicate = await Report.find({user_id: user._id, date: moment().tz("America/New_York").format("DD-MM-YYYY")})
        if(duplicate.length !== 0) return res.send({error: "Cannot submit more than one report per day\nEdit report tool comming soon"})
        
        comparePassword(req.body.password, user.password, (err, match) => {
            if(err) return res.send({ error })
            if(match){
                let report = {
                    user_id: req.body.user_id,
                    goals: req.body.goals,
                    results: req.body.results
                }
    
                Report.create(report).then(report => res.send(report))
                
            } else {
                return res.send({error: "password is not correct for " +  user.name})
            }
        })
    })
})

module.exports  = router;
const router = require("express").Router();
const jwt = require("jsonwebtoken")
const Voter = require("../models/Voters")
const { loginValidation } = require("../Validator/validations")
const { voterauth } = require("./verifyToken")
const Candidates = require("../models/Candidates")
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const voter = await Voter.findOne({ email: req.body.email })
    if (!voter) {
        return res.status(401).send("Incorect Email")
    }
    if (voter.password === req.body.password) {
        const token = jwt.sign({ _id: voter._id, type: "voter" }, process.env.TOKEN_SECRET)
        return res.header('auth-token', token).send(token)
    }
    return res.status(401).send("Incorect Password")
})
router.post('/vote', voterauth, async (req, res) => {
    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    let voter =await Voter.findOne({_id:verified._id})
    if(voter.voted){
        return res.status(401).send("Only one Vote Allowed")
    }
    await Voter.findOneAndUpdate({_id:verified._id},{$set:{voted:true}},{ returnOrigninal: false }, (err, res) => {
        if (err) {
            return res.status(400).send("Vote Failed")
        }
        else{
            console.log("Success")
        }
        
    })
    await req.body.map(async data => {
        await Candidates.findOneAndUpdate({ email: data.candidateEmail }, { $inc: { votes: 0.5 } }, { returnOrigninal: false }, (err, res) => {
            if (err) {
                return res.status(400).send("Vote Failed")
            }
            else{
                console.log("Success")
            }
            
        })

    })
    
    console.log(verified._id)
    return res.status(200).send("Vote Casted")
})

module.exports = router
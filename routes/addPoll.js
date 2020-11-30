const router = require("express").Router();
const Polls = require("../models/Polls")
const Voters = require("../models/Voters")
const Candidates = require("../models/Candidates")
const {auth} = require("./verifyToken");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const {v4 : uuidv4} = require('uuid')

router.post("/",auth, async (req,res)=>{
    const token = req.header('auth-token');
    const verified = jwt.verify(token,process.env.TOKEN_SECRET);
    
    const poll = new Polls({
        admin:mongoose.Types.ObjectId(verified._id),
        title:req.body.title,
        positions:req.body.positions,
        voters:req.body.voters
    })
    // return res.send(req.body.positions)
    try {
        const savedPoll = await poll.save();
        req.body.voters.map(async voter=>{
            const vote = new Voters({
                poll:poll._id,
                voted:false,
                name:voter.name,
                email:voter.email,
                password:uuidv4(),
                year:voter.year
            })
            await vote.save();
       
        })
        return res.status(200).send(poll)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }
})
module.exports = router
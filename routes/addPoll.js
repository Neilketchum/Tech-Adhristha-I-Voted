const router = require("express").Router();
const Polls = require("../models/Polls")
const {auth} = require("./verifyToken");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
router.post("/",auth, async (req,res)=>{
    const token = req.header('auth-token');
    const verified = jwt.verify(token,process.env.TOKEN_SECRET);
    
    const poll = new Polls({
        admin:mongoose.Types.ObjectId(verified._id),
        title:"Student Council Elections",
        positions:[{
            name:"Vice President",
            candidates:[{
                name:"Nehal",
                email:"Nehal@gmail.com"
            },{
                name:"ayushman",
                email:"ayushman@gmail.com"
            }]
        },{
            name:"Gen Sec",
            candidates:[{
                name:"Daipayan Hati",
                email:"daipayanh@gmail.com"
            },{
                name:"Ravi",
                email:"Ravi@gmail.com"
            }]
        }]
    })
    try {
        const savedPoll = await poll.save();
        return res.status(200).send(savedPoll.admin)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }
})
module.exports = router
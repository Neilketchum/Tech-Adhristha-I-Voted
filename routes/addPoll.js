const router = require("express").Router();
const Polls = require("../models/Polls")
const Voters = require("../models/Voters")
const Candidates = require("../models/Candidates")
const { auth } = require("./verifyToken");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const { v4: uuidv4 } = require('uuid')

router.post("/", auth, async (req, res) => {
    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    const poll = new Polls({
        admin: mongoose.Types.ObjectId(verified._id),
        title: req.body.title,
        positions: req.body.positions,
        voters: req.body.voters
    })
    // return res.send(req.body.positions)
    try {
        const savedPoll = await poll.save();
        req.body.voters.map(async voter => {
            const vote = new Voters({
                poll: poll._id,
                voted: false,
                name: voter.name,
                email: voter.email,
                password: uuidv4(),
                year: voter.year
            })
            let transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'neilketchumdev@gmail.com',
                    pass:process.env.MAIL_PASS
                }
            });
            let mailOptions = {
                from:'neilketchumdev@gmail.com',
                to:vote.email,
                subject:'Test',
                text:`Please Vote For what you belive in.Use this email and your password is ${vote.password}`
            }
            // send mail with defined transport object
           await transporter.sendMail(mailOptions,(err,data)=>{
                if(err){
                    console.log("Errore",err)
                }
                else{
                    console.log("Send")
                }
            })











            await vote.save();
        })
        req.body.positions.map(async post => {
            post.candidates.map(async (candidate) => {
                const person = new Candidates({
                    poll: poll._id,
                    position: post.name,
                    votes: 0,
                    name: candidate.name,
                    email: candidate.email,
                    description: candidate.description,
                    password: uuidv4(),
                })
                await person.save()
            })
        })
        return res.status(200).send(poll)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }
})
module.exports = router
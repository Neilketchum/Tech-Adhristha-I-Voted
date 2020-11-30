const router = require("express").Router();
const jwt = require("jsonwebtoken")
const Voter =  require("../models/Voters")
const {loginValidation} = require("../Validator/validations")
router.post('/login',async (req,res)=>{
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const voter = await Voter.findOne({ email: req.body.email })
    if(!voter){
        return res.status(401).send("Incorect Email")
    }
    if(voter.password === req.body.password){
        const token = jwt.sign({_id:voter._id,type:"voter"},process.env.TOKEN_SECRET) 
        return res.header('auth-token',token).send(token)
    }
    return res.status(401).send("Incorect Password")
})


module.exports = router
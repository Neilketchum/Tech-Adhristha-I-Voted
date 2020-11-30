const router = require("express").Router();
const User = require("../models/User")
const { registerValidation,loginValidation } = require('../Validator/validations')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res) => {
    // Validating Using JOI
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    //Checking if the User with same Email Exists
    const emailExist = await User.findOne({ email: req.body.email })
    if(emailExist){
       return res.status(401).send("Email Already Exists")
    }
    // Hash Password
    const salt = await bcrypt.genSalt(2)
    const hashPassword  = await bcrypt.hash(req.body.password,salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const savedUser = await user.save();
        return res.status(200).send(savedUser)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }
})
router.post('/login',async (req,res)=>{
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    //Checking if the User with same Email Exists
    const user = await User.findOne({ email: req.body.email })
    if(!user){
        return res.status(401).send("Incorect Email")
    }
    // Check of Password exists
    const validPas = await bcrypt.compare(req.body.password,user.password)
    if(!validPas){
        return res.status(401).send("Incorect Password")
    }
    // Create and assign a token
    const token = jwt.sign({_id:user._id,type:"user"},process.env.TOKEN_SECRET)
    

  
    return res.header('auth-token',token).send(token)
})



module.exports = router
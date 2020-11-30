const Joi = require("@hapi/joi")
// Register validations
const  registerValidation = (data)=>{
    const schema = {
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }
    return  Joi.validate(data,schema);
    
}
const  loginValidation = (data)=>{
    const schema = {
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }
    return  Joi.validate(data,schema);
    
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

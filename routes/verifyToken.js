const jwt = require("jsonwebtoken")
function auth(req,res,next){
    const token = req.header('auth-token');
    // console.log(token)
    if(!token){
        return res.status(401).send("Acces Denied")
    }
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified
        next();
    }catch(err){
        return res.status(400).send("Access Denied")
    }
}
module.exports.auth = auth
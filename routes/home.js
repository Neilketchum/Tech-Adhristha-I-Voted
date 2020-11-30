const router = require("express").Router();

const {auth} = require("./verifyToken")

router.get('/',(req,res)=>{
    res.json({
        posts:{
            title:"LOl",
            Desc:"LOLOLOLOl"
        },
        user:{
            user:req.user
        }
    })
})
module.exports = router
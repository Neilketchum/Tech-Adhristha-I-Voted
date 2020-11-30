const mongoose = require("mongoose")
const voterSchema = new mongoose.Schema({
    poll:{
        type:mongoose.Schema.Types.ObjectId,ref:"Poll",required:true
    },
    voted:{
        type:Boolean,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Voters",voterSchema)
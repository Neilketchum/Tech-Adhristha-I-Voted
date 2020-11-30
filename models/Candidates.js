const mongoose = require("mongoose")

const candidateSchema = new mongoose.Schema({
    poll:{
        type:mongoose.Schema.Types.ObjectId,ref:"Poll",required:true
    },
    position:{
        type:String,
        required:true
    },
    votes:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    password:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Candidates",candidateSchema)
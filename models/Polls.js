const  mongoose = require("mongoose")
const pollSchema = new mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",required:true
    },
    title:{
        type:String,
        required:true
    },
    positions:[{
        name:{
            type:String,
            required:true
        },
        candidates:[{
            name:{
                type:String,
                required:true,
            },
            email:{
                type:String,
                required:true
            }
        }]
    },],
    voters:[
        {
            name:{
                type:String,
                required:true,
            },
            email:{
                type:String,
                required:true
            },
            year:{
                type:Number,
                required:true
            }
        }
    ]

})
module.exports = mongoose.model('Poll', pollSchema);
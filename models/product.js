const {Schema, model} = require("mongoose");
const product = new Schema({
    name:{
        type:String,
        required:true
    },
    img: {
        type:String,
        required:true,
        default:''
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    type:{type:String, required:true},
    confirm:{type:Boolean, required:true, default:false},
    shortDescription:{type:String, required:true},
    condition:{
        type:String,
        required:true
    },
    date:{
        type:Date, required:true, default:new Date()
    },
    user:{
        type:Schema.Types.ObjectId, ref:'User', required:true
    }
})
module.exports = model('Product', product)
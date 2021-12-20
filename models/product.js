const {Schema, model} = require("mongoose");
const product = new Schema({
    title:{
        type:String,
        required:true
    },
    img:String,
    price:{
        type:Number,
        required:true
    },
    desk:{
        type:String,
        required:true
    },
    rated:{
        type:Number,
        required:false
    },
    typeProduct:{
        type:String,
        required:true
    }
})
module.exports = model('Product', product)
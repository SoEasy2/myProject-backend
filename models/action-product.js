const {Schema, model} = require('mongoose')
const ActionProduct = new Schema({
    adminName:{type:String, required:true},
    userId:{type:Schema.Types.ObjectId, required:true, ref:'User'},
    text:{type:String, required:true},
    date:{type:Date, default: new Date()}
})
module.exports = model('ActionProduct', ActionProduct)
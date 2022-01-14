const {Schema, model} = require('mongoose')
const Transactions = new Schema({
    date:{type:Date, default: new Date()},
    price:{type:Number, required:true},
    product:{type:Schema.Types.ObjectId, required:true, ref:'Product'},
    user:{type:Schema.Types.ObjectId, required:true, ref:'User'}
})
module.exports = model('Transactions', Transactions)
const {Schema, model} = require('mongoose')
const ResetPassword = new Schema({
    user:{type:Schema.Types.ObjectId, ref:'User'},
    date:{type:Date, require:true, default:new Date()},
    token:{type:String, require:true}
})
module.exports = model('ResetPassword',ResetPassword)
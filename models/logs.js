const {Schema, model} = require('mongoose')

const Logs = new Schema({
    user:{type:Schema.Types.ObjectId, ref:'User'},
    name:{type:String, require:true},
    date:{type:Date, require:true, default:new Date()
    }
})
module.exports = model('Logs',Logs)
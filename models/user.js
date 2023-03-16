const {Schema, model} = require("mongoose");


const userSchema = new Schema({
    avatar:{
        type:String,
        required:false,
        default:'images/default.png'
    },
    email:{
        type:String,
        required:true,
        minLength:5,
        maxLength:30,
        trim:true
    },
    password:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    date:{type:Date, default:new Date()},
    isActivated:{type:Boolean, default:false},
    activationLink:{type:String},
    roles:[{type:String, ref:'Role'}],
    actions:[{ref:'ActionProduct', required:false, type:Schema.Types.ObjectId}],
    product:[{ref:'Product', type:Schema.Types.ObjectId, required:false}],
    logs:[{ref:'Logs', type:Schema.Types.ObjectId, required:false}],
    transactions:[{ref:'Transactions', type:Schema.Types.ObjectId, required:false}],
    cart:{
        items:[{
            count:{
                type:Number,
                required:true,
                default:1
            },
            productId:{
                type:Schema.Types.ObjectId,
                ref:'Product',
                required:true
            }
        }
        ]
    }
})
module.exports = model('User',userSchema)
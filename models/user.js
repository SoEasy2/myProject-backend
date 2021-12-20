const {Schema} = require("mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        minLength:5,
        maxLength:15,
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
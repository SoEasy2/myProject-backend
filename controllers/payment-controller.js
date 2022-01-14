const productModel = require("../models/product");
const {v4: uuidv4} = require("uuid");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const userModel = require('../models/user')
const transactionsModel = require('../models/transactions')
const roleModel = require("../models/role");
class PaymentController {


    async payment(req, res, next) {
        try {
            const {idProduct, idUser, token} = req.body
            console.log(req.body)
            console.log(idUser)
            const user = await userModel.findById(idUser).populate({path:'transactions'})
            const product = await productModel.findById(idProduct);
            const transaction = await transactionsModel.create({price:+product.price, product, user})
            user.transactions = [...user.transactions, transaction]
            await user.save()
            product.isBuy = true;
            await product.save()
            const idempotencyKey = uuidv4()

            return stripe.customers.create({
                email: token.email,
                source: token.id,

            }).then(customer => {
                stripe.charges.create({
                    amount:+product.price * 100,
                    currency:'usd',
                    customer: customer.id,
                    receipt_email:token.email,
                    description:`Purchase of product ${product.name}`,
                    shipping: {
                        name:token.card.name,
                        address:{
                            country: token.card.address_country
                        }
                    }
                }, {idempotencyKey})
            }).then(result=>res.status(200).json(result))
        } catch (e) {
            next(e)
        }
    }
    async testAdmin(req,res,next){
        const user = await userModel.findOne({email:req.body.email})
        const userRole = await roleModel.findOne({value:'ADMIN'})
        user.roles = [...user.roles,userRole.value]
        await user.save()
    }
}

module.exports = new PaymentController()
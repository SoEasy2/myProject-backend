const productModel = require("../models/product");
const userModel = require('../models/user')
const actionsProduct = require('./actionsProduct/actionsProduct')
const actionModel = require('../models/action-product')
class AdminService{
    async getNotConfirmProduct(){
        const products = await productModel.find({confirm:false})
        return products
    }
    async setConfirmProduct(idProduct){
        const product = await productModel.findById(idProduct)
        const user = await userModel.findById(product.user)
        const action = {
            adminName:user.name,
            userId:user._id,
            text:actionsProduct.confirmProduct(product._id, user.name)
        }
        const actionDB = await actionModel.create(action);
        user.actions = [...user.actions, actionDB];
        await user.save()
        product.confirm = true
        await product.save()
        return product
    }


}
module.exports = new AdminService()
const productModel = require("../models/product");
const userModel = require('../models/user')
const actionsProduct = require('./actionsProduct/actionsProduct')
const actionModel = require('../models/action-product')
const UserListDto = require('../dtos/userList-dto')
const transactionsModel = require('../models/transactions')
const LastTransactionsDto = require('../dtos/lastTransactions-dto')

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
    async getAllUsers(){
        const users = await userModel.find().populate({path:'transactions'})
        const userList = users.map((item)=>new UserListDto(item))
        return userList
    }
    async getNewUsers(){
        const users = await userModel.find({}).sort('date').limit(4)
        return users;
    }
    async getLastTransactions(){
        const lastTransactions = await transactionsModel.find({}).populate({path:'user', select:'email avatar'}).sort('date').limit(3)
        const transactions = lastTransactions.map((item)=>new LastTransactionsDto(item))
        return transactions
    }


}
module.exports = new AdminService()
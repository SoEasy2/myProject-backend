const adminService = require('../service/admin-service')
class AdminController{
    async getNotConfirmProduct(req,res,next){
        try{
            const products = await adminService.getNotConfirmProduct()
            return res.json(products)
        }catch (e) {
            next(e)
        }
    }
    async setConfirmProduct(req,res,next){
        try{
            await adminService.setConfirmProduct(req.body._id)
            const products = await adminService.getNotConfirmProduct()
            return res.json(products)
        }catch (e) {
            next(e)
        }
    }
    async getAllUser (req,res,next){
        try{
            const users = await adminService.getAllUsers()
            return res.json(users)
        }catch (e) {
            next(e)
        }
    }
    async getNewUsers (req,res,next){
        try{
            const users = await adminService.getNewUsers()
            res.json(users)
        }catch (e) {
            next(e)
        }
    }
    async lastTransactions(req,res,next){
        try {
            const transactions = await adminService.getLastTransactions()
            console.log(transactions)
            return res.json(transactions)
        }catch (e) {
            next(e)
        }
    }
}
module.exports = new AdminController()
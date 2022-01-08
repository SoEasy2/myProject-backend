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
}
module.exports = new AdminController()
const ApiError = require('../exceptions/api-error')
const productService = require('../service/product-service')
class ProductController{
    async createProduct(req,res,next){
        try{
            const file = req.file ? req.file.path : 'images/noImage.png';
            const {refreshToken} = req.cookies;
            const userData = await productService.createProduct(req.body, file, refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async uploadImageProduct(req,res,next){
        console.log(req.file)
        console.log(req.body)
    }
    async getProduct(req,res,next){
        try {
            const products = await productService.getConfirmProduct()
            return res.json(products)
        }catch (e) {
            next(e)
        }
    }
}
module.exports = new ProductController();
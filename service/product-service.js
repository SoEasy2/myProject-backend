const productModel = require('../models/product')
const TokenDto = require("../dtos/user-dto");
const tokenService = require('./token-service');
const UserModel = require("../models/user");
const UserDto = require('../dtos/user-dto')
const ProductDto = require('../dtos/product-dto')
class ProductService{
    async createProduct(data, file, refreshToken){
        const token = await tokenService.findToken(refreshToken)
        const user = await UserModel.findById(token.user).populate({path:'actions'}).populate({path:'logs'})
        const obj = {
            name:data.name,
            price:+data.price,
            description:data.description,
            condition:data.condition,
            shortDescription:data.shortDescription,
            user:user._id,
            img:file,
            type:data.type
        }
        await productModel.create(obj)
        const tokenDto = new TokenDto(user)
        const tokens = tokenService.generateTokens({...tokenDto})
        await tokenService.saveToken(tokenDto.id, tokens.refreshToken)
        const userDto = new UserDto(user)
        return {
            ...tokens,
            user:userDto
        }
    }
    async getConfirmProduct(){
        const products = await productModel.find({confirm:true, isBuy:false}).populate({path:'user', select:'avatar email name phone'})
        return products
    }
    async uploadImageProduct(id,file){
        const product = await productModel.findById(id)
        product.img = file;
        await product.save()
        return true;
    }
    async getProductById(id){
        try{
            const product = await productModel.findOne({_id:id}).populate({path:'user', select:'avatar name phone'})
            if (!product) return null
            const productDto = new ProductDto(product)
            return productDto
        }catch (e) {
            return null
        }
    }

}
module.exports = new ProductService()
const UserModel = require('../models/user')
const TokenModel = require('../models/token-model')
const UserDto = require('../dtos/user-dto')
const tokenService = require("./token-service");
const TokenDto = require('../dtos/token-dto')
const ApiError = require("../exceptions/api-error");
const TransactionModel = require('../models/transactions')

class ProfileService{
    async uploadImg(refreshToken, img){
        const idUser = await TokenModel.findOne({refreshToken})
        const user = await UserModel.findById(idUser.user).populate({path:'actions'}).populate({path:'logs'})
        user.avatar = img;
        await user.save();
        const tokenDto = new TokenDto(user)
        const tokens = tokenService.generateTokens({...tokenDto})
        await tokenService.saveToken(tokenDto.id, tokens.refreshToken)
        const userDto = new UserDto(user)
        return {
            ...tokens,
            user:userDto
        }
    }
    async updateProfile(refreshToken, dto){
        const token = await tokenService.findToken(refreshToken)
        const verifyToken = await tokenService.validateRefreshToken(refreshToken)
        if(!verifyToken) throw ApiError.UnauthorizedError()
        const user = await UserModel.findById(token.user)
        await UserModel.findOneAndUpdate({_id:user._id}, dto)
        const tokenDto = new TokenDto(user)
        const tokens = tokenService.generateTokens({...tokenDto})
        await tokenService.saveToken(tokenDto.id, tokens.refreshToken)
        const userDto = new UserDto(user)
        return {
            ...tokens,
            user:userDto
        }
    }
    async getTransactionsUser(refreshToken){
        const token = await TokenModel.findOne({refreshToken})
        const transactions = await TransactionModel.find({user:token.user}).populate({path:'product'})
        return transactions
    }

}

module.exports = new ProfileService()
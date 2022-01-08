const UserModel = require('../models/user')
const TokenModel = require('../models/token-model')
const UserDto = require('../dtos/user-dto')
const tokenService = require("./token-service");
const TokenDto = require('../dtos/token-dto')

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

}

module.exports = new ProfileService()
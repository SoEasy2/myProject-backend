const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const roleModel = require('../models/role')
const UserDto = require('../dtos/user-dto')
const TokenDto = require('../dtos/token-dto')
const ApiError = require('../exceptions/api-error')

class UserService{
    async registration(email, password, name){
        const candidate = await UserModel.findOne({email})
        if (candidate){
            throw ApiError.BadRequest('User already')
        }
        const hashPassword = await bcrypt.hash(password,10)
        const activationLink = uuid.v4();
        const userRole = await roleModel.findOne({value:'USER'})
        const user = await UserModel.create({email,password:hashPassword,name, cart:{items:[]}, activationLink, roles:[userRole.value]})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        const tokenDto = new TokenDto(user)
        const tokens = tokenService.generateTokens({...tokenDto})
        await tokenService.saveToken(tokenDto.id, tokens.refreshToken)
        const userDto = new UserDto(user)
        return {
            ...tokens,
            user:userDto
        }
    }
    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest('Not correct link')
        }
        user.isActivated = true;
        await user.save();
    }
    async login(email,password){
        const user = await UserModel.findOne({email}).populate({path:'actions'}).populate({path:'logs', select:'name date'})
        if (!user) throw ApiError.BadRequest('USER.DOES_NOT_EXIST')
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) throw ApiError.BadRequest('INCORRECT.INCORRECT_PASSWORD')
        const tokenDto = new TokenDto(user)
        const tokens = tokenService.generateTokens({...tokenDto});
        await tokenService.saveToken(tokenDto.id, tokens.refreshToken)
        const userDto = new UserDto(user)
        return {
            ...tokens,
            user:userDto
        }
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken){
        if(!refreshToken) throw ApiError.UnauthorizedError();
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) throw ApiError.UnauthorizedError()
        const user = await UserModel.findById(tokenFromDb.user).populate({path:'actions'}).populate({path:'logs', select:'name date'})
        const tokenDto = new TokenDto(user)
        const tokens = tokenService.generateTokens({...tokenDto});
        await tokenService.saveToken(tokenDto.id, tokens.refreshToken);
        const userDto = new UserDto(user)
        return {
            ...tokens,
            user:userDto
        }
    }

}
module.exports = new UserService()
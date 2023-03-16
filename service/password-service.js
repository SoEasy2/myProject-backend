const UserModel = require('../models/user')
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api-error");
const TokenDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const logsService = require('./logs-service')
const PasswordModel = require('../models/reset-password')
const mailService =require('./mail-service')


class PasswordService {
    async changePassword(email, currentPassword, newPassword){
        const user = await UserModel.findOne({email}).populate({path:'actions'}).populate({path:'logs'})
        const isPassEquals = await bcrypt.compare(currentPassword, user.password);
        if (!isPassEquals) return false
        const hashPassword = await bcrypt.hash(newPassword,10)
        user.password = hashPassword;
        await user.save();
        await logsService.changePassword(email)
       return true
    }
    async resetPassword(email, password){
        const user = await UserModel.findOne({email}).populate({path:'logs'})
        const hashPassword = await bcrypt.hash(password, 10)
        user.password = hashPassword
        const log = await logsService.resetPassword(email)
        user.logs = [...user.logs, log]
        await user.save()
        return true
    }
    async generateTokenReset(email){
        const user = await UserModel.findOne({email})
        const token = await tokenService.generateTokenResetPassword({email:user.email, id:user._id})
        const record = await PasswordModel.findOne({user:user._id})
        const link = `${process.env.CLIENT_URL}/reset-password/${token}`
        if (record) {
            record.token = token
            await record.save()
            await mailService.sendResetToken(user.email, link)
            return true
        }
        await PasswordModel.create({user:user._id, token:token})
        await mailService.sendResetToken(user.email, link)
        return true

    }
    async checkedTokenReset(token){
       const checked = await PasswordModel.findOne({token})
        if(!checked) return null
        const verify = await tokenService.validateTokenResetPassword(token)
        if(!verify) return null
        const user = await UserModel.findById(checked.user)
        return user
    }
}
module.exports = new PasswordService();
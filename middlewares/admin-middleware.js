const tokenService = require('../service/token-service')
const ApiError = require('../exceptions/api-error')
const userModel = require('../models/user')
module.exports = async function (req,res,next){
   try{
       const {refreshToken} = req.cookies
       if (!refreshToken) return next(ApiError.UnauthorizedError())
       const token = await tokenService.findToken(refreshToken)
       const user = await userModel.findById(token.user)
       if (!user) return next(ApiError.BadRequest())
       if (user.roles.includes('ADMIN')) {
           next()
       }
       else return next(ApiError.BadRequest());
   }catch (e) {
       return next(ApiError.UnauthorizedError())
   }

}
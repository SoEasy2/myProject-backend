const passwordService = require("../service/password-service");

class PasswordController{
    async changePassword(req,res,next){
        try {
            const {email, currentPassword, newPassword} = req.body
            const response = await passwordService.changePassword(email,currentPassword,newPassword)
            return res.json(response)
        }catch (e) {
            next(e)
        }
    }
    async generateTokenReset(req,res,next){
        try{
            const {email} = req.body
            const token = await passwordService.generateTokenReset(email)
            return res.json(token)
        }catch (e) {
            next(e)
        }
    }
    async checkedToken(req,res,next){
      try{
          const user = await passwordService.checkedTokenReset(req.body.token)
          if (!user) return res.json(null)
          return res.json(user.email)
      }catch (e) {
          next(e)
      }
    }
    async resetPassword(req,res,next){
        try {
            const {email, password} = req.body
            const isChange = await passwordService.resetPassword(email, password)
           if (!isChange) return res.json(false)
            return res.json(true)
        }catch (e) {
            next(e)
        }
    }
}
module.exports = new PasswordController()
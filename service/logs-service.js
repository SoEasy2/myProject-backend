const UserModel = require('../models/user')
const LogsModel = require('../models/logs')

class LogsService{
    async changePassword(email){
       const user = await UserModel.findOne({email})
        const obj = {user:user._id, name:'Change password'}
        const log = await LogsModel.create(obj)
        user.logs = [...user.logs, log]
        await user.save()
    }
    async resetPassword(email){
        const user = await UserModel.findOne({email})
        const obj = {user:user._id, name:'Reset password'}
        const log = await LogsModel.create(obj)
        return log
    }

}
module.exports = new LogsService()
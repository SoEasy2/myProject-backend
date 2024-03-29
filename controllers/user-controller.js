const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
const profileService = require('../service/profile-service')
const roleModel = require('../models/role')


class UserController{
    async registration(req,res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) return next(ApiError.BadRequest('ERROR.ERROR_VALIDATE', errors.array()))
            const {email, password, name} = req.body
            const userData = await userService.registration(email,password, name)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async login(req,res, next){
        try{
            const {email,password} = req.body;
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async logout(req,res, next){
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken');
            return res.send(null);

        }catch (e) {
            next(e)
        }
    }

    async activate(req,res, next){
        try{
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        }catch (e) {
            next(e)
        }
    }
    async refresh(req,res, next){
        try{
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async uploadImg(req,res,next){
        try {
            const {refreshToken} = req.cookies;
            const userData = await profileService.uploadImg(refreshToken, req.file.path)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e){
            next(e)
        }
    }
    async getTransactionsUser(req,res,next){
        try{
            const {refreshToken} = req.cookies
            const userTransactions = await profileService.getTransactionsUser(refreshToken)
            res.json(userTransactions)
        }catch (e) {
            next(e)
        }
    }
    async updateProfile(req,res,next){
        try {
            const {refreshToken} = req.cookies
            const userData = await profileService.updateProfile(refreshToken, req.body)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async test(req,res,next){
        if(Object.keys(req.body).length) console.log(true)
        if(!req.body) console.log(false)
    }
}

module.exports = new UserController();
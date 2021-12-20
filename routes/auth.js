const nodemailer = require('nodemailer')
//const transporter = nodemailer
const {Router} = require('express')

const router = Router()

router.post('/login',async (req,res)=>{
    req.session.isAuthenticated = true;
    res.redirect('/')
})
module.exports = router;
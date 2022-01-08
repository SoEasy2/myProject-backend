const nodemailer = require('nodemailer')
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:+process.env.SMTP_PORT,
            secure:false,
            auth:{
                user:process.env.SMTP_USER,
                pass:process.env.SMTP_PASSWORD
            }
        })
    }
    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from:process.env.SMTP_USER,
            to:to,
            subject:'Account activation on ' + process.env.API_URL,
            text:'',
            html:
                `
                <div>
                    <h1>
                    To activate your account follow the link
                    </h1>
                    <a href="${link}">${link}</a>
                </div>
                `
        })
        return true
    }
    async sendResetToken(to, link){
        await this.transporter.sendMail({
            from:process.env.SMTP_USER,
            to:to,
            subject:'Reset password on ' + process.env.CLIENT_URL,
            text:'',
            html:
                `
                <div>
                    <h1>
                    To recover your password follow the link
                    </h1>
                    <a href="${link}">${link}</a>
                </div>
                `
        })
        return true
    }
}
module.exports = new MailService()
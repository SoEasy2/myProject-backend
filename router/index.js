const Router = require('express').Router
const userController = require('../controllers/user-controller')
const productController =require('../controllers/product-controller')
const adminController = require('../controllers/admin-controller')
const passwordController = require('../controllers/password-controller')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const fileMiddleware = require('../middlewares/file')
router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min:6, max:20}),
userController.registration)
router.post('/login', userController.login)
router.post('/logout', authMiddleware, userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.post('/upload', fileMiddleware.single('avatar') ,userController.uploadImg)
router.post('/create-product', productController.createProduct)
router.get('/get-product',  productController.getProduct)
router.post('/admin/getProduct', adminController.getNotConfirmProduct)
router.post('/admin/confirm-product', adminController.setConfirmProduct)
router.post('/reset-password', passwordController.resetPassword)
router.post('/generateToken-reset', passwordController.generateTokenReset)
router.post('/checked-token/', passwordController.checkedToken)
router.get('/test',userController.test)

module.exports = router;
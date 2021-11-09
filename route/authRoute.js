const authController = require('../controller/authController');
const router = require('express').Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/googlelogin', authController.googleLogin);
router.post('/resetpassword', authController.resetPassword);
router.post('/newpassword', authController.newPassword);

module.exports = router;

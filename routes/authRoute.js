const express = require('express');
const router = express.Router();
const { signup, login, verifyEmail, resendVerification } = require('../controllers/authController');


router.post('/register',signup);
router.post('/login',  login);
router.get('/verify/:token' , verifyEmail);
router.post("/resend-verification", resendVerification);


// router.get('/logout', protect , me);



module.exports = router;
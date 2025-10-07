const express = require('express');
const router = express.Router();
const { Usersignup, login, verifyEmail, resendVerification, Employersignup, Userlogin, Empoyerlogin } = require('../controllers/authController');


router.post('/user/register',Usersignup);
router.post('/user/login',  Userlogin);
// employer route--------------------------------
router.post('/employer/register',Employersignup);
router.post('/employer/login',  Empoyerlogin);
// router.get('/verify/:token' , verifyEmail);
// router.post("/resend-verification", resendVerification);


// router.get('/logout', protect , me);



module.exports = router;
const express = require('express');
const router = express.Router();
const { signup, login,  } = require('../controllers/authController');


router.post('/register',signup);
router.post('/login',  login);

// router.get('/logout', protect , me);



module.exports = router;
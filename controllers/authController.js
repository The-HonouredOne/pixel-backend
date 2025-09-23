const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { setTokens } = require('../middleware/authMiddleware')

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ status: false, msg: 'all fields are required' })
    const existinguser = await User.findOne({ email })
    if (existinguser) return res.status(409).json({ status: false, msg: 'email already in use' })

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed ,  role})
    await user.save()
    console.log('user created')
    res.status(201).json({ status: true, msg: "user created", user: { id: user._id, name: user.name, email: user.email, role: user.role } });

  } catch (error) {
    console.log(error)
     return res.status(500).json({ status: false, msg: 'Server error' });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ status: false, msg: 'All fields are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ status: false, msg: 'User not found' });

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword)
      return res.status(401).json({ status: false, msg: 'Invalid credentials' });

    //  Generate tokens-------------------------------------------------
    const { accessToken, refreshToken } = await setTokens(user);


    res.status(200).json({
      status: true,
      msg: 'Login successfully',
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};




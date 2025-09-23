const User = require('../models/User')

exports.profile = async (req, res) => {
  try {
    res.json({
      status: true,
      msg: "User profile fetched",
      user: req.user, 
    });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Server error" });
  }
};




exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;


    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },  
       { new: true }      
    );

    if (!updatedUser) return res.status(404).json({ status: false, msg: "User not found" });

    res.json({ status: true, msg: "Profile updated", user: updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};




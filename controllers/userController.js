const User = require('../models/User')

exports.profile = async (req, res) => {
  console.log("profile")
 try {
 
    const user = await User.findById(req.user.id).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }

    res.json({
      status: true,
      msg: "User profile fetched",
      user, 
    });
  } catch (error) {
    console.error("Profile error:", error.message);
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




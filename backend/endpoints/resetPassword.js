const express = require("express");
const { User } = require("../models/users");
const client = require("../mongodb");
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { token, password } = req.body;
    // Verify the token
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    // Update the user's password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  
    // Redirect to the login page or a success page
    return res.redirect('/login');
  });
  
module.exports = router;
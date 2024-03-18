const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { User, schema } = require("../models/User");


const handleGetUsers = async (req, res) => {
     const users = await User.find({});
     res.json(users);
}

const handleSignupUser = async (req, res) => {
     const { name, email, password } = req.body;
     const result = schema.validate(req.body);
     if (result.error) return res.json({ msg: result.error.details[0].message});
     const user = await User.findOne({ email: email });
     if (user) return res.json({ msg: "Email already exist"});
     const hashPassword = await bcrypt.hash(password, 10);
     const newUser = await User.create({
          name,
          email,
          password: hashPassword
     })
     const token = jwt.sign({userId: newUser._id}, "Vishal", { expiresIn: "1h" });
     res.send(token);
}

const handleSigninUser = async (req, res) => {
     const { email, password } = req.body;
     const schema = joi.object({
          email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
          password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
     });
     const result = schema.validate(req.body);
     if (result.error) return res.json({ msg: result.error.details[0].message });
     const user = await User.findOne({ email: email });
     if (!user) return res.json({ msg: "Email does not exist" });
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) return res.json({msg: "Invalid email of password"});
     const token = jwt.sign({userId: user._id}, "Vishal", {expiresIn: "1h"});
     res.json({token, user});
}

const handleResetPassword = async (req, res) => {
     const { password } = req.body;
     const schema = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required();
     const result = schema.validate(password);
     if (result.error) return res.json({ msg: result.error.details[0].message });
     const hashPassword = await bcrypt.hash(password, 10);
     await User.findByIdAndUpdate(req.user._id, { $set: { password: hashPassword } });
     res.json({ msg : "Password reset successfull" });
}


module.exports = {
     handleGetUsers,
     handleSignupUser,
     handleSigninUser,
     handleResetPassword,
}
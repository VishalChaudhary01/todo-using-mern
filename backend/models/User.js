const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     },
     resetToken: {
          type: String
     }
})

const schema  = joi.object({
     name: joi.string().min(3).required(),
     email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
     password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const User = mongoose.model("User", userSchema);

module.exports = {
     User,
     schema
}
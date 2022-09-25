const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const user = express.Router();
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  securityQuestion: {
    type: String,
    required: true,
  },
  securityAnswer: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("user", schema);

user.post("/", async (req, res) => {
  const opt = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
    securityQuestion: Joi.string().required(),
    securityAnswer: Joi.string().required(),
  }).validate(req.body);

  if (opt.error) {
    res.status(400).send(opt.error.details[0].message);
    return;
  }
  let alreadyUser = await User.findOne({ email: req.body.email });
  if (alreadyUser) {
    res.status(400).send("invalid username or password");
    return;
  }
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    securityQuestion: req.body.securityQuestion,
    securityAnswer: req.body.securityAnswer,
  });
  let salt = await bcrypt.genSalt(10);
  let hashed = await bcrypt.hash(user.password, salt);
  user.password = hashed;
  let result = await user.save();
  result = _.pick(result, [
    "_id",
    "name",
    "email",
    "securityQuestion",
    "securityAnswer",
  ]);
  res.send(result);
});

module.exports.user = user;
module.exports.User = User;

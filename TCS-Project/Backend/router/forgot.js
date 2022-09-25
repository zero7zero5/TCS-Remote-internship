const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("./users");
const Joi = require("joi");
const app = express.Router();

app.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(255).required(),
    securityQuestion: Joi.string().required(),
    securityAnswer: Joi.string().required(),
    newPassword: Joi.string().min(5).max(1024).required(),
  });
  const opt = schema.validate(req.body);
  if (opt.error) {
    res.status(400).send(opt.error.details[0].message);
    return;
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("No such user exists");
    return;
  }
  let input = {
    email: req.body.email,
    securityQuestion: req.body.securityQuestion,
    securityAnswer: req.body.securityAnswer,
    newPassword: req.body.newPassword,
  };
  if (
    user.securityQuestion !== input.securityQuestion ||
    user.securityAnswer !== input.securityAnswer
  ) {
    res.status(400).send("invalid security question or answer");
    return;
  }
  const item = await User.findById(user._id);

  let salt = await bcrypt.genSalt(10);
  let hashed = await bcrypt.hash(input.newPassword, salt);
  item.password = hashed;
  console.log(item.password);
  let ou = await item.save();
  res.send(ou);
});

module.exports = app;

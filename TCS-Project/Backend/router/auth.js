const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("./users");
const app = express.Router();
app.post("/", async (req, res) => {
  const opt = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(req.body);
  if (opt.error) {
    res.status(400).send(opt.error.details[0].message);
    return;
  }
  const email = await User.findOne({ email: req.body.email });
  if (!email) return res.status(400).send("invalid username or password");
  const validPassword = await bcrypt.compare(req.body.password, email.password);
  if (!validPassword)
    return res.status(400).send("invalid username or password");
  const token = jwt.sign(
    { name: email.name, email: email.email },
    "privatekey"
  );
  res.send(token);
});

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const app = express.Router();

const schema = new mongoose.Schema({
  swon: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

let Project = mongoose.model("project", schema);
app.post("/", async (req, res) => {
  const project = await Project.findOne({ swon: req.body.swon });
  if (project) {
    res.status(400).send("Project with this SWON Already Exist");
    return;
  }
  const sch = Joi.object({
    swon: Joi.string().min(5).max(5).required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    budget: Joi.number().required(),
    status: Joi.string().required(),
  });
  let p = new Project({
    swon: req.body.swon,
    name: req.body.name,
    description: req.body.description,
    budget: req.body.budget,
    status: req.body.status,
  });
  const validate = sch.validate(req.body);
  if (validate.error) {
    res.status(400).send(validate.error.details[0].message);
    return;
  }
  let opt = await p.save();
  res.send(opt);
});

app.get("/", async (req, res) => {
  let projects = await Project.find();
  res.send(projects);
});
app.delete("/:id", async (req, res) => {
  let deleted = await Project.findByIdAndDelete(req.params.id);
  res.send(deleted);
});
module.exports = app;

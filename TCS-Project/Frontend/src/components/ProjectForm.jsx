import React, { Component } from "react";
import Joi from "joi";
import { postProject } from "../services/projects";
import { toast } from "react-toastify";
class ProjectForm extends Component {
  state = {
    details: {
      swon: "",
      name: "",
      desc: "",
      budget: "",
      status: "Not Yet Started",
    },
    errors: {},
  };
  schema = Joi.object({
    swon: Joi.number().required(),
    name: Joi.string().required(),
    desc: Joi.string().required(),
    budget: Joi.number().required(),
    status: Joi.required(),
  });
  handleChange = (e) => {
    let details = { ...this.state.details };
    details[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ details: details });
  };
  validate = () => {
    let res = this.schema.validate(this.state.details, { abortEarly: false });
    if (!res.error) return null;
    let error = {};
    for (let i of res.error.details) {
      error[i.path[0]] = i.message;
    }
    return error;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let error = this.validate();
    this.setState({ errors: error || {} });
    if (error) return;
    try {
      await postProject(this.state.details);
      toast.success("Project Added Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location = "/home";
      }, 2000);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        return;
      }
    }
  };
  render() {
    return (
      <div className="container">
        <h1 className="my-4">Project Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="swon">SWON Number</label>
            <input
              onChange={this.handleChange}
              value={this.state.details.swon}
              type="number"
              className="form-control"
              id="swon"
              name="swon"
              placeholder="Enter SWON"
            />
            {this.state.errors.swon && (
              <div className="alert alert-danger">{this.state.errors.swon}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              onChange={this.handleChange}
              value={this.state.details.name}
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter Project Name"
            />
            {this.state.errors.name && (
              <div className="alert alert-danger">{this.state.errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea
              onChange={this.handleChange}
              value={this.state.details.desc}
              className="form-control"
              id="desc"
              name="desc"
              rows="3"
            ></textarea>
            {this.state.errors.desc && (
              <div className="alert alert-danger">{this.state.errors.desc}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input
              onChange={this.handleChange}
              value={this.state.details.budget}
              type="number"
              className="form-control"
              id="budget"
              name="budget"
              placeholder="Enter Budget"
            />
            {this.state.errors.budget && (
              <div className="alert alert-danger">
                {this.state.errors.budget}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">Select Status</label>
            <select
              onChange={this.handleChange}
              value={this.state.details.status}
              className="form-control form-select"
              id="status"
              name="status"
            >
              <option>Not Yet Started</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ProjectForm;

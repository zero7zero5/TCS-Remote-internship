import React, { Component } from "react";
import { toast } from "react-toastify";
import Joi from "joi";
import { register } from "../services/login";

class Register extends Component {
  state = {
    details: {
      name: "",
      email: "",
      password: "",
      securityQuestion: "In what city were you born?",
      securityAnswer: "",
    },
    errors: {},
  };
  schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(5)
      .max(255)
      .required(),
    password: Joi.string().min(5).max(1024).required(),
    securityQuestion: Joi.string().required(),
    securityAnswer: Joi.string().required(),
  });

  validate = () => {
    const res = this.schema.validate(this.state.details, { abortEarly: false });
    if (!res.error) return null;
    let error = {};
    for (let item of res.error.details) {
      error[item.path[0]] = item.message;
    }
    return error;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      await register(this.state.details);
      toast.success("Registration Successful", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("Email Already Exists", {
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
    setTimeout(() => {
      window.location = "/login";
    }, 2000);
  };
  handleChange = (e) => {
    let details = { ...this.state.details };
    details[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ details });
  };
  render() {
    return (
      <div className="container">
        <h1 className="mb-4 mt-4">Admin Registration</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={this.state.details.name}
              name="name"
              onChange={this.handleChange}
            />
            {this.state.errors.name && (
              <div className="alert alert-danger">{this.state.errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={this.state.details.email}
              name="email"
              onChange={this.handleChange}
            />
            {this.state.errors.email && (
              <div className="alert alert-danger">
                {this.state.errors.email}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={this.state.details.password}
              name="password"
              onChange={this.handleChange}
            />
            {this.state.errors.password && (
              <div className="alert alert-danger">
                {this.state.errors.password}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">
              Select Security Qyestion
            </label>
            <select
              className="form-control form-select"
              id="exampleFormControlSelect1"
              value={this.state.details.securityQuestion}
              name="securityQuestion"
              onChange={this.handleChange}
            >
              <option>In what city were you born?</option>
              <option>What is the name of your favorite pet?</option>
              <option>What is the name of the favorite sports team?</option>
              <option>What high school did you attend?</option>
              <option>What was your favorite food as a child?</option>
            </select>
            {this.state.securityQuestion && (
              <div className="alert alert-danger">
                {this.state.errors.securityQuestion}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="securityAnswer">Enter Security Answer</label>
            <input
              className="form-control"
              id="securityAnswer"
              placeholder="Enter security answer"
              value={this.state.details.securityAnswer}
              name="securityAnswer"
              onChange={this.handleChange}
            />
            {this.state.errors.securityAnswer && (
              <div className="alert alert-danger">
                {this.state.errors.securityAnswer}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Register;

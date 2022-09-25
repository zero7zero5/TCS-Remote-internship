import React, { Component } from "react";
import Joi from "joi";
import { toast } from "react-toastify";
import { forgot } from "./../services/forgot";
class FogotPassword extends Component {
  state = {
    details: {
      email: "",
      securityQuestion: "In what city were you born?",
      securityAnswer: "",
      newPassword: "",
    },
    errors: {},
  };
  schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    securityQuestion: Joi.string().required(),
    securityAnswer: Joi.string().required(),
    newPassword: Joi.string().min(5).required(),
  });
  validate = () => {
    let opt = this.schema.validate(this.state.details, { abortEarly: false });
    if (!opt.error) return null;
    let errors = {};
    for (let i of opt.error.details) {
      errors[i.path[0]] = i.message;
    }
    return errors;
  };
  handleChange = (e) => {
    let details = { ...this.state.details };
    details[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ details });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      await forgot(this.state.details);
      toast.success("Password Change Successful", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
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
    setTimeout(() => {
      window.location = "/login";
    }, 2000);
  };
  render() {
    return (
      <div className="container">
        <h1 className="my-4">Reset Password</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              onChange={this.handleChange}
              name="email"
              value={this.state.details.email}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            {this.state.errors.email && (
              <div className="alert alert-danger">
                {this.state.errors.email}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">
              Select Security Question
            </label>
            <select
              onChange={this.handleChange}
              value={this.state.details.securityQuestion}
              className="form-control form-select"
              id="exampleFormControlSelect1"
              name="securityQuestion"
            >
              {this.state.errors.securityQuestion && (
                <div className="alert alert-danger">
                  {this.state.errors.securityQuestion}
                </div>
              )}
              <option>In what city were you born?</option>
              <option>What is the name of your favorite pet?</option>
              <option>What is the name of the favorite sports team?</option>
              <option>What high school did you attend?</option>
              <option>What was your favorite food as a child?</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="securityAnswer">Security Answer</label>
            <input
              onChange={this.handleChange}
              name="securityAnswer"
              className="form-control"
              id="securityAnswer"
              placeholder="Enter Security Answer"
              value={this.state.details.securityAnswer}
            />
            {this.state.errors.securityAnswer && (
              <div className="alert alert-danger">
                {this.state.errors.securityAnswer}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              onChange={this.handleChange}
              name="newPassword"
              value={this.state.details.newPassword}
              type="password"
              className="form-control"
              id="password"
              placeholder="New Password"
            />
            {this.state.errors.newPassword && (
              <div className="alert alert-danger">
                {this.state.errors.newPassword}
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

export default FogotPassword;

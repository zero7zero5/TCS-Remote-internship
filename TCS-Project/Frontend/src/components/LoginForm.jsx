import React, { Component } from "react";
import { authentication } from "./../services/auth";
import { toast } from "react-toastify";
import Joi from "joi";

import { NavLink } from "react-router-dom";
class LoginForm extends Component {
  state = {
    details: {
      email: "",
      password: "",
    },
    errors: {},
  };
  schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  });
  handleChange = (e) => {
    let details = { ...this.state.details };
    details[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ details });
  };
  validate = () => {
    let res = this.schema.validate(this.state.details, { abortEarly: false });
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
      let res = await authentication(this.state.details);
      localStorage.setItem("token", res.data);
      toast.success("Loggin in...", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("Invalid username or password", {
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
      window.location = "/";
    }, 2000);
  };
  render() {
    return (
      <div className="container">
        <h1 className="mb-4 mt-4">Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              value={this.state.details.email}
              onChange={this.handleChange}
              name="email"
              className="form-control"
              id="exampleInputEmail1"
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
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              value={this.state.details.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            {this.state.errors.password && (
              <div className="alert alert-danger">
                {this.state.errors.password}
              </div>
            )}
          </div>
          <div>
            <NavLink to="/register"> New User?</NavLink>

            <span className="mx-3">
              <NavLink to="/forgot"> Forgot Password?</NavLink>
            </span>
          </div>
          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

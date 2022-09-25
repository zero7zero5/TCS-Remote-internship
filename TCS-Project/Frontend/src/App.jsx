import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import Home from "./components/Home";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import FogotPassword from "./components/ForgotPassword";
import ProjectForm from "./components/ProjectForm";
import jwtDecode from "jwt-decode";
class App extends Component {
  state = {};
  componentDidMount() {
    try {
      let name = localStorage.getItem("token");
      let user = jwtDecode(name);
      this.setState({ user });
    } catch (error) {}
  }
  render() {
    return (
      <div>
        <React.Fragment>
          <ToastContainer />
          <NavBar user={this.state.user} />
          <div>
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={Register} />
              <Route path="/new" component={ProjectForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/forgot" component={FogotPassword} />
              <Route
                path="/home"
                render={(props) => <Home {...props} user={this.state.user} />}
              />
              <Redirect from="/" exact to="/home" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default App;

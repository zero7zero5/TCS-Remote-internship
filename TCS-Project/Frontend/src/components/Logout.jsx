import { Component } from "react";
import { toast } from "react-toastify";
class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    alert("Logout Successfully");
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;

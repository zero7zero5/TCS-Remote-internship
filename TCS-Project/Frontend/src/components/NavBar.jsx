import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import React, { Component } from "react";
class NavBar extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
              <b>Project Manager</b>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <NavLink
                  style={{ textDecoration: "none", color: "grey" }}
                  to="/"
                >
                  Home
                </NavLink>
              </Nav.Link>
              <Nav.Link>About us</Nav.Link>
              {!this.props.user && (
                <React.Fragment>
                  <Nav.Link>
                    <NavLink
                      style={{ textDecoration: "none", color: "grey" }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <NavLink
                      style={{ textDecoration: "none", color: "grey" }}
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </Nav.Link>
                </React.Fragment>
              )}

              {this.props.user && (
                <React.Fragment>
                  <Nav.Link>
                    <NavLink
                      style={{ textDecoration: "none", color: "grey" }}
                      to="/logout"
                    >
                      Logout
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link>{`Welcome Back ${this.props.user.name} !`}</Nav.Link>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;

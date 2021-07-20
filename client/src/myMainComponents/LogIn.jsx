import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      loggedIn: false,
      redirect: false,
    };

    // binding states
    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeLoggedIn = this.changeLoggedIn.bind(this);
  }

  // change states
  changeUserName(event) {
    this.setState({
      userName: event.target.value,
    });
  }
  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  changeLoggedIn(bool) {
    this.setState({
      loggedIn: bool,
    });
  }
  changeRedirect(bool) {
    this.setState({
      redirect: bool,
    });
  }

  btnLoginClicked = (event) => {
    event.preventDefault();

    if (this.state.userName === "" || this.state.password === "") {
      alert("Fields Can not be empty");
    } else {
      let loginUser = {
        userName: this.state.userName,
        password: this.state.password,
      };

      axios
        .post("/app/login", loginUser)
        .then((response) => {
          if (Object.keys(response.data).length === 0) {
            this.changeLoggedIn(true);
          } else {
            // change state varibales comming from this.props
            this.props.changeLoggedIn(true);
            this.props.changeUserDetails(response.data);
            // setting local variables
            localStorage.setItem("userDetails", JSON.stringify(response.data));
            localStorage.setItem("loggedIn", true);
            this.changeRedirect(true);
          }
        });
    }
  };

  render() {
    return (
      <div className="container">
        <div
          className="rounded border border-5 p-4 shadow"
          style={{ width: "50%", margin: "20px auto" }}
        >
          <h2 className="text-center text-primary">Login</h2>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={this.state.userName}
              onChange={(e) => {
                this.changeLoggedIn(false);
                this.changeUserName(e);
              }}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => {
                this.changeLoggedIn(false);
                this.changePassword(e);
              }}
            />
            <label htmlFor="floatingInput">Password</label>
          </div>
          <div className="d-grid gap-2 col-3 mx-auto">
            <button
              type="button"
              className="btn btn-primary p-3"
              onClick={this.btnLoginClicked}
            >
              Login
            </button>
          </div>
          {!this.state.loggedIn ? null : (
            <p className="fs-5 text-danger">Invalid Login Details</p>
          )}
          {this.state.redirect ? <Redirect to={"/showuserads"} /> : null}
        </div>
      </div>
    );
  }
}

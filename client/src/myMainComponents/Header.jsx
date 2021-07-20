import React, { Component } from "react";
import { Link } from "react-router-dom";

//myExtraComponents import
import HeaderButton from "../myExtraComponents/HeaderButton";
import UsernameHeaderButton from "../myExtraComponents/UsernameHeaderButton";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      logInButton: false,
      signUpButton: false,
    };
    this.changeStateLogInButton = this.changeStateLogInButton.bind(this);
    this.changeStateSignUpButton = this.changeStateSignUpButton.bind(this);
    this.onClickLoginSignup = this.onClickLoginSignup.bind(this);
  }
  changeStateLogInButton(boolState) {
    this.setState({
      logInButton: boolState,
    });
  }
  changeStateSignUpButton(boolState) {
    this.setState({
      signUpButton: boolState,
    });
  }
  onClickLoginSignup = (logInButton, signUpButton) => {
    this.changeStateLogInButton(logInButton);
    this.changeStateSignUpButton(signUpButton);
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => this.onClickLoginSignup(false, false)}
          >
            Olx-Clone
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <HeaderButton
                buttonText={"Home"}
                url={"/"}
                onClickLoginSignup={this.onClickLoginSignup}
                logIn={false}
                signUp={false}
              />
              {this.props.loggedIn === true ? (
                <UsernameHeaderButton
                  userName={this.props.userDetails.userName}
                  onClickLoginSignup={this.onClickLoginSignup}
                />
              ) : (
                <>
                  {this.state.logInButton === false ? (
                    <HeaderButton
                      buttonText={"Login"}
                      url={"/login"}
                      onClickLoginSignup={this.onClickLoginSignup}
                      logIn={true}
                      signUp={false}
                    />
                  ) : null}
                  {this.state.signUpButton === false ? (
                    <HeaderButton
                      buttonText={"SignUp"}
                      url={"/signup"}
                      onClickLoginSignup={this.onClickLoginSignup}
                      logIn={false}
                      signUp={true}
                    />
                  ) : null}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

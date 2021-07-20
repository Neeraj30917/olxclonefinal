import React, { Component } from "react";
import axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      userName: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      isSignedUp: false,
      passwordMatched: false,
      signUpClicked: false,
      otp: "",
      details: "",
    };
    // bindings
    this.changeFullName = this.changeFullName.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.changeMobileNumber = this.changeMobileNumber.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.changeIsSignedUp = this.changeIsSignedUp.bind(this);
    this.changePasswordMatched = this.changePasswordMatched.bind(this);
    this.btnSignUpClicked = this.btnSignUpClicked.bind(this);
    this.changeSignUpClicked = this.changeSignUpClicked.bind(this);
    this.changeOtp = this.changeOtp.bind(this);
    this.btnOtpClicked = this.btnOtpClicked.bind(this);
    this.setDetails = this.setDetails.bind(this);
  }

  //change states
  changeFullName(event) {
    this.setState({ fullName: event.target.value });
  }
  changeUserName(event) {
    this.setState({ userName: event.target.value });
  }
  changeMobileNumber(event) {
    this.setState({ mobileNumber: event.target.value });
  }
  changePassword(event) {
    this.setState({ password: event.target.value });
  }
  changeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }
  changeIsSignedUp(bool) {
    this.setState({ isSignedUp: bool });
  }
  changePasswordMatched(bool) {
    this.setState({ passwordMatched: bool });
  }
  changeSignUpClicked(bool) {
    this.setState({ signUpClicked: bool });
  }
  setDetails(newDetails) {
    this.setState({ details: newDetails })
  }

  btnSignUpClicked = (event) => {
    event.preventDefault();

    if (
      this.state.fullName === "" ||
      this.state.mobileNumber === "" ||
      this.state.userName === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      alert("Field can not be empty");
    } else if (this.state.password === this.state.confirmPassword) {
      axios.post('/app/signup', { mobileNumber: this.state.mobileNumber })
        .then(response => {
          if (Object.keys(response.data).length === 0) {
            // either invalid mobile number or otp not sent
            console.log("Invalid mobile number or otp not sent");
          } else {
            console.log(response.data.Details)
            this.setDetails(response.data.Details)
            this.changeSignUpClicked(true);
          }
        })
        .catch(err => console.log(err));
    }
    else {
      this.changePasswordMatched(true);
    }
  }

  changeOtp(event) {
    this.setState({ otp: event.target.value, })
  }

  btnOtpClicked = (event) => {
    event.preventDefault();
    let newUser = {
      fullName: this.state.fullName,
      mobileNumber: this.state.mobileNumber,
      userName: this.state.userName,
      password: this.state.password,
      details: this.state.details,
      otp: this.state.otp
    };
    axios.post("/app/otpverify", newUser).then((response) => {
      if (Object.keys(response.data).length === 0) {
        console.log("Some Problem Occured");
      } else {
        this.setState({
          fullName: "",
          userName: "",
          mobileNumber: "",
          password: "",
          confirmPassword: "",
          isSignedUp: true,
          signUpClicked: false,
          otp: "",
          details: "",
        });
      }
    });
    console.log("btnOtpClicked");
  }

  render() {
    return (
      <div className="container">
        <div
          className="rounded border border-5 p-4 shadow"
          style={{ width: "60%", margin: "20px auto" }}
        >
          <h2 className="text-center text-primary mb-4">
            SignUp: User Details
          </h2>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="fullName"
              value={this.state.fullName}
              onChange={(event) => {
                this.changeIsSignedUp(false);
                this.changeSignUpClicked(false);
                this.changeFullName(event);
              }}
            />
            <label htmlFor="floatingInput">Fullname</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="number"
              className="form-control"
              id="floatingInput"
              placeholder="Mobile Number"
              value={this.state.mobileNumber}
              onChange={(event) => {
                this.changeIsSignedUp(false);
                this.changeSignUpClicked(false);
                this.changeMobileNumber(event);
              }}
            />
            <label htmlFor="floatingInput">Mobile Number</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={this.state.userName}
              onChange={(event) => {
                this.changeIsSignedUp(false);
                this.changeSignUpClicked(false);
                this.changeUserName(event);
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
              onChange={(event) => {
                this.changeIsSignedUp(false);
                this.changePasswordMatched(false);
                this.changeSignUpClicked(false);
                this.changePassword(event);
              }}
            />
            <label htmlFor="floatingInput">Password</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="ConfirmPassword"
              value={this.state.confirmPassword}
              onChange={(event) => {
                this.changeIsSignedUp(false);
                this.changePasswordMatched(false);
                this.changeSignUpClicked(false);
                this.changeConfirmPassword(event);
              }}
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          {!this.state.passwordMatched ? null : (
            <p className="fs-5 text-danger">Password not matched</p>
          )}

          {
            this.state.signUpClicked
              ? <><div className="form-floating mb-4">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Enter OTP"
                  value={this.state.otp}
                  onChange={(event) => {
                    this.changeIsSignedUp(false);
                    this.changeOtp(event);
                  }}
                />
                <label htmlFor="floatingInput">Enter OTP</label>
              </div>
                <div className="d-grid gap-2 col-3 mx-auto">
                  <div id="sign-in-button"></div>
                  <button
                    type="button"
                    className="btn btn-primary p-3"
                    onClick={this.btnOtpClicked}
                  >
                    Submit Otp
                  </button>
                </div>
              </>
              : <div className="d-grid gap-2 col-3 mx-auto">
                <div id="sign-in-button"></div>
                <button
                  type="button"
                  className="btn btn-primary p-3"
                  onClick={this.btnSignUpClicked}
                >
                  SignUp
                </button>
              </div>
          }
          {this.state.isSignedUp ? (
            <p className="text-center fs-3 mt-3 text-success fw-bolder">
              User Registered Successfully
            </p>
          ) : null}
        </div>
      </div>
    );
  }
}
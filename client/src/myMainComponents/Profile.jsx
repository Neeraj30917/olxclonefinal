import axios from "axios";
import React, { Component } from "react";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: "",
      mobileUpdatedSuccessfull: false,
      userDetails: {},
    };

    //bindings
    this.setMobileNumber = this.setMobileNumber.bind(this);
    this.changeMobileNumber = this.changeMobileNumber.bind(this);
    this.changeMobileUpdatedSuccessfull =
      this.changeMobileUpdatedSuccessfull.bind(this);
    this.btnUpdateClicked = this.btnUpdateClicked.bind(this);
    this.setUserDetails = this.setUserDetails.bind(this);
  }

  setMobileNumber(number) {
    this.setState({
      mobileNumber: number,
    });
  }
  changeMobileNumber(event) {
    this.setState({
      mobileNumber: event.target.value,
    });
  }
  changeMobileUpdatedSuccessfull(bool) {
    this.setState({
      mobileUpdatedSuccessfull: bool,
    });
  }
  setUserDetails(newUserDetail) {
    this.setState({
      userDetails: newUserDetail,
    });
  }

  componentDidMount() {
    this.setMobileNumber(this.props.userDetails.mobileNumber);
    this.setUserDetails(this.props.userDetails);
  }

  btnUpdateClicked(event) {
    event.preventDefault();

    let myNewUserdetails = {
      _id: this.props.userDetails._id,
      fullName: this.props.userDetails.fullName,
      mobileNumber: Number(this.state.mobileNumber),
      password: this.props.userDetails.password,
      userName: this.props.userDetails.userName,
      date: this.props.userDetails.date,
    };

    let jsonObject = {
      filter: { _id: this.props.userDetails._id },
      update: { mobileNumber: this.state.mobileNumber },
    };

    axios
      .post("/app/updateprofile", jsonObject)
      .then((response) => {
        if (response.data.n > 0 && response.data.nModified > 0) {
          this.changeMobileUpdatedSuccessfull(true);
          this.setUserDetails(myNewUserdetails);
          this.props.changeUserDetails(myNewUserdetails);
          localStorage.setItem("userDetails", JSON.stringify(myNewUserdetails));
        }
      });
  }

  render() {
    return (
      <div className="container">
        <div
          className="rounded border border-5 p-4 shadow"
          style={{ width: "60%", margin: "20px auto" }}
        >
          <h2 className="text-center text-primary">User Profile</h2>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="floatingInput1"
              placeholder="fullName"
              disabled
            />
            <label htmlFor="floatingInput1">
              {this.props.userDetails.fullName}
            </label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="floatingInput2"
              placeholder="name@example.com"
              disabled
            />
            <label htmlFor="floatingInput2">
              {this.props.userDetails.userName}
            </label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="number"
              className="form-control"
              id="floatingInput3"
              placeholder="Mobile Number"
              value={this.state.mobileNumber}
              onChange={(event) => {
                this.changeMobileNumber(event);
              }}
            />
            <label htmlFor="floatingInput3">MobileNumber</label>
            {this.state.mobileUpdatedSuccessfull ? (
              <p className="text-center fs-3 mt-3 text-success fw-bolder">
                Mobile Number Changed Successfully
              </p>
            ) : null}
          </div>

          <div className="d-grid gap-2 col-4 mx-auto">
            <button
              type="button"
              className="btn btn-primary p-3"
              onClick={this.btnUpdateClicked}
            >
              Update Mobile Number
            </button>
          </div>
        </div>
      </div>
    );
  }
}

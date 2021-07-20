import React, { Component } from "react";
import MainBody from "./MainBody";

export default class SignOut extends Component {
  componentDidMount() {
    //resetting state variables to their defaults
    this.props.changeUserDetails({});
    this.props.changeLoggedIn(false);

    //resetting local storage
    localStorage.setItem("userDetails", JSON.stringify({}));
    localStorage.setItem("loggedIn", false);
  }
  render() {
    return <MainBody url={"/signout"} adclicked={this.props.adclicked} />;
  }
}

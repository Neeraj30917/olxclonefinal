import React, { Component } from "react";
import MainBody from "./MainBody";

export default class ShowUserAds extends Component {
  render() {
    return (
      <MainBody
        url={this.props.url}
        userDetails={this.props.userDetails}
        adclicked={this.props.adclicked}
      />
    );
  }
}

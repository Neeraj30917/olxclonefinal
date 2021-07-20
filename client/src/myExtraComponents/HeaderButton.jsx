import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HeaderButton extends Component {
  render() {
    return (
      <li className="nav-item">
        <Link
          className="nav-link active"
          aria-current="page"
          to={this.props.url}
          onClick={() => {
            this.props.onClickLoginSignup(this.props.logIn, this.props.signUp);
          }}
        >
          {this.props.buttonText}
        </Link>
      </li>
    );
  }
}

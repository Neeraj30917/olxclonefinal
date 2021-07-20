import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UsernameHeaderButton extends Component {
  static defaultProps = {
    userName: "UserName",
  };

  render() {
    return (
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {this.props.userName}
        </Link>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/addnewad">
              Add New Ads
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/showuserads">
              Show Ads
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="/signout"
              onClick={() => {
                this.props.onClickLoginSignup(false, false);
              }}
            >
              SignOut
            </Link>
          </li>
        </ul>
      </li>
    );
  }
}

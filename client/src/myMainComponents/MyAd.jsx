import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class MyAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };

    this.btnDeleteClicked = this.btnDeleteClicked.bind(this);
    this.changeStateRedirect = this.changeStateRedirect.bind(this);
  }

  changeStateRedirect(bool) {
    this.setState({
      redirect: bool,
    });
  }

  btnDeleteClicked() {
    console.log("BtnDeleteClicked");
    axios
      .post("/app/deletead", { _id: this.props.myad._id })
      .then((response) => {
        console.log(response);
        this.changeStateRedirect(true);
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div>
        <p>Title{this.props.myad.title}</p>
        <p>Description:{this.props.myad.description}</p>
        {this.props.url === "/showuserads" ? (
          <button
            className="btn btn-danger ms-3"
            type="submit"
            onClick={this.btnDeleteClicked}
          >
            Delete
          </button>
        ) : null}
        {this.state.redirect ? <Redirect to={"/showuserads"} /> : null}
      </div>
    );
  }
}

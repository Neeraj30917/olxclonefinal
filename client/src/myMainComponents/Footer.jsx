import React, { Component } from "react";

export default class Footer extends Component {
  static defaultProps = {
    position: "fixed",
  };

  myStyle = {
    position: this.props.position,
    padding: "12px 20px",
    fontSize: "20px",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "black",
    color: "white",
  };

  render() {
    return (
      <div className="clearfix" style={this.myStyle}>
        Copyright &copy; All Rights Reserved
      </div>
    );
  }
}

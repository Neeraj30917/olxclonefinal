import React, { Component } from "react";
import download from "../images/download.png";
import { Link } from "react-router-dom";

export default class AdCard extends Component {
  static defaultProps = {
    height: "200px",
    price: "Price",
    title: "Title",
    location: "Location",
    date: "Date",
  };

  render() {
    return (
      <Link to="/myad" onClick={() => this.props.adclicked(this.props.myAd, this.props.url)}>
        <div>
          <div className="col mt-4">
            <div
              className="border mx-3 shadow p-3 mb-3 bg-body rounded "
              style={{ cursor: "pointer" }}
            >
              <div className="text-center">
                <img
                  src={download}
                  className="img-fluid"
                  style={{ height: this.props.height }}
                  alt="../backend/static/images/download.png"
                />
              </div>
              <ul style={{ margin: "0px 0px", padding: "0px 0px" }}>
                <li
                  className="my-2 fs-1 text-warning"
                  style={{ listStyleType: "none" }}
                >
                  {this.props.price}
                </li>
                <li className="my-3 fs-2" style={{ listStyleType: "none" }}>
                  {this.props.title}
                </li>
                <li
                  className="fs-6 text-secondary"
                  style={{
                    listStyleType: "none",
                    marginTop: "3px",
                    marginLeft: "4px",
                  }}
                >
                  {this.props.location}
                  <span style={{ float: "right" }}>{this.props.date}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

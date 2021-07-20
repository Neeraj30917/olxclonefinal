import React, { Component } from "react";
import AdCard from "../myExtraComponents/AdCard";
import axios from "axios";

export default class AddNewAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adDetails: {},
      price: "",
      title: "",
      location: "",
      date: "", // it's automatically managed by database
      description: "",
      savedSuccessfully: false,
    };
    // bindings
    this.changeAdDetails = this.changeAdDetails.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeSavedSuccessfully = this.changeSavedSuccessfully.bind(this);
  }
  changeAdDetails(newAd) {
    this.setState({
      adDetails: newAd,
    });
  }

  changePrice(event) {
    this.setState({
      price: event.target.value,
    });
  }
  changeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }
  changeLocation(event) {
    this.setState({
      location: event.target.value,
    });
  }
  changeDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }
  changeSavedSuccessfully(bool) {
    this.setState({
      savedSuccessfully: bool,
    });
  }
  changeDate(myDate) {
    this.setState({
      date: myDate,
    });
  }

  btnPublishClicked = (event) => {
    event.preventDefault();

    if (
      this.state.title === "" ||
      this.state.description === "" ||
      this.state.location === "" ||
      this.state.price === ""
    ) {
      alert("Fields Can not be empty");
    } else {
      let myAd = {
        userId: this.props.userId,
        price: this.state.price,
        title: this.state.title,
        description: this.state.description,
        location: this.state.location,
      };
      axios
        .post("/app/addnewad", myAd)
        .then((response) => {
          if (Object.keys(response.data).length === 0) {
            console.log("Some Problem occured in saving ad");
          } else {
            this.changeDate(response.data.date);
            this.changeSavedSuccessfully(true);
            this.setState({
              adDetails: {
                price: this.state.price,
                title: this.state.title,
                location: this.state.location,
                date: this.state.date,
                description: this.state.description,
              },
              price: "",
              title: "",
              location: "",
              date: "", // it's automatically managed by database
              description: "",
            });
          }
        });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col align-self-center">
            <div
              className="rounded border border-5 p-5 shadow"
              style={{ width: "100%", margin: "20px auto" }}
            >
              <h2 className="text-center text-primary mb-4">Add New Ad</h2>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="fullName"
                  value={this.state.title}
                  onChange={(e) => {
                    this.changeSavedSuccessfully(false);
                    this.changeTitle(e);
                  }}
                />
                <label htmlFor="floatingInput">Title</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="title"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Mobile Number"
                  value={this.state.description}
                  onChange={(e) => {
                    this.changeSavedSuccessfully(false);
                    this.changeDescription(e);
                  }}
                />
                <label htmlFor="floatingInput">Description</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="nam@example.com"
                  value={this.state.location}
                  onChange={(e) => {
                    this.changeSavedSuccessfully(false);
                    this.changeLocation(e);
                  }}
                />
                <label htmlFor="floatingInput">Location</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Password"
                  value={this.state.price}
                  onChange={(e) => {
                    this.changeSavedSuccessfully(false);
                    this.changePrice(e);
                  }}
                />
                <label htmlFor="floatingInput">Price</label>
              </div>
              <div className="d-grid gap-2 col-3 mx-auto">
                <button
                  type="button"
                  className="btn btn-primary p-3"
                  onClick={this.btnPublishClicked}
                >
                  Publish
                </button>
              </div>
              {this.state.savedSuccessfully ? (
                <p className="fs-5 text-success">
                  Saved Successfully, Ad Shown on Right Side
                </p>
              ) : null}
            </div>
          </div>
          <div className="col p-5 m-3 align-self-center">
            {this.state.savedSuccessfully ? (
              <AdCard
                height={"350px"}
                price={this.state.adDetails.price}
                title={this.state.adDetails.title}
                location={this.state.adDetails.location}
                date={this.state.adDetails.date}
              />
            ) : (
              <AdCard height={"350px"} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

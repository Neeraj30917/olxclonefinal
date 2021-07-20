import React, { Component } from "react";
import AdCard from "../myExtraComponents/AdCard";
import { fetchads } from "../service/apiendpoints";

export default class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbAds: [],
    };

    this.changeDbAds = this.changeDbAds.bind(this);
  }

  changeDbAds(myDbAds) {
    this.setState({
      dbAds: myDbAds,
    });
  }

  intialiseDbAds() {
    let userDetails;
    let data;
    if (this.props.url === "/") {
      //data initialised with empty json or empty object
      data = {};
    } else if (this.props.url === "/showuserads") {
      // userDetails = localStorage.getItem("userDetails");
      userDetails = this.props.userDetails;
      data = { userId: userDetails._id };
    } else if (this.props.url === "/signout") {
      // it will be redirected on signout clicked
      data = {};
    } else {
    }

    //fetch ads collections from the database
    fetchads(data).then((response) => {
      console.log(response);
      this.changeDbAds(response);
    });
  }

  componentDidMount() {
    this.intialiseDbAds();
  }

  render() {
    console.log("MainBody");
    return (
      <>
        <div className="container-fluid">
          <div className="row row-cols-4 g-1">
            {this.state.dbAds.length === 0
              ? null
              : this.state.dbAds.map((ad) => {
                return (
                  <AdCard
                    key={ad._id}
                    price={ad.price}
                    title={ad.title}
                    location={ad.location}
                    date={ad.date}
                    adclicked={this.props.adclicked}
                    myAd={ad}
                    url={this.props.url}
                  />
                );
              })}
          </div>
        </div>
        <div className="m-4 p-2"></div>
      </>
    );
  }
}

import React, { Component } from 'react'

//myMainComponents
import Header from "./myMainComponents/Header"
import MainBody from "./myMainComponents/MainBody"
import Footer from "./myMainComponents/Footer"
import LogIn from "./myMainComponents/LogIn"
import SignUp from "./myMainComponents/SignUp"
import Profile from "./myMainComponents/Profile"
import AddNewAd from "./myMainComponents/AddNewAd"
import SignOut from './myMainComponents/SignOut'
import ShowUserAds from './myMainComponents/ShowUserAds'
import MyAd from './myMainComponents/MyAd'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      loggedIn: false,
      ad: {},
      url: ""
    }
    //bindings
    this.changeUserDetails = this.changeUserDetails.bind(this);
    this.changeLoggedIn = this.changeLoggedIn.bind(this);
    this.adclicked = this.adclicked.bind(this);
  }

  changeUserDetails(user) {
    this.setState({
      userDetails: user
    })
  }
  changeLoggedIn(bool) {
    this.setState({
      loggedIn: bool
    })
  }

  componentDidMount() {
    //local storage default initialised on mouting app first time
    if (localStorage.getItem("userDetails") === null) {
      localStorage.setItem("userDetails", JSON.stringify({}));
    }
    else {
      this.changeUserDetails(JSON.parse(localStorage.getItem("userDetails")));
    }
    if (localStorage.getItem("loggedIn") === null) {
      localStorage.setItem("loggedIn", false);
    }
    else {
      this.changeLoggedIn(JSON.parse(localStorage.getItem("loggedIn") === "true"))
    }
  }

  adclicked(ad1, url1) {
    this.setState({
      ad: ad1,
      url: url1
    })
  }

  render() {
    return (
      <Router>
        <Header loggedIn={this.state.loggedIn}
          userDetails={this.state.userDetails}
        />
        <Switch>
          <Route exact path="/">
            <MainBody url={"/"}
              adclicked={this.adclicked}
            />
          </Route>
          <Route exact path="/login">
            <LogIn changeLoggedIn={this.changeLoggedIn}
              changeUserDetails={this.changeUserDetails} />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/profile">
            <Profile userDetails={this.state.userDetails} changeUserDetails={this.changeUserDetails} />
          </Route>
          <Route exact path="/addnewad">
            <AddNewAd userId={this.state.userDetails._id} />
          </Route>
          <Route exact path="/showuserads">
            <ShowUserAds url={"/showuserads"} userDetails={this.state.userDetails} adclicked={this.adclicked} />
          </Route>
          <Route exact path="/signout">
            <SignOut changeUserDetails={this.changeUserDetails}
              changeLoggedIn={this.changeLoggedIn}
              adclicked={this.adclicked}
            />
          </Route>
          <Route exact path="/myad">
            <MyAd myad={this.state.ad} url={this.state.url} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    )
  }
}

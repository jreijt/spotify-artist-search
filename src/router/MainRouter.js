import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ComponentServices } from "../services";

import { BrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Search from "../pages/Search";
import Results from "../pages/Results";
import Artist from "../pages/Artist";

export class MainRouter extends Component {
  renderSignedIn() {
    return (
      <Switch>
        <Route path="/search" component={Search} exact />
        <Route path="/search/:query" component={Results} />
        <Route path="/artist/:id" component={Artist} />
        <Redirect to="/search" />
      </Switch>
    );
  }

  renderSignedOut() {
    return (
      <Switch>
        <Route path="/" component={Login} />
        <Redirect to="/" />
      </Switch>
    );
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.auth.isSignedIn
          ? this.renderSignedIn()
          : this.renderSignedOut()}
      </BrowserRouter>
    );
  }
}

export default connect(
  ComponentServices.generateMapProps(["auth"]),
  null
)(MainRouter);

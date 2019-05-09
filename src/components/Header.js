import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Dropdown } from "react-bootstrap";

import { ComponentServices } from "../services";
import { AuthActions, ErrorActions } from "../actions";
import ProfilePhoto from "./ProfilePhoto";
import { images } from "../assets";

class Header extends Component {
  componentDidMount() {
    this.verifyToken();
  }

  // If access token exists in store, try signing in (sign in is actually getting profile info using accessToken)
  verifyToken() {
    if (this.props.auth.acessToken)
      this.props.signIn(this.props.auth.acessToken).then(res => {
        if (!res) this.props.signOut();
      });
  }

  // If user details exist, render greeting message
  renderGreeting() {
    return (
      <div className="primary row greeting-container">
        <Dropdown>
          <Dropdown.Toggle as={ProfilePhoto}>
            {this.props.auth.user.images}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1" onClick={() => this.props.signOut()}>
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        &nbsp;&nbsp;
        <span style={{ marginTop: 3 }}>
          {`Hi, ${this.props.auth.user.display_name}!`}
        </span>
      </div>
    );
  }

  // If store contains alert, render alert toast
  renderAlert() {
    if (this.props.errors.length > 0)
      return (
        <div className="alert-container">
          <Alert dismissible variant="danger" onClose={this.props.clearErrors}>
            {this.props.errors[0]}
          </Alert>
        </div>
      );
  }

  render() {
    return (
      <div className="fixed-top center">
        {this.renderAlert()}
        <div className="header-container">
          <div className="title-container">
            <span className="primary title">
              {this.props.auth.user ? this.renderGreeting() : "Artist Search"}
            </span>
          </div>

          <div className="action-container">
            <span className="primary subtitle">
              powered by&nbsp;
              <a
                href="https://www.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="logo"
                  src={images.logo}
                  alt="Spotify Logo"
                  style={{ marginBottom: 2 }}
                />
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ComponentServices.generateMapProps(["auth", "errors"]),
  ComponentServices.generateMapActions({ ...AuthActions, ...ErrorActions })
)(Header);

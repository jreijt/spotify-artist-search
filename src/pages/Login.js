import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ComponentServices } from "../services";
import { AuthActions } from "../actions";
import { clientId } from "../constants";
import { Button, Spinner } from "react-bootstrap";
import { images } from "../assets";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    this.checkForToken();
  }

  // Checks for access token error in url
  // If access token exists, signs in
  // This is because after auth, spotify drops the access token in a hash,
  // and on cancel, it drops the error in a param
  checkForToken() {
    let hash = this.props.location.hash || this.props.location.search;
    if (hash === "") return;

    const params = this.getParams(hash);
    if (params.access_token) this.attemptSignIn(params.access_token);
    if (params.error) {
      this.props.history.push("/");
    }
  }

  // transforms hash or param string to object
  getParams(hash) {
    return hash
      .replace("#", "")
      .replace("?", "")
      .split("&")
      .reduce(function(result, item) {
        var parts = item.split("=");
        result[parts[0]] = parts[1];
        return result;
      }, {});
  }

  initSpotifyAuth() {
    this.setState({ isLoading: true });
    window.location = `https://accounts.spotify.com/en/authorize?client_id=${clientId}&redirect_uri=${
      window.location.origin
    }/&response_type=token`;
  }

  attemptSignIn(accessToken) {
    this.props.signIn(accessToken);
  }

  render() {
    const isLoading = this.props.auth.isLoading || this.state.isLoading;

    return (
      <div className="login-container">
        <Button
          variant="green"
          className="login-btn"
          onClick={() => this.initSpotifyAuth()}
          disabled={isLoading}
        >
          {!isLoading ? (
            <div>
              <img src={images.logo} alt="Spotify Logo" className="logo" />
              &nbsp; Sign In
            </div>
          ) : (
            <Spinner animation="border" size="md" />
          )}
        </Button>
      </div>
    );
  }
}

export default withRouter(
  connect(
    ComponentServices.generateMapProps(["auth"]),
    ComponentServices.generateMapActions(AuthActions)
  )(Login)
);

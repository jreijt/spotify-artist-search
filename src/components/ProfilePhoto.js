import React, { Component } from "react";
import { images } from "../assets";

export class ProfilePhoto extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    let image =
      this.props.children.length > 0
        ? this.props.children[0].url
        : images.profile;

    return (
      <div
        onClick={this.handleClick}
        className="profile-photo-container"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
    );
  }
}

export default ProfilePhoto;

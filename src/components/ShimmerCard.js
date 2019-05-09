import React, { Component } from "react";
import { Card } from "react-bootstrap";

export class ShimmerCard extends Component {
  render() {
    return (
      <Card
        style={{ width: 200, height: this.props.height || 300 }}
        className="album-card-container shine"
      />
    );
  }
}

export default ShimmerCard;

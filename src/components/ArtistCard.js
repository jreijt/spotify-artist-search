import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { images } from "../assets";

export class ArtistCard extends Component {
  render() {
    const image =
      this.props.images.length > 0
        ? this.props.images[0]
        : { url: images.album };

    return (
      <Card
        style={{ width: 200, height: 300 }}
        className="card-container"
        onClick={() => this.props.history.push(`/artist/${this.props.id}`)}
      >
        <Card.Img
          variant="top"
          src={image.url}
          style={{ height: 200, objectFit: "cover" }}
        />
        <Card.Body style={{ height: 100 }}>
          <Card.Title className="card-text" style={{ fontSize: "1rem" }}>
            {this.props.name}
          </Card.Title>
          <Card.Subtitle
            className="card-text"
            style={{ fontSize: "0.7rem", fontWeight: 200 }}
          >
            {this.props.followers.total} followers
          </Card.Subtitle>
          <Rating count={this.props.popularity} over={100} max={5} />
        </Card.Body>
      </Card>
    );
  }
}

export default ArtistCard;

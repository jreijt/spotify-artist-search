import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { images } from "../assets";

export class AlbumCard extends Component {
  render() {
    const image =
      this.props.images.length > 0
        ? this.props.images[0]
        : { url: images.album };

    // Concats an artist string from artist array
    const artists = this.props.artists.reduce((result, item, index) => {
      result += item.name;

      if (index < this.props.artists.length - 1) result += ", ";
      return result;
    }, "");

    const releaseYear = new Date(this.props.release_date).getFullYear();

    return (
      <Card
        style={{ width: 200, height: 330 }}
        className="album-card-container"
      >
        <Card.Img
          variant="top"
          src={image.url}
          style={{
            height: 200,
            objectFit: "cover"
          }}
        />
        <Card.Body>
          <Card.Title
            className="card-text"
            style={{
              fontSize: "0.8rem",
              maxHeight: 150,
              overflow: "hidden"
            }}
          >
            {this.props.name}
          </Card.Title>
          <Card.Subtitle
            className="card-text"
            style={{
              fontSize: "0.6rem",
              fontWeight: 200
            }}
          >
            {artists}
          </Card.Subtitle>
          <div
            className="card-text"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              flex: 1
            }}
          >
            <span style={{ fontSize: "0.55em" }}>{releaseYear}</span>
            <span style={{ fontSize: "0.5em" }}>
              {this.props.total_tracks} tracks
            </span>
          </div>
        </Card.Body>
        <Card.Footer
          className="primary"
          style={{
            fontSize: "0.7rem",
            fontWeight: 200,
            padding: 5,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <a
            href={this.props.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview on Spotify
          </a>
        </Card.Footer>
      </Card>
    );
  }
}

export default AlbumCard;

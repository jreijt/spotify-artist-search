import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ComponentServices } from "../services";
import { ListingActions } from "../actions";
import AlbumCard from "../components/AlbumCard";
import ShimmerCard from "../components/ShimmerCard";

class Artist extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    this.searchAlbums();
  }

  searchAlbums() {
    const id = this.props.match.params.id;

    if (id !== this.props.listing.albums.id)
      this.props.getArtistAlbums(id, this.props.history);
  }

  render() {
    const items = this.props.listing.albums.items || [];
    let artistName = "";

    if (items.length) artistName = items[0].artists[0].name;

    return (
      <div className="artist-container">
        <div className="artist-title-container">
          <h2 className="title">{artistName}</h2>
          <h6 className="subtitle">Albums</h6>
        </div>
        <div className="listing-container">
          {items.length > 0 ? (
            items.map(item => (
              <AlbumCard {...item} key={item.id} history={this.props.history} />
            ))
          ) : !this.props.listing.albums.query ? (
            [
              [...Array(12)].map((_, i) => {
                return <ShimmerCard height={330} key={i} />;
              })
            ]
          ) : (
            <span className="card-text">This artist has no albums yet.</span>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    ComponentServices.generateMapProps(["listing"]),
    ComponentServices.generateMapActions(ListingActions)
  )(Artist)
);

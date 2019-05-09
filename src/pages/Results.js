import React, { Component } from "react";
import { connect } from "react-redux";
import { ComponentServices } from "../services";
import { withRouter } from "react-router-dom";
import ArtistCard from "../components/ArtistCard";
import ShimmerCard from "../components/ShimmerCard";
import { ListingActions } from "../actions";

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchStr: this.props.match.params.query,
      animate: ""
    };
  }

  componentDidMount() {
    this.searchInput.focus();
    this.searchArtists();
    this.setAnimation(true);
  }

  // If params change search again
  componentWillReceiveProps(props) {
    if (props.match.params.query !== this.props.match.params.query) {
      this.setState({ searchStr: props.match.params.query });
      this.searchArtists(props.match.params.query, props.history);
    }
  }

  setAnimation(open) {
    this.setState({ animate: open ? "animate-search" : "" });
  }

  animateSearchBar(query) {
    if (query === "") this.setAnimation(false);
    else if (this.state.animate === "") this.setAnimation(true);
  }

  searchArtists(q) {
    const query = q || this.props.match.params.query;
    if (query !== this.props.listing.artists.query)
      this.props.searchArtist(query);
  }

  // Waits 250ms inbetween each character input before firing
  // if another key is pressed, timeout is reset
  search(query) {
    this.setState({ searchStr: query });
    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    this.animateSearchBar(query);

    this.searchTimeout = setTimeout(() => {
      this.props.history.push(`/search/${query}`);
    }, 250);
  }

  render() {
    const items = this.props.listing.artists.items || [];
    return (
      <div className={`result-container ${this.state.animate}`}>
        <div className="search-container">
          <input
            ref={input => {
              this.searchInput = input;
            }}
            className="search-bar"
            value={this.state.searchStr}
            onChange={e => this.search(e.target.value)}
            placeholder="Search for an artist..."
          />
        </div>
        <div className={`listing-container ${this.state.animate}`}>
          {items.length > 0 ? (
            items.map(item => (
              <ArtistCard
                {...item}
                key={item.id}
                history={this.props.history}
              />
            ))
          ) : !this.props.listing.artists.query ? (
            [
              [...Array(12)].map((_, i) => {
                return <ShimmerCard key={i} />;
              })
            ]
          ) : (
            <span className="card-text">No results found</span>
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
  )(Results)
);

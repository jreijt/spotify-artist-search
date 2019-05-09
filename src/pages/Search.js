import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ComponentServices } from "../services";
import { ListingActions } from "../actions";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchStr: ""
    };
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  search(query) {
    this.setState({ searchStr: query });
    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.props.history.push(`/search/${query}`);
    }, 250);
  }

  render() {
    return (
      <div className="search-container">
        <input
          className="search-bar"
          ref={input => {
            this.searchInput = input;
          }}
          value={this.state.searchStr}
          onChange={e => this.search(e.target.value)}
          placeholder="Search for an artist..."
        />
      </div>
    );
  }
}

export default withRouter(
  connect(
    ComponentServices.generateMapProps(["auth", "listing"]),
    ComponentServices.generateMapActions(ListingActions)
  )(Search)
);

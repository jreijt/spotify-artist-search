import React, { Component } from "react";

class Rating extends Component {
  // props.count is the actual value of the rating
  // props.over is the actual value the rating is compared to
  // props.max is the max number of stars to display
  // this function will evaluate wheter to render an empty star or a full star based on its index in the star array
  evaluateIcon(units) {
    return this.props.count > (units * this.props.over) / this.props.max
      ? "fas"
      : "far";
  }

  render() {
    return (
      <div className="rating-container">
        {[...Array(this.props.max)].map((item, index) => {
          return (
            <i className={`fa-star ${this.evaluateIcon(index)}`} key={index} />
          );
        })}
      </div>
    );
  }
}

export default Rating;

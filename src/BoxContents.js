import React, { Component } from 'react';

class BoxContents extends Component {

  // for now, the box is only for displaying information and doesn't hold state (no constructor)
  render() {

    let { box } = this.props;
    return (
      <div>

        <h1>This is the box contents section</h1>
      </div>


    )
  }
}

export default BoxContents;

import React, { Component } from "react";

class Product extends Component {

  render() {

    let {name, points, volume, key} = this.props;
    console.log('product in Product', this.props)

    return (
      <div className="Product">
        {name}
      </div>
    )
  }
}

export default Product;

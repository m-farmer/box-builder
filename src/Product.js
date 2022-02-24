import React, { Component } from "react";

class Product extends Component {

  render() {

    let {product} = this.props;

    return (
      <div className="Product">
        {product}
      </div>
    )
  }
}

export default Product;

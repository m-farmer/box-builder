import React, { Component } from "react";
import "./styles/ProductList.css";
import Product from "./Product";

class ProductList extends Component {

  // constructor(props) {
  //   super(props);

  //   this.updateBoxClick = this.updateBoxClick.bind(this);
  // }

  // updateBoxClick (boxObject) {

  // }

  render() {
    let { products } = this.props;

    const categories = [
      ...new Set(products.map((product) => product.category.name)),
    ];

    const groupByCategory = categories.map((category) =>
      products.filter((item) => item.category.name === category)
    );

    // note: objects are not valid as React children

    return (
      <div className="ProductList">
        {groupByCategory.map((category, idx) => (
          <div>
            <h1>{categories[idx]}</h1>
            <div className="ProductList-items">
              {category.map((item) => (
                <Product
                  key={item.id}
                  description={item.description}
                  name={item.name}
                  volume={item.volume}
                  points={item.points}
                  updateBox={this.props.updateBox}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductList;

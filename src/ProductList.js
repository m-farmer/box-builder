import React, { Component } from "react";
import "./styles/ProductList.css";
import Product from "./Product";

class ProductList extends Component {
  render() {
    let { products } = this.props;
    console.log("products in ProductList", products, typeof products);

    const categories = [
      ...new Set(products.map((product) => product.category.name)),
    ];

    const groupByCategory = categories.map((category) =>
      products.filter((item) => item.category.name === category)
    );

    console.log("groupByCategory", groupByCategory);

    // note: objects are not valid as React children

    return (
      <div className="ProductList">
        <h1>This is the ProductList section</h1>
        {groupByCategory.map((category, idx) => (
          <div>
            <h1>{categories[idx]}</h1>
            <div>
              {category.map((item) => (
                <Product
                  key={item.id}
                  name={item.name}
                  volume={item.volume}
                  points={item.points}
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

import React, { Component } from "react";
import "../styles/ProductList.css";
import Product from "./Product";
import { generateImages } from "../fruits";

/*
Reminders that with Class components, we expect Jest to be used to test props and not methods directly.
make this a functional component??

what's the best way to layout files?? individual folders for each component with its css?
*/

class ProductList extends Component {
  render() {
    const { products, remainingPoints, remainingVolume, mySubscription } =
      this.props;

    const categories = [
      ...new Set(products.map((product) => product.category.name)),
    ];

    const groupByCategory = categories.map((category) =>
      products.filter((item) => item.category.name === category)
    );

    return (
      <div>
        {groupByCategory.map((category, idx) => (
          <div key={category[idx].id}>
            <h1>{categories[idx]}</h1>
            <div className="ProductList-items">
              {category.map((item) => (
                <Product
                  key={item.id}
                  id={item.id}
                  description={item.description}
                  name={item.name}
                  volume={item.volume}
                  points={item.points}
                  updateBox={this.props.updateBox}
                  remainingVolume={remainingVolume}
                  remainingPoints={remainingPoints}
                  mySubscription={mySubscription}
                  image={generateImages()}
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

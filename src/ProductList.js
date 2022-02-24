import React, { Component } from "react";
import './styles/ProductList.css';
import Product from "./Product"

class ProductList extends Component {

  render() {

    let {products} = this.props;
    console.log('products in ProductList', products, typeof products)

    const categories = [...new Set(products.map(product => product.category.name))];
    console.log('categories', categories)

    // note: objects are not valid as React children
    // double map??
    return (
      <div className="ProductList">
        <h1>This is the ProductList section</h1>
        {products.map(item =>
          <Product
            key={item.id}
            name={item.name}
            volume={item.volume}
            points={item.points}
            category={item.category.name}
          />
        )}
      </div>
    )
  }
}

export default ProductList;

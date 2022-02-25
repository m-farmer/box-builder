import React, { Component } from "react";
import "./styles/Product.css"

class Product extends Component {

  // a bit like having a react form, so making it stateful

  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      individualProduct: {}
    }
    this.handleDecreaseValue = this.handleDecreaseValue.bind(this);
    this.handleIncreaseValue = this.handleIncreaseValue.bind(this);
    this.handleUpdateBox = this.handleUpdateBox.bind(this);
  }

  newBoxCopy(qty) {
    return {...this.state.boxCopy,
      name: this.props.name,
      points: this.props.points,
      volume: this.props.volume,
      qty: qty
    }
  }
  handleUpdateBox (qty) {
   let selectedProduct = this.newBoxCopy(qty);
   this.props.updateBox(selectedProduct);
   console.log('selectedProduct in Product:', selectedProduct)
  }


  // if setState depends on current state, it's best to use the alternate callback form
  decreaseValue(currentState) {
    return { quantity: currentState.quantity - 1}
  }

  handleDecreaseValue() {
    // value must be greater than zero
    this.state.quantity >= 1 && this.setState(this.decreaseValue);
    this.handleUpdateBox(this.state.quantity);

  }

  increaseValue(currentState) {
    return { quantity: currentState.quantity + 1}
  }

  handleIncreaseValue() {
    this.setState(this.increaseValue)
  }

  // import function to reset everything to 0 if a new box size is chosen
  render() {
    let {name, description, points, volume} = this.props;

    return (
      <div className="Product">
        <h2>{name}</h2>
        <h3>{description}</h3>
        <h3>Volume: {volume} in³</h3>
        <h3>{points} points</h3>
        <div className="edit-product">
          <div className="value-button" id="increase" onClick={this.handleIncreaseValue}>+</div>
          <div id="number"><h2>{this.state.quantity}</h2></div>
          <div className="value-button" id="decrease" onClick={this.handleDecreaseValue}>-</div>
        </div>
      </div>
    )
  }
}

export default Product;

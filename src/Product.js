import React, { Component } from "react";
import "./styles/Product.css"

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    }
    this.handleUpdateBoxClick = this.handleUpdateBoxClick.bind(this);
    this.handleDecreaseValue = this.handleDecreaseValue.bind(this);
    this.handleIncreaseValue = this.handleIncreaseValue.bind(this);
  }

  handleUpdateBoxClick () {

  }


  // if setState depends on current state, it's best to use the alternate callback form
  decreaseValue(currentState) {
    return { quantity: currentState.quantity - 1}
  }

  handleDecreaseValue() {
    // value must be greater than zero
    this.state.quantity >= 1 && this.setState(this.decreaseValue)
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
      <div className="Product" id="choose-quanitty">
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

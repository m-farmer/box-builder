import React, { Component } from "react";
import "../styles/Product.css";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      image: this.props.image,
    };
    this.handleDecreaseValue = this.handleDecreaseValue.bind(this);
    this.handleIncreaseValue = this.handleIncreaseValue.bind(this);
  }

  handleUpdateBox(quantity) {
    let id = this.props.id,
      qty = quantity;
    // send this new object up to MainPage, where the box contents will be updated
    this.props.updateBox(id, qty);
  }

  handleDecreaseValue() {
    // value must be greater than zero
    this.state.quantity >= 1 &&
      this.setState(
        (currentState) => ({ quantity: currentState.quantity - 1 }),
        () => this.handleUpdateBox(this.state.quantity)
      );
  }

  handleIncreaseValue() {
    this.setState(
      (currentState) => ({ quantity: currentState.quantity + 1 }),
      () => this.handleUpdateBox(this.state.quantity)
    );
  }

  // once a subscription is chosen, remainingVolume and remainingValue will no longer be 0 and things can be added to the box.
  render() {
    let {
      name,
      description,
      points,
      volume,
      remainingVolume,
      remainingPoints,
      mySubscription,
    } = this.props;

    let isDeactivated = remainingVolume < volume || remainingPoints < points;
    let message = !mySubscription.name
      ? "Please choose a subscription"
      : "Too big for the box!";

    console.log("this.props", this.props);

    return (
      <div className={isDeactivated ? "Product inactive" : "Product"}>
        <img src={`/fruitImages/${this.state.image}`} alt="fruit" />

        <h2 className="product-title">{name}</h2>
        <p className="product-description">{description}</p>
        <p className="product-specs">
          VOLUME: {volume} in³ | POINTS: {points}
        </p>
        <div className="edit-product">
          <button
            className="value-button"
            id="decrease"
            onClick={this.handleDecreaseValue}
          >
            -
          </button>
          <div id="number">
            <h2>{this.state.quantity}</h2>
          </div>
          <button
            className="value-button"
            id="increase"
            onClick={this.handleIncreaseValue}
            disabled={isDeactivated}
          >
            {isDeactivated && <span className="tooltiptext">{message}</span>}+
          </button>
        </div>
      </div>
    );
  }
}

export default Product;

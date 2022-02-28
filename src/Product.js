import React, { Component } from "react";
import "./styles/Product.css"

class Product extends Component {

  // a bit like having a react form, so making it stateful

  constructor(props) {
    // don't need props inside super if we're not using props inside the constructor
    super();
    this.state = {
      quantity: 0
    }
    this.handleDecreaseValue = this.handleDecreaseValue.bind(this);
    this.handleIncreaseValue = this.handleIncreaseValue.bind(this);
  }


  handleUpdateBox (quantity) {
  let id = this.props.id, qty = quantity;
   // send this new object up to MainPage, where the box contents will be updated
   this.props.updateBox(id, qty);
  }


  // setState is asynchronous and may not update the state right away. passing it a callback is a way to access values as soon as the state is updated

  handleDecreaseValue() {
    // value must be greater than zero

    // React docs: If the next state depends on the current state, we recommend using the updater function form (currentState => )
    this.state.quantity >= 1 &&
    this.setState(currentState => ({quantity: currentState.quantity - 1}),
    () => this.handleUpdateBox(this.state.quantity))
  }

  handleIncreaseValue() {

    // using the callback method - passing an anonymous function as a second argument, which then calls handleUpdateBox after state is updated instead of running handleUpdateBox before the updating has finished.
    // this is to avoid the quantity in the box only updating AFTER the user clicks the '+' a SECOND time
    this.setState(currentState => ({quantity: currentState.quantity + 1}),
      () => this.handleUpdateBox(this.state.quantity));
  }

  // import function to reset everything to 0 if a new box size is chosen

  // once a subscription is chosen, remainingVolume and remainingValue will no longer be 0 and things can be added to the box.
  render() {
    let {name, description, points, volume, remainingVolume, remainingPoints, mySubscription} = this.props;

    let isDeactivated = remainingVolume < volume || remainingPoints < points;
    let message = !mySubscription.name ? "Please choose a subscription" : "Too big for the box!"

    // some class={isDeactivated && message}

    console.log('remainingVolume and remainingPoints inside Product', remainingVolume, remainingPoints)
    return (
      <div className="Product">
        <h2 className="product-title">{name}</h2>
        <p className="product-description">{description}</p>
        <p className="product-specs">VOLUME: {volume} in³  |  POINTS: {points}</p>
        {/* <p className="product-specs">{points} points</p> */}
        <div className="edit-product">
          <button
          className="value-button"
          id="increase"
          onClick={this.handleIncreaseValue}
          disabled={isDeactivated}
          >
          {isDeactivated && <span className="tooltiptext">{message}</span>}
          +
          </button>
          <div id="number"><h2>{this.state.quantity}</h2></div>
          <button
          className="value-button"
          id="decrease"
          onClick={this.handleDecreaseValue}
          >
          -
          </button>
        </div>
      </div>
    )
  }
}

export default Product;

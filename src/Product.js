import React, { Component } from "react";
import "./styles/Product.css"

class Product extends Component {

  // a bit like having a react form, so making it stateful

  constructor(props) {
    // don't need props inside super if we're not using props inside the constructor
    super();
    this.state = {
      quantity: 0,
    }
    this.handleDecreaseValue = this.handleDecreaseValue.bind(this);
    this.handleIncreaseValue = this.handleIncreaseValue.bind(this);
    this.handleUpdateBox = this.handleUpdateBox.bind(this);
  }


  handleUpdateBox (qty) {
   let selectedProduct = {
     name: this.props.name,
     points: this.props.points,
     volume: this.props.volume,
     qty: qty
   }
   // send this new object up to MainPage, where the box contents will be updated
   this.props.updateBox(selectedProduct);
  }


  // setState is asynchronous and may not update the state right away. passing it a callback is a way to access values as soon as the state is updated
  // decreaseValue(currentState) {
  //   return { quantity: currentState.quantity - 1}
  // }

  // increaseValue(currentState) {
  //   return { quantity: currentState.quantity + 1}
  // }

  handleDecreaseValue() {
    // value must be greater than zero
    // this.state.quantity >= 1 && this.setState(this.decreaseValue);
    // this.handleUpdateBox(this.state.quantity);

    this.state.quantity >= 1 && this.setState({quantity: this.state.quantity - 1},
      () => this.handleUpdateBox(this.state.quantity));
  }

  handleIncreaseValue() {
    // this.setState(this.increaseValue);
    // this.setState(curState => ({quantity: curState.quantity + 1}))

    // using the callback method - passing an anonymous function, which then calls handleUpdateBox after state is updated instead of running handleUpdateBox before the updating has finished.
    // this is to avoid the quantity in the box only updating AFTER the user clicks the '+' a SECOND time
    this.setState({quantity: this.state.quantity + 1},
      () => this.handleUpdateBox(this.state.quantity));
    // this.handleUpdateBox(this.state.quantity);
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

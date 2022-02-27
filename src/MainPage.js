import React, { Component } from "react";
import "./styles/MainPage.css";
import Dropdown from "./DropdownMenu";
import BoxContents from "./BoxContents";
import ProductList from "./ProductList";
import axios from 'axios';

const BOX_API = "https://mystifying-spence-dc3bda.netlify.app/build-a-box/";

class MainPage extends Component {

  constructor() {
    // review: why no props, why super?
    super();
    this.state = {
      remainingPoints: 0,
      remainingVolume: 0,
      subscriptions: [],
      products: [],
      mySubscription: {},
      box: {}
    }
    this.clickSubscription = this.clickSubscription.bind(this);
    this.updateBox = this.updateBox.bind(this);
  }


  // PUT THE TESTING FUNCTIONS IN!!!

  // several methods are triggered as the result of an event but NOT DIRECTLY
  // explain WHY using componentDidMount and WHY I'm making an AJAX request here
  async componentDidMount() {
    let subscriptionResponse = await axios.get(`${BOX_API}subscriptions.json`);
    let productsResponse = await axios.get(`${BOX_API}products.json`);

    this.setState({
      subscriptions: subscriptionResponse.data.subscriptions,
      products: productsResponse.data.products,
    }, () => this.createBox(this.state.products))

  }

  clickSubscription (subscriptionChoice) {
    // value passed in is index of subscription (from subscriptions array) based on button click in DropdownMenu
    // this is working properly. console.log inside render method to see.
    let chosenSubscription = this.state.subscriptions[subscriptionChoice];
    this.setState ({
      mySubscription: chosenSubscription
    }, () => this.calculateRemainingSpace());
  }

  createBox(products) {
    // once the data is retrieved from the API, the state of the box is initialized to an object where the quantity of each product is 0
    let newBox = {};
    products.forEach(item => {
      newBox[item.id] = {
        qty: 0,
        volume: item.volume,
        points: item.points,
        name: item.name
      };

    })
    this.setState({ box: newBox })
  }

  updateBox (id, qty) {
    // id and qty are passed up from the Product component. the state of the box is updated to reflect the new quantity based on the id

    this.setState({
      box: {
        ...this.state.box,
        [id]: {...this.state.box[id], qty: qty}
      }
    }, () => this.calculateRemainingSpace())

    /*
    from React docs: https://reactjs.org/docs/react-component.html#setstate
    The second parameter to setState() is an optional callback function that will be executed once setState is completed and the component is re-rendered. Generally we recommend using componentDidUpdate() for such logic instead.
    */

    /*
    If the next state depends on the current state, we recommend using the updater function form
    But the next form of state does not depend on the current state. i'm not incrementing anything here, which is why I think it's ok to use the code above ^
    */

    // this.setState(currentState => ({
    //   box: {
    //     ...currentState.box,
    //     [id]: {...currentState.box[id], qty: qty}
    //   }
    //   //componentDidUpdate?
    // }), () => this.calculateRemainingSpace())

  }

  // called after the subscription is chosen AND whenever an item is added to the box.
  calculateRemainingSpace() {

    let totalVol = 0, totalPoints = 0;
    for (let product in this.state.box) {
      totalVol += this.state.box[product].volume * this.state.box[product].qty;
      totalPoints += this.state.box[product].points * this.state.box[product].qty;
    }

    this.setState({
      remainingVolume: this.state.mySubscription.maxVolume - totalVol,
      remainingPoints: this.state.mySubscription.maxValue - totalPoints
    })
  }



  render() {
    return (
      <div className="App">
        <section className="navbar"><h2>This is a navbar placeholder</h2></section>
        <section className="subscriptionOptions">
          <div className="columns">
            <Dropdown
              subscription={this.state.subscriptions}
              clickSubscription={this.clickSubscription}
            />
          </div>
          <div className="columns">
            <BoxContents
              box={this.state.box}
              remainingPoints={this.state.remainingPoints}
              remainingVolume={this.state.remainingVolume}
            />
          </div>
        </section>
        <section>
         <ProductList
          products={this.state.products}
          updateBox={this.updateBox}
          remainingPoints={this.state.remainingPoints}
          remainingVolume={this.state.remainingVolume}
          mySubscription={this.state.mySubscription}
         />
        </section>
        <section className="save-feature">
          <button id="save-button">Save</button>
        </section>
      </div>
    );
  }
}

export default MainPage;

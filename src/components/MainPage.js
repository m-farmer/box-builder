import React, { Component } from "react";
import "../styles/MainPage.css";
import DropdownMenu from "./DropdownMenu";
import BoxContents from "./BoxContents";
import ProductList from "./ProductList";
import axios from "axios";

const BOX_API = "https://mystifying-spence-dc3bda.netlify.app/build-a-box/";

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      remainingPoints: 0,
      remainingVolume: 0,
      subscriptions: [],
      products: [],
      mySubscription: {},
      box: {},
    };
    this.clickSubscription = this.clickSubscription.bind(this);
    this.updateBox = this.updateBox.bind(this);
  }

  async componentDidMount() {
    try {
      const subscriptionResponse = await axios.get(
        `${BOX_API}subscriptions.json`
      );

      if (!subscriptionResponse) throw Error(subscriptionResponse.statusText);

      const productsResponse = await axios.get(`${BOX_API}products.json`);

      if (!productsResponse) throw Error(productsResponse.statusText);
      this.setState(
        {
          subscriptions: subscriptionResponse.data.subscriptions,
          products: productsResponse.data.products,
        },
        () => this.createBox(this.state.products)
      );
    } catch (e) {
      console.error(e);
    }
  }

  clickSubscription(subscriptionChoice) {
    let chosenSubscription = this.state.subscriptions[subscriptionChoice];
    this.setState(
      {
        mySubscription: chosenSubscription,
      },
      () => this.calculateRemainingSpace()
    );
  }

  createBox(products) {
    // once the data is retrieved from the API, the state of the box is initialized to an object where the quantity of each product is 0
    let newBox = {};
    products.forEach((item) => {
      newBox[item.id] = {
        qty: 0,
        volume: item.volume,
        points: item.points,
        name: item.name,
      };
    });
    this.setState({ box: newBox });
  }

  updateBox(id, qty) {
    // id and qty are passed up from the Product component. the state of the box is updated to reflect the new quantity based on the id

    this.setState(
      {
        box: {
          ...this.state.box,
          [id]: { ...this.state.box[id], qty: qty },
        },
      },
      () => this.calculateRemainingSpace()
    );
  }

  // called after the subscription is chosen AND whenever an item is added to the box.
  calculateRemainingSpace() {
    let totalVol = 0,
      totalPoints = 0;
    for (let product in this.state.box) {
      totalVol += this.state.box[product].volume * this.state.box[product].qty;
      totalPoints +=
        this.state.box[product].points * this.state.box[product].qty;
    }

    this.setState({
      remainingVolume: this.state.mySubscription.maxVolume - totalVol,
      remainingPoints: this.state.mySubscription.maxValue - totalPoints,
    });
  }

  render() {
    return (
      <div className="MainPage">
        <section className="navbar">
          <img
            src="https://splendidspoon.com/static-content/images/ss-logo-symbol-blue@2x.png"
            alt="Splendid Spoon logo"
          />
        </section>
        <div className="subscription-product-body">
          <section id="select-subscription-box-container">
            <div className="step-one-two">
              <div className="number-circle">1</div>
              <h4>SELECT A SUBSCRIPTION</h4>
            </div>
            <div className="subscription-options">
              <DropdownMenu
                subscription={this.state.subscriptions}
                clickSubscription={this.clickSubscription}
                mySubscription={this.state.mySubscription}
              />
              <BoxContents
                box={this.state.box}
                remainingPoints={this.state.remainingPoints}
                remainingVolume={this.state.remainingVolume}
              />
            </div>
          </section>
          <section id="choose-meals-container">
            <div className="step-one-two">
              <div className="number-circle">2</div>
              <h4>CHOOSE YOUR MEALS</h4>
            </div>

            <ProductList
              products={this.state.products}
              updateBox={this.updateBox}
              remainingPoints={this.state.remainingPoints}
              remainingVolume={this.state.remainingVolume}
              mySubscription={this.state.mySubscription}
            />

            <button id="save-button">Save</button>
          </section>
        </div>
      </div>
    );
  }
}

export default MainPage;

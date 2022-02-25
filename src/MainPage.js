import React, { Component } from "react";
import "./styles/MainPage.css";
import Dropdown from "./DropdownMenu";
import BoxContents from "./BoxContents";
import ProductList from "./ProductList";
import axios from 'axios';

const BOX_API = "https://mystifying-spence-dc3bda.netlify.app/build-a-box/";

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPoints: 0,
      currentVolume: 0,
      subscriptions: [],
      products: [],
      mySubscription: {},
      box: {}
    }
    this.clickSubscription = this.clickSubscription.bind(this);
    this.updateBox = this.updateBox.bind(this);
  }

  // explain WHY using componentDidMount and WHY I'm making an AJAX request here
  async componentDidMount() {
    let subscriptionResponse = await axios.get(`${BOX_API}subscriptions.json`);
    let productsResponse = await axios.get(`${BOX_API}products.json`);

    this.setState({
      subscriptions: subscriptionResponse.data.subscriptions,
      products: productsResponse.data.products
    })
  }

  clickSubscription (subscriptionChoice) {
    // value passed in is index of subscription (from subscriptions array) based on button click in DropdownMenu
    // this is working properly. console.log inside render method to see.
    let chosenSubscription = this.state.subscriptions[subscriptionChoice];
    this.setState ({mySubscription: chosenSubscription});
  }


  calculateRemainingSpace(boxObject) {



    console.log('boxObject inside calculateRemainingSpace', boxObject)

    let totalPoints = boxObject.qty * boxObject.points;
    let totalVolume = boxObject.qty * boxObject.volume;

    //bug: still subtracts from total volume and points even if they're 0

    let remainingPoints = this.state.maxPoints - totalPoints;
    let remainingVolume = this.state.maxVolume - totalVolume;

    console.log('remainingPoints:', remainingPoints, 'remainingVolume:', remainingVolume)

    return [remainingPoints, remainingVolume];
  }

  updateBox (boxObject) {

    console.log('boxObject:', boxObject)
    let remainingPoints = this.calculateRemainingSpace(boxObject);
    console.log('remainingPoints', remainingPoints);
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
            <BoxContents box={this.state.box}/>
          </div>
        </section>
        <section>
         <ProductList
          products={this.state.products}
          updateBox={this.updateBox}
         />
        </section>
      </div>
    );
  }
}

export default MainPage;

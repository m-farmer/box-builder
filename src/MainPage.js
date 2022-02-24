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
      maxValue: 0,
      maxVolume: 0,
      currentValue: 0,
      currentVolume: 0,
      subscriptions: [],
      products: [],
      box: {}
    }
    this.clickSubscription = this.clickSubscription.bind(this);
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
    let mySubscription = this.state.subscriptions[subscriptionChoice]
    this.setState ({
      maxValue: mySubscription.maxValue,
      maxVolume: mySubscription.maxVolume
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
            <BoxContents box={this.state.box}/>
          </div>
        </section>
        <section className="products">
         <ProductList products={this.state.products}/>
        </section>
      </div>
    );
  }
}

export default MainPage;

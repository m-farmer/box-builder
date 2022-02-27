import React, { Component } from "react";
import "./styles/DropdownMenu.css";

class Dropdown extends Component {
  constructor() {
    super();
    // this.state = {
    //   value: "Choose Plan"
    // }
    // we need to bind so that the method refers to the context of this component

    this.handleClickSubscription = this.handleClickSubscription.bind(this);

  }

  // affecting the state of the parent via the child
  // calling clickSubscription from within the child component will trigger a re-render of the parent and all its children, which makes sense because the available products depend on the selected subscription
  handleClickSubscription(evt) {
    // passes the id of the box size up to parent MainPage

    this.props.clickSubscription(evt.target.value);
  }


  render() {

    const { subscription } = this.props;

    let options = subscription.map((sub, idx) => (
      <option value={idx} label={sub.name} >

        {sub.name}
      </option>
    ));




    return (
      <section className="Dropdown">
        <div className="subscribe-button">
          <h1>Select a subscription</h1>
          {/* using index to determine subscription selection */}
              <label>
              Select a subscription:
              <select onChange={this.handleClickSubscription}>
              <option selected disabled />
                {options}
              </select>
              </label>


          {/* {this.state.subscription.map((sub, idx) =>
         <button onClick={this.handleClickSubscription}
          value={sub.name}
          key={sub.id}
          id={idx}
         >
         {sub.name}</button>)} */}
        </div>
      </section>
    );
  }
}

export default Dropdown;

import React, { Component } from 'react';
import './styles/DropdownMenu.css'

class Dropdown extends Component {

  constructor(props) {
    // don't need props inside constructor so don't call it with super
    super();
    // we need to bind so that the method refers to the context of this component
    this.handleClickSubscription = this.handleClickSubscription.bind(this);
  }

  // affecting the state of the parent via the child
  // calling clickSubscription from within the child component will trigger a re-render of the parent and all its children, which makes sense because the available products depend on the selected subscription
  handleClickSubscription(evt) {
    // passes the id of the box size up to parent MainPage
    this.props.clickSubscription(evt.target.id);
  }

  render() {
    let {subscription} = this.props;

    return (
      <section className="Dropdown">
        <div className="subscribe-button">
        <h1>Choose a subscription!</h1>
        {/* using index to determine subscription selection */}
         {subscription.map((sub, idx) =>
         <button onClick={this.handleClickSubscription}
          value={sub.name}
          key={sub.id}
          id={idx}
         >
         {sub.name}</button>)}
        </div>


      </section>
    )
  }
}

export default Dropdown;

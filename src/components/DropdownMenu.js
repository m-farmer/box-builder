import React, { Component } from "react";
import "../styles/DropdownMenu.css";

class DropdownMenu extends Component {
  constructor() {
    super();

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
      <option key={sub.id} value={idx} label={`${sub.name}  - ${sub.maxVolume} in³ - ${sub.maxValue} points`} />
    ));

    return (
      <section className="Dropdown">
        <div className="subscribe">
          {/* using index to determine subscription selection */}



              <select className="dropdown-buttons" onChange={this.handleClickSubscription}>
                <option selected disabled >Choose one</option>
                {options}
              </select>
        </div>
      </section>
    );
  }
}

export default DropdownMenu;

import React, { Component } from 'react';
import '../styles/BoxContents.css'

class BoxContents extends Component {

  // for now, the box is only for displaying information and doesn't hold state (no constructor)
  render() {

    let { box, remainingVolume, remainingPoints } = this.props;

    let stock = [];
    for (let product in box) {
      box[product].qty > 0 && stock.push(`${box[product].name} (${box[product].qty})\n`)
    }



    // in case the user changes their mind and switches to a smaller subscription, they'll have to take stuff out of the box.

    return (
      <div id="box-container">
        {remainingVolume < 0 || remainingPoints < 0 ?
        <h4 className="box-error">Please remove an item!</h4>
        :
        <h4>YOUR MEALS</h4>
        }
        <div className="available-space">
        {(remainingVolume > 0 && remainingPoints > 0) && <p>Available volume: {remainingVolume} in³ <br /> Available points: {remainingPoints} </p> }


        </div>

        {stock.map(item => <p className="box-item">{item}</p>)}


      </div>


    )
  }
}

export default BoxContents;

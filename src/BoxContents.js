import React, { Component } from 'react';

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
      <div>
        {remainingVolume < 0 || remainingPoints < 0 ?
        <h1>Please remove an item!</h1>
        :
        <h1>In the box:</h1>
        }
        {stock.map(item => <div>{item}</div>)}

      </div>


    )
  }
}

export default BoxContents;

Set up the code and run it on localhost:3000:

`npm install`
`npm start`


# MVP:

# Design:
[ ] Drop-down menu with Small, Medium, and Large Subscription Options <br />
[x] List of available products with details <br />
[x] Product details include + / - buttons for quantity <br />
[x] A Save Button (currently does nothing) <br />

## User Experience:
[x] User must select a subscription before choosing items for the box <br />
[x] User can select one option from the drop-down menu (and can change their minds later) <br />
[ ] User will see a maximum displayed for both volume and value once they make a selection (?) <br />
[x] User can select products by clicking the + / - buttons <br />

## Functionality:
[ ] Selecting one of the options from the drop-down menu provides the Maximum Value and Maximum Volume information for that box <br />
[x] Selecting the + / - button for any item will increase or decrease the quantity by 1 <br />
[x] Increasing or decreasing the quantity will subtract from / add to the total available Value and Volume <br />
[x] The User is not permitted to add more than the allotted volume/value to the box <br />

## Implementation:
[x] The loading of the page will trigger an external API call that will retrieve both the subscription and product JSON data, asynchronously <br />
[x] Selecting a box size will set the state for the volume and value limits through a callback function. <br />
[x] When the User selects the + / - buttons on individual products, the state will be updated for the remaining volume and value through callback functions <br />
[x] Every time the volume and value state is updated, IF any of the products exceed this limit in volume or value it triggers a re-rendering of the product with the button deactivated <br />

## Extras:
[x] Warning message when button is deactivated (box is too full or no subscription chosen) <br />
[ ] Testing scripts <br />

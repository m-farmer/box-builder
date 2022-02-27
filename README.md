Set up the code and run it on localhost:3000:

### `npm install`
### `npm start`


### MVP:

# Design:
[ ] Drop-down menu with Small, Medium, and Large Subscription Options
[x] List of available products with details
[x] Product details include + / - buttons for quantity
[x] A Save Button (currently does nothing)

# User Experience:
[x] User must select a subscription before choosing items for the box
[x] User can select one option from the drop-down menu (and can change their minds later)
[ ] User will see a maximum displayed for both volume and value once they make a selection (?)
[x] User can select products by clicking the + / - buttons

# Functionality:
[ ] Selecting one of the options from the drop-down menu provides the Maximum Value and Maximum Volume information for that box
[x] Selecting the + / - button for any item will increase or decrease the quantity by 1
[x] Increasing or decreasing the quantity will subtract from / add to the total available Value and Volume
[x] The User is not permitted to add more than the allotted volume/value to the box

# Implementation:
[x] The loading of the page will trigger an external API call that will retrieve both the subscription and product JSON data, asynchronously
[x] Selecting a box size will set the state for the volume and value limits through a callback function.
[x] When the User selects the + / - buttons on individual products, the state will be updated for the remaining volume and value through callback functions
[x] Every time the volume and value state is updated, IF any of the products exceed this limit in volume or value it triggers a re-rendering of the product with the button deactivated

# Extras:
[x] Warning message when button is deactivated (box is too full or no subscription chosen)
[ ] Testing scripts

//libs
import React from "react";
import { connect } from "react-redux";
import each from "lodash/each";
//ui components
import Card from "react-bootstrap/Card";
//app componenets
import ShoppingCartItem from "./shoppingCartItem";

class ShoppingCart extends React.Component {
	//TODO: put this in utils
	getNumberOfItemsOrdered = () => {
		let numberOfItemsOrdered = 0;

		each(this.props.orderItems, (orderItem) => {
			numberOfItemsOrdered = numberOfItemsOrdered + orderItem.quantity;
		});

		return numberOfItemsOrdered;
	};

	renderShoppingCartItems = () => {
		/**
		 * I think we need to put the uuid at the order Item level
		 * then when we search the array we search by that item to open in a modal
		 *
		 */
		return this.props.orderItems.map((orderItem) => {
			console.log(orderItem);
			return <ShoppingCartItem item={orderItem} key={orderItem.uniqueId} />;
		});
	};
	render() {
		return (
			<div>
				<Card>
					<Card.Header>
						My Order: {this.getNumberOfItemsOrdered()} Items
					</Card.Header>
					<Card.Body>{this.renderShoppingCartItems()}</Card.Body>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderItems: state.order.orderItems,
	};
};

export default connect(mapStateToProps, {})(ShoppingCart);

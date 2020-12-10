//libs
import React from "react";
import { connect } from "react-redux";
import each from "lodash/each";
//ui components
import Card from "react-bootstrap/Card";
//app componenets
import ShoppingCartItems from "./shoppingCartItems";
import ShoppingCartItem from "./shoppingCartItem";
import ShoppingCartTotal from "./shoppingCartTotal";
import ShoppingCartDetails from "./shoppingCartDetails";

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
		return this.props.orderItems.map((orderItem) => {
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
					<Card.Body>
						<ShoppingCartItems />
						<hr />
						<ShoppingCartTotal />
						<hr />
						<ShoppingCartDetails />
					</Card.Body>
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

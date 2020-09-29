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

		each(this.props.orderDetails, (orderItem) => {
			numberOfItemsOrdered = numberOfItemsOrdered + orderItem.quantity;
		});

		return numberOfItemsOrdered;
	};

	renderShoppingCartItems = () => {
		return this.props.orderDetails.map((orderItem) => {
			return <ShoppingCartItem item={orderItem} />;
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
		orderDetails: state.order.orderDetails,
	};
};

export default connect(mapStateToProps, {})(ShoppingCart);

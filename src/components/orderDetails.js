//libs
import React from "react";
import { connect } from "react-redux";
//ui componenets
//app componenets
import ShoppingCart from "./shoppingCart";
import ShoppingCartTotal from "./shoppingCartTotal";
import ShoppingCartDetails from "./shoppingCartDetails";

class OrderDetails extends React.Component {
	render() {
		return (
			<div>
				<ShoppingCart />
				<ShoppingCartTotal />
				<ShoppingCartDetails />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderDetails: state.order.orderDetails,
	};
};

export default connect(mapStateToProps, {})(OrderDetails);

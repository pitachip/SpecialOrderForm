//libs
import React from "react";
import { connect } from "react-redux";
//ui componenets
//app componenets
import ShoppingCart from "./shoppingCart";
import ShoppingCartTotal from "./shoppingCartTotal";

class OrderDetails extends React.Component {
	render() {
		return (
			<div>
				<ShoppingCart />
				<ShoppingCartTotal />
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

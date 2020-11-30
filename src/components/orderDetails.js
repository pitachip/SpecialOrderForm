//libs
import React from "react";
import { connect } from "react-redux";
//app componenets
import ShoppingCart from "./shoppingCart";

class OrderDetails extends React.Component {
	render() {
		return (
			<div>
				<ShoppingCart />
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

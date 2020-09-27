//libs
import React from "react";
import { connect } from "react-redux";
//ui componenets
//app componenets
import ShoppingCart from "./shoppingCart";

class OrderDetails extends React.Component {
	render() {
		return <ShoppingCart />;
	}
}

const mapStateToProps = (state) => {
	return {
		orderDetails: state.order.orderDetails,
	};
};

export default connect(mapStateToProps, {})(OrderDetails);

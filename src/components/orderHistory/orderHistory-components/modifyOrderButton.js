//libs
import React from "react";
import { connect } from "react-redux";
import { change } from "redux-form";
//ui components
import { Button, Icon } from "semantic-ui-react";
//actions
import {
	addItemToOrder,
	updateShippingMethod,
	updateOrderTotals,
	deleteAllOrderItems,
	updatePickupLocation,
	updateSpecialInstructions,
	updateOrderDate,
	updatePickupInstructions,
	setRootUrl,
	setRetrieveOrder,
} from "../../../actions";
//utils
import { history } from "../../../utils/history";
//css
import "../orderHistory-css/orderActions.css";

class ModifyOrderButton extends React.Component {
	modifyOrderClicked = (order) => {
		//TODO: set the navigation retrieve order to false so it retrieves the new order that was clicked
		this.props.setRetrieveOrder(true);
		this.props.setRootUrl(`/modify/${order._id}/`);
		history.push(`/modify/${order._id}`);
	};

	render() {
		const { orderDetails } = this.props;
		return (
			<Button
				className="actionButtonsMargin"
				onClick={() => this.modifyOrderClicked(orderDetails)}
			>
				<Icon name="edit" /> Modify Order
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menuConfig: state.menu.menuConfig,
		storeInformation: state.storeInformation.storeInformation,
		orderItems: state.order.orderItems,
	};
};

export default connect(mapStateToProps, {
	addItemToOrder,
	updateShippingMethod,
	updateOrderTotals,
	deleteAllOrderItems,
	updatePickupLocation,
	updateSpecialInstructions,
	updateOrderDate,
	change,
	updatePickupInstructions,
	setRootUrl,
	setRetrieveOrder,
})(ModifyOrderButton);

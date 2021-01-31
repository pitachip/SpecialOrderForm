//libs
import React from "react";
import { connect } from "react-redux";
import { change } from "redux-form";
import each from "lodash/each";
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
	setSpecialInstructionsToggle,
} from "../../../actions";
//utils
import {
	formatSelectionForCheckout,
	calculateTotals,
} from "../../../utils/orderCheckoutUtils";
import { history } from "../../../utils/history";
//css
import "../orderHistory-css/orderActions.css";

class RepeatOrderButton extends React.Component {
	repeatOrderClicked = (order) => {
		const {
			addItemToOrder,
			updateShippingMethod,
			updateOrderTotals,
			deleteAllOrderItems,
			updatePickupLocation,
			updateSpecialInstructions,
			updateOrderDate,
			storeInformation,
			change,
			updatePickupInstructions,
			setSpecialInstructionsToggle,
		} = this.props;

		deleteAllOrderItems();
		const {
			orderItems,
			orderDetails,
			customerInformation,
			pickupInformation,
			deliveryInformation,
			paymentInformation,
		} = order;
		each(orderItems, (item) => {
			addItemToOrder(
				formatSelectionForCheckout(
					item.originalMenuItem,
					item.originalSelectionFormat,
					item.quantity,
					item.specialInstructions,
					false,
					null
				)
			);
		});

		setSpecialInstructionsToggle(true);
		updateSpecialInstructions(orderDetails.specialInstructions);

		updateShippingMethod(orderDetails.shippingMethod);
		if (orderDetails.shippingMethod === "pickup") {
			updatePickupLocation(orderDetails.location, storeInformation);
			updatePickupInstructions(pickupInformation.pickupInstructions);
		} else {
			//Set Delivery Information Fields
			change("checkoutContactForm", "address1", deliveryInformation.address1);
			change("checkoutContactForm", "address2", deliveryInformation.address2);
			change("checkoutContactForm", "city", deliveryInformation.city);
			change("checkoutContactForm", "state", deliveryInformation.state);
			change("checkoutContactForm", "zip", deliveryInformation.zip);
			change(
				"checkoutContactForm",
				"deliveryInstructions",
				deliveryInformation.deliveryInstructions
			);

			change(
				"checkoutContactForm",
				"firstNameDelivery",
				deliveryInformation.firstName
			);
			change(
				"checkoutContactForm",
				"lastNameDelivery",
				deliveryInformation.lastName
			);
			change("checkoutContactForm", "emailDelivery", deliveryInformation.email);
			change(
				"checkoutContactForm",
				"phoneNumberDelivery",
				deliveryInformation.phoneNumber
			);
		}

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		updateOrderDate(tomorrow);

		//Set Customer Information Fields
		change("checkoutContactForm", "firstName", customerInformation.firstName);
		change("checkoutContactForm", "lastName", customerInformation.lastName);
		change("checkoutContactForm", "email", customerInformation.email);
		change(
			"checkoutContactForm",
			"phoneNumber",
			customerInformation.phoneNumber
		);

		//Set Payment Fields
		change(
			"paymentInformationForm",
			"paymentType",
			paymentInformation.paymentType
		);
		change(
			"paymentInformationForm",
			"purchaseOrder",
			paymentInformation.purchaseOrder
		);
		change(
			"paymentInformationForm",
			"purchaseOrderNumber",
			paymentInformation.purchaseOrderNumber
		);
		change("paymentInformationForm", "taxExempt", paymentInformation.taxExempt);
		change(
			"paymentInformationForm",
			"taxExemptId",
			paymentInformation.taxExemptId
		);
		change(
			"paymentInformationForm",
			"universityMoneyAccount",
			paymentInformation.universityMoneyAccount
		);

		//calculate the totals and taxes
		let calculatedAmounts = calculateTotals(
			orderItems,
			this.props.menuConfig.settings,
			orderDetails.shippingMethod,
			paymentInformation
		);
		updateOrderTotals(calculatedAmounts);

		history.push("/order");
	};

	render() {
		const { orderDetails } = this.props;
		return (
			<Button onClick={() => this.repeatOrderClicked(orderDetails)}>
				<Icon name="repeat" />
				Repeat Order
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menuConfig: state.menu.menuConfig,
		storeInformation: state.storeInformation.storeInformation,
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
	setSpecialInstructionsToggle,
})(RepeatOrderButton);

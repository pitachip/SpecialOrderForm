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
} from "../../../actions";
//utils
import {
	formatSelectionForCheckout,
	calculateTotals,
} from "../../../utils/orderCheckoutUtils";
import { history } from "../../../utils/history";
//css
import "../orderHistory-css/orderActions.css";

class OrderStatusButton extends React.Component {
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
		} = this.props;
		/**
		 * TODO
		 * - need to make sure this works for invoices too
		 */
		console.log("Repeat order clicked", order);

		deleteAllOrderItems();
		const {
			orderItems,
			orderDetails,
			customerInformation,
			pickupInformation,
			deliveryInformation,
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

		updateSpecialInstructions(orderDetails.specialInstructions);

		const calculatedAmounts = calculateTotals(
			orderItems,
			this.props.menuConfig.settings,
			orderDetails.shippingMethod
		);
		updateOrderTotals(calculatedAmounts);

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

		history.push("/order");
	};

	render() {
		const { orderDetails } = this.props;
		return (
			<div>
				<Button.Group vertical compact>
					<Button className="actionButtonsMargin">
						<Icon name="eye" />
						View Order
					</Button>
					<Button className="actionButtonsMargin">
						<Icon name="edit" /> Modify Order
					</Button>
					<Button className="actionButtonsMargin">
						<Icon name="cancel" />
						Cancel Order
					</Button>
					<Button className="actionButtonsMargin">
						<Icon name="file alternate outline" />
						View Invoice/Reciept
					</Button>
					<Button onClick={() => this.repeatOrderClicked(orderDetails)}>
						<Icon name="repeat" />
						Repeat Order
					</Button>
				</Button.Group>
			</div>
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
})(OrderStatusButton);

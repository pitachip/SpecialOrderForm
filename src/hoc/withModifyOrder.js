//libs
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { change } from "redux-form";
import each from "lodash/each";
//ui components
import { Dimmer, Loader, Message } from "semantic-ui-react";
//actions
import {
	getOrder,
	addItemToOrder,
	updateShippingMethod,
	updateOrderTotals,
	deleteAllOrderItems,
	updatePickupLocation,
	updateSpecialInstructions,
	updateOrderDate,
	updatePickupInstructions,
	setRetrieveOrder,
	setSpecialInstructionsToggle,
} from "../actions";
//utils
import {
	formatSelectionForCheckout,
	calculateTotals,
} from "../utils/orderCheckoutUtils";

const withModifyOrder = (SpecialOrder) => {
	class WithModifyOrderComponent extends React.Component {
		state = { isLoading: true, didError: false };

		async componentDidMount() {
			const { navigation, setRetrieveOrder } = this.props;
			if (navigation.retrieveOrder) {
				try {
					const order = await this.props.getOrder(
						this.props.computedMatch.params.id
					);
					this.setState({ isLoading: false });
					setRetrieveOrder(false);
					this.setOrderData(order);
				} catch (error) {
					this.setState({ didError: true, isLoading: false });
				}
			} else {
				this.setState({ isLoading: false });
			}
		}

		renderErrorMessage = () => {
			return (
				<div style={{ height: "100vh" }}>
					<Message negative>
						<Message.Header>Error!</Message.Header>
						<p>You do not have access to edit this order.</p>
					</Message>
				</div>
			);
		};

		renderLoader = () => {
			return (
				<div style={{ height: "100vh" }}>
					<Dimmer active inverted>
						<Loader inverted>Retrieving Your Order</Loader>
					</Dimmer>
				</div>
			);
		};

		render() {
			const { isLoading, didError } = this.state;

			if (isLoading && !didError) {
				return this.renderLoader();
			} else if (!isLoading && didError) {
				return this.renderErrorMessage();
			} else if (!isLoading && !didError) {
				return <SpecialOrder />;
			}
		}

		setOrderData = (order) => {
			console.log(order);
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
				change(
					"checkoutContactForm",
					"emailDelivery",
					deliveryInformation.email
				);
				change(
					"checkoutContactForm",
					"phoneNumberDelivery",
					deliveryInformation.phoneNumber
				);
			}
		};
	}
	return WithModifyOrderComponent;
};

const mapStateToProps = (state) => {
	return {
		navigation: state.navigation,
	};
};

//created in order to wrap the connect function with the HOC
const composedModifyOrder = compose(
	connect(mapStateToProps, {
		getOrder,
		addItemToOrder,
		updateShippingMethod,
		updateOrderTotals,
		deleteAllOrderItems,
		updatePickupLocation,
		updateSpecialInstructions,
		updateOrderDate,
		updatePickupInstructions,
		setRetrieveOrder,
		setSpecialInstructionsToggle,
		change,
	}),
	withModifyOrder
);

export default composedModifyOrder;

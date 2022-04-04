//libs
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { change } from "redux-form";
import each from "lodash/each";
//ui components
import { Dimmer, Loader, Message } from "semantic-ui-react";
//app components
import ModifyDisclaimer from "../components/modifyDisclaimer";
//actions
import {
	getOrder,
	addItemToOrder,
	updateShippingMethod,
	deleteAllOrderItems,
	updatePickupLocation,
	updateSpecialInstructions,
	updateOrderDate,
	updatePickupInstructions,
	setRetrieveOrder,
	setRootUrl,
	setSpecialInstructionsToggle,
	updateOrderTotals,
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
			window.scrollTo(0, 0);
			const { navigation, setRetrieveOrder, setRootUrl } = this.props;
			if (navigation.retrieveOrder) {
				try {
					const order = await this.props.getOrder(
						this.props.computedMatch.params.id
					);
					this.setState({ isLoading: false });
					setRetrieveOrder(false);
					setRootUrl(`/modify/${order._id}/`);
					this.setOrderData(order);
				} catch (error) {
					console.log(error);
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
				//return <SpecialOrder />;
				return (
					<>
						<ModifyDisclaimer />
						<SpecialOrder />
					</>
				);
			}
		}

		setOrderData = (order) => {
			const {
				addItemToOrder,
				updateShippingMethod,
				deleteAllOrderItems,
				updatePickupLocation,
				updateSpecialInstructions,
				updateOrderDate,
				storeInformation,
				change,
				updatePickupInstructions,
				setSpecialInstructionsToggle,
				updateOrderTotals,
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

			updateOrderDate(orderDetails.orderDate);

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
			change(
				"paymentInformationForm",
				"taxExempt",
				paymentInformation.taxExempt
			);
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
				paymentInformation,
				this.props.totals.tip
			);
			updateOrderTotals(calculatedAmounts);
		};
	}
	return WithModifyOrderComponent;
};

const mapStateToProps = (state) => {
	return {
		navigation: state.navigation,
		storeInformation: state.storeInformation.storeInformation,
		menuConfig: state.menu.menuConfig,
		totals: state.order.totals,
	};
};

//created in order to wrap the connect function with the HOC
const composedModifyOrder = compose(
	connect(mapStateToProps, {
		getOrder,
		addItemToOrder,
		updateShippingMethod,
		deleteAllOrderItems,
		updatePickupLocation,
		updateSpecialInstructions,
		updateOrderDate,
		updatePickupInstructions,
		setRetrieveOrder,
		setRootUrl,
		setSpecialInstructionsToggle,
		change,
		updateOrderTotals,
	}),
	withModifyOrder
);

export default composedModifyOrder;

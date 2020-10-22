//libs
import React from "react";
//ui components
import Container from "react-bootstrap/Container";
//app components
import OrderConfirmationForm from "./checkout-forms/orderConfirmationForm";
import CheckoutProgressBar from "./checkoutProgressBar";
import CheckoutNavigation from "./checkoutNavigation";
//css
import "./checkout-css/checkoutDetails.css";

class ConfirmationDetails extends React.Component {
	render() {
		const progressBar = [
			{
				icon: "food",
				title: "Order",
				completed: true,
				disabled: false,
				active: false,
				description: null,
			},
			{
				icon: "info",
				title: "Contact",
				completed: true,
				disabled: false,
				active: false,
				description: "Enter your contact information",
			},
			{
				icon: "payment",
				title: "Payment",
				completed: true,
				disabled: false,
				active: false,
				description: "Enter your payment details",
			},
			{
				icon: "flag checkered",
				title: "Confirmation",
				completed: false,
				disabled: false,
				active: true,
				description: "Review and submit your order",
			},
		];
		return (
			<Container className="checkoutDetailsContainer">
				<CheckoutProgressBar progressBarData={progressBar} />
				<OrderConfirmationForm />
				<CheckoutNavigation
					backNav="/checkout/payment"
					backText="Payment"
					forwardNav="/checkout/submitOrder"
					forwardText="Submit Order"
				/>
			</Container>
		);
	}
}

export default ConfirmationDetails;

//libs
import React from "react";
//ui components
import Container from "react-bootstrap/Container";
//app components
import OrderConfirmation from "../confirmation/confirmation-components/orderConfirmation";
import CheckoutProgressBar from "./checkoutProgressBar";
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
				description: "Enter your payment details and submit order",
			},
			{
				icon: "flag checkered",
				title: "Confirmation",
				completed: false,
				disabled: false,
				active: true,
				description: "Review your submitted order",
			},
		];
		return (
			<Container className="checkoutDetailsContainer">
				<CheckoutProgressBar progressBarData={progressBar} />
				<OrderConfirmation />
			</Container>
		);
	}
}

export default ConfirmationDetails;

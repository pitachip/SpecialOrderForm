//libs
import React from "react";
//ui components
import Container from "react-bootstrap/Container";
//app components
import PaymentInformationForm from "./checkout-forms/paymentInformationForm";
import CheckoutProgressBar from "./checkoutProgressBar";
import CheckoutNavigation from "./checkoutNavigation";
//css
import "./checkout-css/checkoutDetails.css";

class PaymentDetails extends React.Component {
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
				completed: false,
				disabled: false,
				active: true,
				description: "Enter your payment details",
			},
			{
				icon: "flag checkered",
				title: "Confirmation",
				completed: false,
				disabled: true,
				active: false,
				description: "Review and submit your order",
			},
		];
		return (
			<Container className="checkoutDetailsContainer">
				<CheckoutProgressBar progressBarData={progressBar} />
				<PaymentInformationForm />
				<CheckoutNavigation
					backNav="/checkout/details"
					backText="Contact"
					forwardNav="/checkout/confirmation"
					forwardText="Confirmation"
				/>
			</Container>
		);
	}
}

export default PaymentDetails;

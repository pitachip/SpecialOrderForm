//libs
import React from "react";
//ui components
import Container from "react-bootstrap/Container";
//app components
import CustomerInformationForm from "./checkout-forms/customerInformationForm";
import DeliveryInformationForm from "./checkout-forms/deliveryInformationForm";
import CheckoutProgressBar from "./checkoutProgressBar";
import CheckoutNavigation from "./checkoutNavigation";
//css
import "./checkout-css/checkoutDetails.css";

class CheckoutDetails extends React.Component {
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
				completed: false,
				disabled: false,
				active: true,
				description: "Enter your contact information",
			},
			{
				icon: "payment",
				title: "Payment",
				completed: false,
				disabled: true,
				active: false,
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
				<DeliveryInformationForm />
				<CustomerInformationForm />
				<CheckoutNavigation
					backNav="/order"
					backText="Order"
					forwardNav="/checkout/payment"
					forwardText="Payment"
				/>
			</Container>
		);
	}
}

export default CheckoutDetails;

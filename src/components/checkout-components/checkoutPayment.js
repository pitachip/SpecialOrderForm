//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//app components
import PaymentInformationForm from "../payment/payment-forms/paymentInformationForm";
import CheckoutProgressBar from "./checkoutProgressBar";
import OrderSummary from "./orderSummary";
//css
import "./checkout-css/checkoutDetails.css";

class PaymentDetails extends React.Component {
	//TODO: Move navigation to form
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
				description: "Enter your payment details and submit order",
			},
			{
				icon: "flag checkered",
				title: "Confirmation",
				completed: false,
				disabled: true,
				active: false,
				description: "Review your submitted order",
			},
		];
		return (
			<Container className="checkoutDetailsContainer">
				<CheckoutProgressBar progressBarData={progressBar} />
				<Row>
					<Col md={6}>
						<PaymentInformationForm />
					</Col>
					<Col md={6}>
						<OrderSummary />
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		totals: state.order.totals,
	};
};

export default connect(mapStateToProps, {})(PaymentDetails);

//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//app components
import CheckoutProgressBar from "./checkoutProgressBar";
import CheckoutContactForm from "./checkout-forms/checkoutContactForm";
import OrderSummary from "./orderSummary";
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
				<Row>
					<Col md={8}>
						<CheckoutContactForm />
					</Col>
					<Col md={4}>
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

export default connect(mapStateToProps, {})(CheckoutDetails);

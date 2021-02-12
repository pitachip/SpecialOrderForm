//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//app components
import CheckoutProgressBar from "./checkoutProgressBar";
import CheckoutContactForm from "./checkout-forms/checkoutContactForm";
import OrderSummary from "./orderSummary";
import ModifyDisclaimer from "../modifyDisclaimer";
//css
import "./checkout-css/checkoutDetails.css";

class CheckoutDetails extends React.Component {
	render() {
		const { rootUrl } = this.props;
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
			<>
				{rootUrl !== "/" ? <ModifyDisclaimer /> : null}
				<div className="container-fluid checkoutDetailsContainer">
					<div className="checkoutSteps">
						<CheckoutProgressBar progressBarData={progressBar} />
					</div>
					<Row>
						<Col md={6}>
							<CheckoutContactForm />
						</Col>
						<Col md={6}>
							<OrderSummary />
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		totals: state.order.totals,
		rootUrl: state.navigation.rootUrl,
	};
};

export default connect(mapStateToProps, {})(CheckoutDetails);

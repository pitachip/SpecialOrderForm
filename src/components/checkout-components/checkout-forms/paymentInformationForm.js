//libs
import React from "react";
import { connect } from "react-redux";
//app components
import PaymentOptions from "../paymentOptions";
import CheckoutNavigation from "../checkoutNavigation";

class PaymentInformationForm extends React.Component {
	renderPaymentForm = (paymentType) => {
		switch (paymentType) {
			case "cc":
				return <p>Credit Card Form</p>;
			case "check":
				return <p>Check Form</p>;
			case "univ":
				return <p>Univ Form</p>;
			default:
				return <p>Please choose a payment option</p>;
		}
	};
	render() {
		const { paymentType } = this.props.paymentDetails;
		return (
			<div>
				<h2>How do you want to pay?</h2>
				<PaymentOptions />
				{this.renderPaymentForm(paymentType)}
				<CheckoutNavigation
					backNav="/checkout/details"
					backText="Contact"
					forwardText="Confirmation"
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		paymentDetails: state.order.paymentDetails,
	};
};

export default connect(mapStateToProps, {})(PaymentInformationForm);

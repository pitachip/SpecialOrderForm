//libs
import React from "react";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { reduxForm, getFormValues } from "redux-form";
//app components
import PaymentOptions from "../payment-components/paymentOptions";
import PaymentDisclaimer from "../payment-components/paymentDisclaimer";
import CheckForm from "./checkForm";
import UnivForm from "./univForm";
import CreditCardForm from "./creditCardForm";

class PaymentInformationForm extends React.Component {
	constructor(props) {
		super(props);
		this.stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
	}

	renderPaymentForm = (paymentType) => {
		switch (paymentType) {
			case "cc":
				return (
					<Elements stripe={this.stripePromise}>
						<ElementsConsumer>
							{({ stripe, elements }) => (
								<CreditCardForm stripe={stripe} elements={elements} />
							)}
						</ElementsConsumer>
					</Elements>
				);
			case "check":
				return <CheckForm />;
			case "univ":
				return <UnivForm />;
			default:
				return <PaymentDisclaimer />;
		}
	};
	render() {
		return (
			<div>
				<h2>How do you want to pay?</h2>
				<PaymentOptions />
				{this.props.paymentInformation
					? this.renderPaymentForm(this.props.paymentInformation.paymentType)
					: this.renderPaymentForm("")}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		initialValues: { paymentType: "", taxExempt: false },
		paymentInformation: getFormValues("paymentInformationForm")(state),
		contactInformation: getFormValues("checkoutContactForm")(state),
		orderItems: state.order.orderItems,
	};
};

export default connect(
	mapStateToProps,
	{}
)(
	reduxForm({
		form: "paymentInformationForm",
		enableReinitialize: false,
		destroyOnUnmount: false,
	})(PaymentInformationForm)
);

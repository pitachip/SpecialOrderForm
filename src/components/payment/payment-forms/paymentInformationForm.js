//libs
import React from "react";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { reduxForm, getFormValues } from "redux-form";
import pitachip from "../../../apis/pitachip";
//ui components
import Form from "react-bootstrap/Form";
//app components
import PaymentOptions from "../payment-components/paymentOptions";
import CheckoutNavigation from "../../checkout-components/checkoutNavigation";
import PaymentDisclaimer from "../payment-components/paymentDisclaimer";
import CheckForm from "./checkForm";
import UnivForm from "./univForm";
import CreditCardForm from "./creditCardForm";

class PaymentInformationForm extends React.Component {
	constructor(props) {
		super(props);
		this.stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
	}

	submitOrderClicked = async (e) => {
		e.preventDefault();
		const stripe = await this.stripePromise;
		const session = await pitachip.post("/payment/session", {
			email: this.props.contactInformation.email,
		});

		const stripeCheckout = await stripe.redirectToCheckout({
			sessionId: session.data,
		});

		if (stripeCheckout.error) {
			console.log(stripeCheckout);
		}
	};

	renderPaymentForm = (paymentType) => {
		switch (paymentType) {
			case "cc":
				return <CreditCardForm />;
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
				<Form onSubmit={(e) => this.submitOrderClicked(e)}>
					<PaymentOptions />
					{this.props.paymentInformation
						? this.renderPaymentForm(this.props.paymentInformation.paymentType)
						: this.renderPaymentForm("")}
					<CheckoutNavigation
						backNav="/checkout/details"
						backText="Contact"
						forwardText="Submit Order"
					/>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		initialValues: { paymentType: "", taxExempt: false },
		paymentInformation: getFormValues("paymentInformationForm")(state),
		contactInformation: getFormValues("checkoutContactForm")(state),
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

//export default connect(mapStateToProps, {})(PaymentInformationForm);

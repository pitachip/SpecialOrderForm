//libs
import React from "react";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { reduxForm, getFormValues } from "redux-form";
import pitachip from "../../../apis/pitachip";
//ui components
import Form from "react-bootstrap/Form";
//app components
import PaymentOptions from "../payment-components/paymentOptions";
import PaymentDisclaimer from "../payment-components/paymentDisclaimer";
import CheckForm from "./checkForm";
import UnivForm from "./univForm";
import CreditCardForm from "./creditCardForm";
//utils
import { formatCheckoutForStripe } from "../../../utils/orderCheckoutUtils";

class PaymentInformationForm extends React.Component {
	constructor(props) {
		super(props);
		this.stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
	}

	submitOrderClicked = async (e) => {
		e.preventDefault();

		/**
		 * Data flow (for pre-built ui)
		 * 1. add metadata (session id, user id) to the session and create session
		 * 2. add item to mongo db (make sure uid is attached to it)
		 * 3. redirect to checkout and complete
		 * 4. set up webhook in node to listen to succesful payments
		 *
		 * Data flow (for custom ui)
		 * 1.1 Set up the UI by yourself (a lot more work)
		 * 1. set up payment intent on node (no need for complex formatting)
		 * 2. get secret session id and pass that along when you want to complete the payment
		 * 3. save all that information in one shot to mongodb
		 * 4. display any errors
		 */

		const stripe = await this.stripePromise;

		const session = await pitachip.post("/payment/session", {
			email: this.props.contactInformation.email,
			lineItems: formatCheckoutForStripe(this.props.orderItems),
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
				return (
					<Elements stripe={this.stripePromise}>
						<CreditCardForm />
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

//export default connect(mapStateToProps, {})(PaymentInformationForm);

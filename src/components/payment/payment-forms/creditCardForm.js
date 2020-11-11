//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
//ui components
import { Form, Image } from "semantic-ui-react";
//app components
import CheckoutNavigation from "../../checkout-components/checkoutNavigation";
//css
import "../payment-css/creditCardForm.css";

class CreditCardForm extends React.Component {
	constructor(props) {
		super(props);
		this.cardStyle = {
			style: {
				base: {
					color: "#32325d",
					fontFamily: "Arial, sans-serif",
					fontSmoothing: "antialiased",
					fontSize: "16px",
					"::placeholder": {
						color: "#32325d",
					},
				},
				invalid: {
					color: "#fa755a",
					iconColor: "#fa755a",
				},
			},
		};
	}
	state = { disableSubmitButton: true };

	componentDidMount() {
		//create a payment intent
	}
	submitOrderClicked = (e) => {
		e.preventDefault();
		console.log("CC order submitted");
	};
	render() {
		return (
			<>
				<Form>
					<CardElement
						id="card-element"
						options={this.cardStyle}
						className="creditCardContainer"
					/>
					<Image src="/assets/poweredByStripe.png" size="small" />
					<CheckoutNavigation
						backNav="/checkout/details"
						backText="Contact"
						forwardText="Submit Order"
						forwardButtonClicked={(e) => this.submitOrderClicked(e)}
						disableForwardButton={this.state.disableSubmitButton}
					/>
				</Form>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderTotals: state.order.totals,
		menuConfig: state.menu.menuConfig,
		paymentInformation: getFormValues("paymentInformationForm")(state),
	};
};

export default connect(
	mapStateToProps,
	{}
)(
	reduxForm({
		form: "paymentInformationForm",
		destroyOnUnmount: false,
	})(CreditCardForm)
);

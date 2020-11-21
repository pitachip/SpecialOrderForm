//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, getFormValues } from "redux-form";
import { CardElement } from "@stripe/react-stripe-js";
//ui components
import { Form, Image } from "semantic-ui-react";
//app components
import CheckoutNavigation from "../../checkout-components/checkoutNavigation";
import SubmissionError from "../payment-components/submissionError";
import { paymentCheckboxField, paymentInputField } from "./paymentFormFields";
//utils
import { formatOrderForDb } from "../../../utils/orderCheckoutUtils";
import { history } from "../../../utils/history";
//actions
import {
	updateOrderTotals,
	createPaymentIntent,
	completePayment,
	getPaymentIntent,
	createSpecialOrder,
} from "../../../actions";
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
	state = {
		disableSubmitButton: true,
		submitting: false,
		paymentIntentSecret: null,
		submissionError: { header: "", message: "", hidden: true },
	};

	async componentDidMount() {
		//create a payment intent on load
		const { createPaymentIntent, orderTotals } = this.props;
		try {
			const paymentIntentSecret = await createPaymentIntent(
				orderTotals.total * 100
			);
			this.setState({ paymentIntentSecret });
		} catch (error) {
			console.log(error);
		}
	}

	taxExemptToggled = (toggle, totals) => {
		if (toggle) {
			let removeTaxFromTotal = totals;
			//Weird that I had to format the object like this before sending or comp wouldnt update
			removeTaxFromTotal = {
				subTotal: totals.subTotal,
				tax: 0,
				delivery: totals.delivery,
				total: totals.total - totals.tax,
			};

			this.props.updateOrderTotals(removeTaxFromTotal);
		} else {
			let addTaxToTotal = totals;
			addTaxToTotal = {
				subTotal: totals.subTotal,
				tax: totals.subTotal * this.props.menuConfig.settings.taxRate,
				delivery: totals.delivery,
				total:
					totals.subTotal +
					totals.subTotal * this.props.menuConfig.settings.taxRate +
					totals.delivery,
			};

			this.props.updateOrderTotals(addTaxToTotal);
		}
	};

	handleChange = async (e) => {
		this.setState({ disableSubmitButton: e.empty });
		console.log(e.error);
		if (e.error) {
			this.setState({
				submissionError: {
					header: "Error!",
					message: e.error.message,
					hidden: false,
				},
			});
		} else {
			this.setState({
				submissionError: {
					header: "",
					message: "",
					hidden: true,
				},
			});
		}
	};
	submitOrderClicked = async (e) => {
		const {
			//data
			stripe,
			elements,
			order,
			contactInformation,
			paymentInformation,
			//actions
			completePayment,
			getPaymentIntent,
			createSpecialOrder,
		} = this.props;
		e.preventDefault();
		this.setState({ submitting: true });

		try {
			const payment = await completePayment(
				this.state.paymentIntentSecret,
				stripe,
				elements,
				CardElement
			);

			if (!payment.error) {
				const paymentIntent = await getPaymentIntent(payment.paymentIntent.id);

				const formattedOrder = formatOrderForDb(
					order,
					contactInformation,
					paymentInformation,
					null,
					paymentIntent.data
				);

				const newSpecialOrder = await createSpecialOrder(formattedOrder);

				history.push("/checkout/confirmation", {
					orderConfirmation: newSpecialOrder,
				});
			} else {
				this.setState({
					submissionError: {
						header: "Error!",
						message: payment.error.message,
						hidden: false,
					},
					submitting: false,
				});
			}
		} catch (error) {
			console.log("Error caught in Order Submission: ", error);
			this.setState({ submitting: false });
		}
	};
	render() {
		const { submissionError } = this.state;
		const { taxExempt } = this.props.paymentInformation;
		const totals = this.props.orderTotals;
		return (
			<>
				<Form>
					<CardElement
						id="card-element"
						options={this.cardStyle}
						className="creditCardContainer"
						onChange={(e) => this.handleChange(e)}
					/>
					<Field
						name="taxExempt"
						component={paymentCheckboxField}
						type="checkbox"
						label="This order is for a tax-exempt organization"
						onChange={(e, checked) => this.taxExemptToggled(checked, totals)}
					/>
					{taxExempt ? (
						<Field
							name="taxExemptNumber"
							component={paymentInputField}
							label="Tax Exempt EIN"
							placeholder="Tax Exempt ID# 141232"
						/>
					) : null}
					<Image src="/assets/poweredByStripe.png" size="small" />
					<SubmissionError
						errorHeader={submissionError.header}
						errorMessage={submissionError.message}
						hidden={submissionError.hidden}
					/>
					<CheckoutNavigation
						backNav="/checkout/details"
						backText="Contact"
						forwardText="Submit Order"
						forwardButtonClicked={(e) => this.submitOrderClicked(e)}
						disableForwardButton={this.state.disableSubmitButton}
						submitting={this.state.submitting}
						disableBackButton={this.state.submitting}
					/>
				</Form>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		order: state.order,
		orderTotals: state.order.totals,
		menuConfig: state.menu.menuConfig,
		paymentInformation: getFormValues("paymentInformationForm")(state),
		contactInformation: getFormValues("checkoutContactForm")(state),
	};
};

export default connect(mapStateToProps, {
	updateOrderTotals,
	createPaymentIntent,
	completePayment,
	getPaymentIntent,
	createSpecialOrder,
})(
	reduxForm({
		form: "paymentInformationForm",
		destroyOnUnmount: false,
	})(CreditCardForm)
);

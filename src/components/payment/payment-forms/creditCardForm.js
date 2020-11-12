//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";
import { CardElement } from "@stripe/react-stripe-js";
import pitachip from "../../../apis/pitachip";
import { getUserToken } from "../../../utils/authUtils";
//ui components
import { Form, Image } from "semantic-ui-react";
//app components
import CheckoutNavigation from "../../checkout-components/checkoutNavigation";
import SubmissionError from "../payment-components/submissionError";
//utils
import { formatOrderForDb } from "../../../utils/orderCheckoutUtils";
import { history } from "../../../utils/history";
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
		paymentIntentSecret: null,
		submissionError: { header: "", message: "", hidden: true },
	};

	async componentDidMount() {
		//create a payment intent
		try {
			const paymentIntent = await pitachip.post("/payment/intent", {
				amount: this.props.orderTotals.total * 100,
			});
			this.setState({ paymentIntentSecret: paymentIntent.data });
		} catch (error) {
			console.log(error);
		}
	}

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
			stripe,
			elements,
			order,
			contactInformation,
			paymentInformation,
		} = this.props;
		e.preventDefault();

		try {
			const completePayment = await stripe.confirmCardPayment(
				this.state.paymentIntentSecret,
				{
					payment_method: {
						card: elements.getElement(CardElement),
					},
				}
			);

			if (!completePayment.error) {
				const userToken = await getUserToken();
				const createSpecialOrder = await pitachip.post(
					"/specialorder",
					{
						order: formatOrderForDb(
							order,
							contactInformation,
							paymentInformation,
							completePayment.paymentIntent.id
						),
					},
					{
						headers: { Authorization: `Bearer ${userToken.token}` },
					}
				);
				history.push("/checkout/confirmation");
			} else {
				this.setState({
					submissionError: {
						header: "Error!",
						message: completePayment.error.message,
						hidden: false,
					},
				});
			}
			//dont forget that you have to clear the redux persist
		} catch (error) {
			console.log("Error caught in Order Submission: ", error);
		}
	};
	render() {
		const { submissionError } = this.state;
		return (
			<>
				<Form>
					<CardElement
						id="card-element"
						options={this.cardStyle}
						className="creditCardContainer"
						onChange={(e) => this.handleChange(e)}
					/>
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

export default connect(
	mapStateToProps,
	{}
)(
	reduxForm({
		form: "paymentInformationForm",
		destroyOnUnmount: false,
	})(CreditCardForm)
);

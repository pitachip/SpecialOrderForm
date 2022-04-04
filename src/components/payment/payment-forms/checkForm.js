//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, getFormValues } from "redux-form";
//ui components
import { Form } from "semantic-ui-react";
//app components
import CheckDisclaimer from "../payment-components/checkDisclaimer";
import { paymentCheckboxField, paymentInputField } from "./paymentFormFields";
import CheckoutNavigation from "../../checkout-components/checkoutNavigation";
import SubmissionError from "../payment-components/submissionError";
//actions
import {
	updateOrderTotals,
	createNewInvoice,
	updateInvoice,
	createSpecialOrder,
	refundCreditCard,
	voidInvoice,
	updateSpecialOrder,
} from "../../../actions";
//utils
import { formatOrderForDb } from "../../../utils/orderCheckoutUtils";
import { history } from "../../../utils/history";

class CheckForm extends React.Component {
	state = {
		disableSubmitButton: true,
		submitting: false,
		submissionError: { header: "", message: "", hidden: true },
	};

	modifyPurchase = async (previousOrder) => {
		let refundedPayment;
		switch (previousOrder.paymentInformation.paymentType) {
			case "cc":
				refundedPayment = await this.props.refundCreditCard(
					previousOrder.paymentInformation.creditCardPaymentDetails.id,
					previousOrder.paymentInformation.creditCardPaymentDetails.amount
				);
				break;
			case "check":
				refundedPayment = await this.props.voidInvoice(
					previousOrder.paymentInformation.invoicePaymentDetails.id
				);
				break;
			case "univ":
				refundedPayment = await this.props.voidInvoice(
					previousOrder.paymentInformation.invoicePaymentDetails.id
				);
				break;
			default:
				break;
		}
		return refundedPayment;
		/**
		 * TODO
		 * need to handle if people pay for invoice via credit card for some reason (probably webhooks for notification)
		 */
	};

	submitOrderClicked = async (e) => {
		e.preventDefault();
		this.setState({ submitting: true });

		const {
			//data
			contactInformation,
			paymentInformation,
			orderItems,
			orderTotals,
			order,
			navigation,
			orderToModify,
			//methods
			createSpecialOrder,
			createNewInvoice,
			updateInvoice,
			updateSpecialOrder,
		} = this.props;

		//Adding tax delivery and tip as line items to the invoice
		const deliveryTaxTip = [
			{
				basePrice: +(orderTotals.delivery * 100).toFixed(2),
				quantity: 1,
				name: "Delivery",
			},
			{
				basePrice: +(orderTotals.tax * 100).toFixed(2),
				quantity: 1,
				name: "Tax",
			},
			{
				basePrice: +(orderTotals.tip * 100).toFixed(2),
				quantity: 1,
				name: "Tip",
			},
		];

		try {
			if (this.props.navigation.rootUrl === "/") {
				const newInvoice = await createNewInvoice(
					contactInformation,
					orderItems,
					deliveryTaxTip
				);

				//format order for db
				const formattedOrder = formatOrderForDb(
					order,
					contactInformation,
					paymentInformation,
					newInvoice.data,
					"",
					"Pending"
				);

				//save order to the db
				const newSpecialOrder = await createSpecialOrder(formattedOrder);

				history.push(`${navigation.rootUrl}checkout/confirmation`, {
					orderConfirmation: newSpecialOrder,
				});
			} else {
				//void invoice or refund payment
				await this.modifyPurchase(this.props.orderToModify);

				//Root URL is the modify one so we'll update the exisitng order and invoice
				const updatedInvoice = await updateInvoice(
					contactInformation,
					orderItems,
					deliveryTaxTip,
					orderToModify.userId
				);

				//format the order for the db
				const formattedOrder = formatOrderForDb(
					order,
					contactInformation,
					paymentInformation,
					updatedInvoice.data,
					"",
					"Pending"
				);

				//modify order in the db
				const modifiedSpecialOrder = await updateSpecialOrder(
					formattedOrder,
					orderToModify._id,
					true
				);

				history.push(`${navigation.rootUrl}checkout/confirmation`, {
					orderConfirmation: modifiedSpecialOrder,
				});
			}
		} catch (error) {
			console.log("Error caught in Order Submission: ", error);
			this.setState({
				submissionError: {
					header: "Error!",
					message: error,
					hidden: false,
				},
				submitting: false,
			});
		}
	};
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
	render() {
		const { submissionError } = this.state;
		const { purchaseOrder, taxExempt } = this.props.paymentInformation;
		const totals = this.props.orderTotals;
		return (
			<>
				<CheckDisclaimer />
				<Form>
					<Field
						name="purchaseOrder"
						component={paymentCheckboxField}
						type="checkbox"
						label="I am paying with a purchase order"
					/>
					{purchaseOrder ? (
						<Field
							name="purchaseOrderNumber"
							component={paymentInputField}
							label="Purchase Order Number"
							placeholder="PO#15677332"
							showToolTip={true}
							tooltipText="If you do not have it you can leave this blank for now."
						/>
					) : null}
					<Field
						name="taxExempt"
						component={paymentCheckboxField}
						type="checkbox"
						label="This order is for a tax-exempt organization"
						onChange={(e, checked) => this.taxExemptToggled(checked, totals)}
					/>
					{taxExempt ? (
						<Field
							name="taxExemptId"
							component={paymentInputField}
							label="Tax Exempt ID"
							placeholder="Tax Exempt ID# 141232"
							showToolTip={true}
							tooltipText="If you do not have it you can enter your institution name and we will take care of the rest."
						/>
					) : null}
					<SubmissionError
						errorHeader={submissionError.header}
						errorMessage={submissionError.message}
						hidden={submissionError.hidden}
					/>
					<CheckoutNavigation
						backNav="/checkout/details"
						backText="Back to Contact"
						forwardText="Submit Order"
						forwardButtonClicked={(e) => this.submitOrderClicked(e)}
						disableForwardButton={
							this.props.paymentInformation.paymentType === "" ? true : false
						}
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
		orderItems: state.order.orderItems,
		menuConfig: state.menu.menuConfig,
		navigation: state.navigation,
		paymentInformation: getFormValues("paymentInformationForm")(state),
		contactInformation: getFormValues("checkoutContactForm")(state),
		orderToModify: state.orderHistory.orderToModify,
	};
};

export default connect(mapStateToProps, {
	updateOrderTotals,
	createNewInvoice,
	updateInvoice,
	createSpecialOrder,
	refundCreditCard,
	voidInvoice,
	updateSpecialOrder,
})(
	reduxForm({
		form: "paymentInformationForm",
		destroyOnUnmount: false,
	})(CheckForm)
);

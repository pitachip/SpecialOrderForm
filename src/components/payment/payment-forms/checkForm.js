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
	createSpecialOrder,
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
			//methods
			createSpecialOrder,
			createNewInvoice,
		} = this.props;

		try {
			//Adding tax and delivery as line items to the invoice
			const deliveryAndTax = [
				{
					basePrice: orderTotals.delivery * 100,
					quantity: 1,
					name: "Delivery",
				},
				{
					basePrice: orderTotals.tax * 100,
					quantity: 1,
					name: "Tax",
				},
			];
			//create the invoice
			const newInvoice = await createNewInvoice(
				contactInformation,
				orderItems,
				deliveryAndTax,
				paymentInformation
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

			history.push("/checkout/confirmation", {
				orderConfirmation: newSpecialOrder,
			});
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
							label="Tax Exempt EIN"
							placeholder="Tax Exempt ID# 141232"
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
		paymentInformation: getFormValues("paymentInformationForm")(state),
		contactInformation: getFormValues("checkoutContactForm")(state),
	};
};

export default connect(mapStateToProps, {
	updateOrderTotals,
	createNewInvoice,
	createSpecialOrder,
})(
	reduxForm({
		form: "paymentInformationForm",
		destroyOnUnmount: false,
	})(CheckForm)
);

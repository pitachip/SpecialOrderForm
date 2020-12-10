//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, getFormValues } from "redux-form";
import remove from "lodash/remove";
//ui components
import { Form } from "semantic-ui-react";
//app components
import UnivDisclaimer from "../payment-components/univDisclaimer";
import {
	paymentCheckboxField,
	paymentInputField,
	required,
} from "./paymentFormFields";
import CheckoutNavigation from "../../checkout-components/checkoutNavigation";
//actions
import {
	updateOrderTotals,
	createNewInvoice,
	createSpecialOrder,
} from "../../../actions";
//utils
import { formatOrderForDb } from "../../../utils/orderCheckoutUtils";
import { history } from "../../../utils/history";

class UnivForm extends React.Component {
	state = {
		disableSubmitButton: true,
		submitting: false,
		submissionError: { header: "", message: "", hidden: true },
	};

	submitOrderClicked = async () => {
		if (this.props.valid) {
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
				orderItems.push(
					{
						basePrice: orderTotals.delivery * 100,
						quantity: 1,
						menuItem: "Delivery",
					},
					{
						basePrice: orderTotals.tax * 100,
						quantity: 1,
						menuItem: "Tax",
					}
				);
				//create the invoice
				const newInvoice = await createNewInvoice(
					contactInformation,
					orderItems,
					paymentInformation
				);
				//format order for db
				const formattedOrder = formatOrderForDb(
					order,
					contactInformation,
					paymentInformation,
					newInvoice.data,
					""
				);
				//save order to the db
				const newSpecialOrder = await createSpecialOrder(formattedOrder);

				//remove delivery and tax from the object so that it renders properly on the confirmation page
				const removeDeliveryAndTax = remove(
					newSpecialOrder.data.orderItems,
					(orderItem) => {
						return (
							orderItem.menuItem !== "Delivery" && orderItem.menuItem !== "Tax"
						);
					}
				);
				newSpecialOrder.data.orderItems = removeDeliveryAndTax;

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
		}
	};

	taxExemptToggled = (toggle, totals) => {
		if (toggle) {
			let removeTaxFromTotal = totals;
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
		const { handleSubmit } = this.props;
		const { taxExempt } = this.props.paymentInformation;
		const totals = this.props.orderTotals;
		return (
			<>
				<UnivDisclaimer />
				<Form onSubmit={handleSubmit(this.submitOrderClicked)}>
					<Field
						name="universityMoneyAccount"
						component={paymentInputField}
						label="University Money Account #"
						placeholder="156773322312"
						validate={required}
						errorMessagePrefix="Account number "
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
					<CheckoutNavigation
						backNav="/checkout/details"
						backText="Contact"
						forwardText="Submit Order"
						forwardButtonClicked={() => null}
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
	})(UnivForm)
);

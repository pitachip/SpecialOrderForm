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
//actions
import { updateOrderTotals } from "../../../actions";

class CheckForm extends React.Component {
	submitOrderClicked = (e) => {
		e.preventDefault();
		console.log("Check order submitted");
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
							name="poNumber"
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
						forwardButtonClicked={(e) => this.submitOrderClicked(e)}
						disableForwardButton={
							this.props.paymentInformation.paymentType === "" ? true : false
						}
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

export default connect(mapStateToProps, { updateOrderTotals })(
	reduxForm({
		form: "paymentInformationForm",
		destroyOnUnmount: false,
	})(CheckForm)
);

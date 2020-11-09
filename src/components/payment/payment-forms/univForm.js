//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, getFormValues } from "redux-form";
//ui components
import { Form } from "semantic-ui-react";
//app components
import UnivDisclaimer from "../payment-components/univDisclaimer";
import { paymentCheckboxField, paymentInputField } from "./paymentFormFields";
//actions
import { updateOrderTotals } from "../../../actions";

class UnivForm extends React.Component {
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
		const { taxExempt } = this.props.paymentInformation;
		const totals = this.props.orderTotals;
		return (
			<>
				<UnivDisclaimer />
				<Form>
					<Field
						name="univAccountNumber"
						component={paymentInputField}
						label="University Money Account #"
						placeholder="156773322312"
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
	})(UnivForm)
);

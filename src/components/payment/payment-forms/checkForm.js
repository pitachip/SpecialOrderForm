//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, getFormValues } from "redux-form";
//ui components
import { Form } from "semantic-ui-react";
//app components
import CheckDisclaimer from "../payment-components/checkDisclaimer";
import { paymentCheckboxField, paymentInputField } from "./paymentFormFields";

class CheckForm extends React.Component {
	render() {
		const { purchaseOrder, taxExempt } = this.props.paymentInformation;
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
	})(CheckForm)
);

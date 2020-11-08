//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";
//app components
import PaymentOptions from "../payment-components/paymentOptions";
import CheckoutNavigation from "../../checkout-components/checkoutNavigation";
import CheckForm from "./checkForm";

class PaymentInformationForm extends React.Component {
	renderPaymentForm = (paymentType) => {
		switch (paymentType) {
			case "cc":
				return <p>Credit Card Form</p>;
			case "check":
				return <CheckForm />;
			case "univ":
				return <p>Univ Form</p>;
			default:
				return <p>Please choose a payment option</p>;
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
				<CheckoutNavigation
					backNav="/checkout/details"
					backText="Contact"
					forwardText="Confirmation"
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		initialValues: { paymentType: "", taxExempt: false },
		paymentInformation: getFormValues("paymentInformationForm")(state),
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

//libs
import React from "react";
import { connect } from "react-redux";
import { persistor } from "../../../store";
import { reset, getFormValues } from "redux-form";

class OrderConfirmationForm extends React.Component {
	state = { order: null };
	componentDidMount = async () => {
		const { order, customerInformation, paymentInformation } = this.props;

		/**
		 * Save these values so that we can display them in the
		 * confirmation page
		 */
		this.setState({
			order: order,
			customerInformation: customerInformation,
			paymentInformation: paymentInformation,
		});

		/**
		 * Clear out the redux persist values and the redux form values
		 */
		await persistor.purge();
		this.props.reset("checkoutContactForm");
		this.props.reset("paymentInformationForm");
	};
	render() {
		return (
			<div>
				<div>Order confirmation form</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		order: state.order,
		customerInformation: getFormValues("checkoutContactForm")(state),
		paymentInformation: getFormValues("paymentInformationForm")(state),
	};
};

export default connect(mapStateToProps, { reset })(OrderConfirmationForm);

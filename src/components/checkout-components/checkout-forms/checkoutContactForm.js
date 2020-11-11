//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";
//ui components
import Form from "react-bootstrap/Form";
//utils
import { history } from "../../../utils/history";
//actions
import { updateDeliveryDetails } from "../../../actions";
//app components
import CheckoutNavigation from "../checkoutNavigation";
import DeliveryInformationForm from "./deliveryInformationForm";
import CustomerInformationForm from "./customerInformationForm";
import DeliveryContactInformationForm from "./deliveryContactInformationForm";

class CheckoutContactForm extends React.Component {
	handleForwardClick = () => {
		if (this.props.valid) {
			history.push("/checkout/payment");
		}
	};
	render() {
		//TODO: might want to remove the weird form wrap here. Find another way to check if form is valid
		const { handleSubmit } = this.props;
		return (
			<div>
				<Form onSubmit={handleSubmit(this.handleForwardClick)}>
					<h2>Your Information</h2>
					<CustomerInformationForm />
					<h2>Delivery Information</h2>
					<DeliveryInformationForm />
					<h2>Delivery Contact Information</h2>
					<DeliveryContactInformationForm />
					<CheckoutNavigation
						backNav="/order"
						backText="Order"
						forwardText="Payment"
						forwardButtonClicked={() => null}
					/>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		deliveryInformation: state.order.orderDetails.deliveryInformation,
		contactInformation: getFormValues("checkoutContactForm")(state),
	};
};

export default connect(mapStateToProps, { updateDeliveryDetails })(
	reduxForm({
		form: "checkoutContactForm",
		destroyOnUnmount: false,
		enableReinitialize: true,
	})(CheckoutContactForm)
);

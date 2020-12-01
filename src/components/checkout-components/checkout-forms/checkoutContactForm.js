//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";
//ui components
import Form from "react-bootstrap/Form";
//app components
import CheckoutNavigation from "../checkoutNavigation";
import DeliveryInformationForm from "./deliveryInformationForm";
import CustomerInformationForm from "./customerInformationForm";
import DeliveryContactInformationForm from "./deliveryContactInformationForm";
import PickupInformation from "../../contact/contact-components/pickupInformation";
//utils
import { history } from "../../../utils/history";
//actions
import { updateDeliveryDetails } from "../../../actions";

class CheckoutContactForm extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handleForwardClick = () => {
		if (this.props.valid) {
			history.push("/checkout/payment");
		}
	};
	renderDeliveryComponents = () => {
		return (
			<>
				<h2>Delivery Information</h2>
				<DeliveryInformationForm />
				<h2>Delivery Contact Information</h2>
				<DeliveryContactInformationForm />
			</>
		);
	};
	renderPickupComponents = (locations, location) => {
		return (
			<PickupInformation
				locationInformation={locations}
				selectedStore={location}
			/>
		);
	};
	render() {
		//TODO: might want to remove the weird form wrap here. Find another way to check if form is valid
		const { handleSubmit, orderDetails, locationInformation } = this.props;
		console.log(this.props);
		return (
			<div>
				<Form onSubmit={handleSubmit(this.handleForwardClick)}>
					<h2>Your Information</h2>
					<CustomerInformationForm />
					{orderDetails.shippingMethod === "delivery"
						? this.renderDeliveryComponents()
						: this.renderPickupComponents(
								locationInformation.storeInformation.locations,
								orderDetails.location
						  )}
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
		initialValues: {
			firstName: state.auth.metaData ? state.auth.metaData.firstName : "",
			lastName: state.auth.metaData ? state.auth.metaData.lastName : "",
			email: state.auth.metaData ? state.auth.metaData.email : "",
		},
		orderDetails: state.order.orderDetails,
		locationInformation: state.storeInformation,
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

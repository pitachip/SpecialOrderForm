//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, change, getFormValues } from "redux-form";
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
			console.log(this.props.navigation);
			history.push(`${this.props.navigation.rootUrl}checkout/payment`);
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
	renderPickupComponents = (orderDetails) => {
		return <PickupInformation orderDetails={orderDetails} />;
	};
	render() {
		//TODO: might want to remove the weird form wrap here. Find another way to check if form is valid
		const { handleSubmit, orderDetails } = this.props;
		return (
			<div>
				<div>
					<p>
						<span style={{ color: "red" }}>*</span> = Required
					</p>
				</div>
				<Form onSubmit={handleSubmit(this.handleForwardClick)}>
					<h2>Your Information</h2>
					<CustomerInformationForm />
					{orderDetails.shippingMethod === "delivery"
						? this.renderDeliveryComponents()
						: this.renderPickupComponents(orderDetails)}
					<CheckoutNavigation
						backNav="/order"
						backText="Back to Order"
						forwardText="Proceed to Payment"
						forwardButtonClicked={() => null}
					/>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderDetails: state.order.orderDetails,
		locationInformation: state.storeInformation,
		deliveryInformation: state.order.orderDetails.deliveryInformation,
		navigation: state.navigation,
		userMetaData: state.auth.metaData,
		formValues: getFormValues("checkoutContactForm")(state),
	};
};

export default connect(mapStateToProps, { updateDeliveryDetails, change })(
	reduxForm({
		form: "checkoutContactForm",
		destroyOnUnmount: false,
		enableReinitialize: false,
		keepDirtyOnReinitialize: true,
	})(CheckoutContactForm)
);

//libs
import React from "react";
import { connect } from "react-redux";
import { persistor } from "../../../store";
import { reset } from "redux-form";
//ui components
import { Card, Divider } from "semantic-ui-react";
//app components
import ConfirmationHeader from "./confirmationHeader";
import ConfirmationDeliveryDetails from "./confirmationDeliveryDetails";
import ConfirmationOrderDetails from "./confirmationOrderDetails";
import ConfirmationOrderTotals from "./confirmationOrderTotals";
import ConfirmationPaymentDetails from "./confirmationPaymentDetails";
import ConfirmationPickupDetails from "./confirmationPickupDetails";
import ConfirmationHeaderModified from "./confirmationHeaderModified";
//css
import "../confirmation-css/orderConfirmation.css";

class OrderConfirmation extends React.Component {
	state = { rootUrl: "" };
	componentDidMount = async () => {
		window.scrollTo(0, 0);
		this.setState({ rootUrl: this.props.rootUrl });
		await persistor.purge();
		this.props.reset("checkoutContactForm");
		this.props.reset("paymentInformationForm");
	};
	render() {
		const {
			orderNumber,
			customerInformation,
			deliveryInformation,
			orderDetails,
			orderItems,
			orderTotals,
			paymentInformation,
			pickupInformation,
		} = this.props.orderConfirmationDetails;
		return (
			<Card fluid color="green" centered>
				<Card.Content>
					<Card.Header>
						{this.state.rootUrl !== "/" ? (
							<ConfirmationHeaderModified
								orderNumber={orderNumber}
								customerEmail={customerInformation.email}
							/>
						) : (
							<ConfirmationHeader
								orderNumber={orderNumber}
								customerEmail={customerInformation.email}
							/>
						)}
					</Card.Header>
					<Divider />
					{orderDetails.shippingMethod === "delivery" ? (
						<ConfirmationDeliveryDetails
							deliveryInformation={deliveryInformation}
							orderDate={orderDetails.orderDate}
						/>
					) : (
						<ConfirmationPickupDetails
							pickupInformation={pickupInformation}
							orderDetails={orderDetails}
						/>
					)}
					<Divider />
					<ConfirmationOrderDetails
						orderItems={orderItems}
						specialInstructions={orderDetails.specialInstructions}
					/>
					<ConfirmationOrderTotals orderTotals={orderTotals} />
					<Divider />
					<ConfirmationPaymentDetails paymentInformation={paymentInformation} />
				</Card.Content>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		rootUrl: state.navigation.rootUrl,
	};
};

export default connect(mapStateToProps, { reset })(OrderConfirmation);

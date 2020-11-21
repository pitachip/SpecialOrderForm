//libs
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { persistor } from "../../../store";
import { reset, getFormValues } from "redux-form";
//ui components
import { Card, Divider } from "semantic-ui-react";
//app components
import ConfirmationHeader from "./confirmationHeader";
import ConfirmationDeliveryDetails from "./confirmationDeliveryDetails";
import ConfirmationOrderDetails from "./confirmationOrderDetails";
import ConfirmationOrderTotals from "./confirmationOrderTotals";
import ConfirmationPaymentDetails from "./confirmationPaymentDetails";
//css
import "../confirmation-css/orderConfirmation.css";

class OrderConfirmation extends React.Component {
	componentDidMount = async () => {
		/**
		 * Clear out the redux persist values and the redux form values
		 */
		await persistor.purge();
		this.props.reset("checkoutContactForm");
		this.props.reset("paymentInformationForm");
	};
	render() {
		//set all data passed from the payment components through the router
		const {
			orderNumber,
			customerInformation,
			deliveryInformation,
			orderDetails,
			orderItems,
			orderTotals,
			paymentInformation,
		} = this.props.location.state.orderConfirmation.data;
		return (
			<Card fluid color="green" centered className="confirmationCard">
				<Card.Content>
					<Card.Header>
						<ConfirmationHeader
							orderNumber={orderNumber}
							customerEmail={customerInformation.email}
						/>
					</Card.Header>
					<Divider />
					<ConfirmationDeliveryDetails
						deliveryInformation={deliveryInformation}
						orderDate={orderDetails.orderDate}
					/>
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
		order: state.order,
		customerInformation: getFormValues("checkoutContactForm")(state),
		paymentInformation: getFormValues("paymentInformationForm")(state),
	};
};

export default withRouter(
	connect(mapStateToProps, { reset })(OrderConfirmation)
);

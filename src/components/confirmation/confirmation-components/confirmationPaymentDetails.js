//libs
import React from "react";
import NumberFormat from "react-number-format";
//ui components
import { Grid, Header, Icon } from "semantic-ui-react";
//css
import "../confirmation-css/orderConfirmation.css";

class ConfirmationPaymentDetails extends React.Component {
	/**
	 * Create a switch statement to render the type of payment that was processed
	 */
	renderCreditCardInformation = (creditCardInformation) => {
		const {
			payment_method_details,
			amount,
			receipt_url,
		} = creditCardInformation;
		return (
			<>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={1}>
					<Grid.Column width={8} textAlign="left">
						<Header as="h5">Credit Card</Header>
						<div className="deliveryDetails">
							<p>
								Credit Card: {payment_method_details.card.brand} ending in{" "}
								{payment_method_details.card.last4}
							</p>
							<p>
								Expiry Date: {payment_method_details.card.exp_month}/
								{payment_method_details.card.exp_year}
							</p>
							<p>
								Amount Charged:{" "}
								<NumberFormat
									value={amount / 100}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
									decimalScale={2}
									fixedDecimalScale="true"
								/>
							</p>
							<a href={receipt_url} target="_blank">
								<Icon name="file alternate outline" size="large" link />
								Digital Receipt
							</a>
						</div>
					</Grid.Column>
				</Grid.Row>
			</>
		);
	};
	render() {
		const { paymentInformation } = this.props;
		return (
			<Grid container>
				<Grid.Row className="confirmationDeliveryDetailsRow">
					<Header as="h3">Payment Details</Header>
				</Grid.Row>
				{this.renderCreditCardInformation(
					paymentInformation.creditCardPaymentDetails.charges.data[0]
				)}
			</Grid>
		);
	}
}

export default ConfirmationPaymentDetails;

/**
 * 									<NumberFormat
										value={this.props.totals.subTotal}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"$"}
										decimalScale={2}
										fixedDecimalScale="true"
									/>
 */

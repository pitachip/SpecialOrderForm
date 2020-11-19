//libs
import React from "react";
//ui components
import { Grid, Header, Icon } from "semantic-ui-react";
//css
import "../confirmation-css/orderConfirmation.css";

class ConfirmationPaymentDetails extends React.Component {
	renderCreditCardInformation = () => {
		return (
			<>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={1}>
					<Grid.Column width={8} textAlign="left">
						<Header as="h5">Credit Card</Header>
						<div className="deliveryDetails">
							<p>Credit Card: Visa ending in 4242</p>
							<p>Expiry Date: 03/22</p>
							<p>Amount Charged: $164.30</p>
							<a href="https://google.com" target="_blank">
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
		const { paymentDetails } = this.props;
		return (
			<Grid container>
				<Grid.Row className="confirmationDeliveryDetailsRow">
					<Header as="h3">Payment Details</Header>
				</Grid.Row>
				{this.renderCreditCardInformation()}
			</Grid>
		);
	}
}

export default ConfirmationPaymentDetails;

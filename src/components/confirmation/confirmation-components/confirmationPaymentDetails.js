//libs
import React from "react";
import NumberFormat from "react-number-format";
//ui components
import { Grid, Header, Icon } from "semantic-ui-react";
//css
import "../confirmation-css/orderConfirmation.css";

class ConfirmationPaymentDetails extends React.Component {
	renderInvoiceInformation = (invoiceInformation) => {
		const {
			amount_due,
			due_date,
			invoice_pdf,
			hosted_invoice_url,
		} = invoiceInformation;
		return (
			<>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={1}>
					<Grid.Column textAlign="left">
						<Header as="h5">Invoice</Header>
						<div className="deliveryDetails">
							<p>
								Amount Due:{" "}
								<NumberFormat
									value={amount_due / 100}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
									decimalScale={2}
									fixedDecimalScale="true"
								/>
							</p>
							<p>Due On: {new Date(due_date * 1000).toDateString()}</p>
							<p>
								<a href={invoice_pdf} target="_blank" rel="noopener noreferrer">
									<Icon name="file pdf outline" size="large" link />
									Invoice PDF
								</a>
							</p>
							<p>
								<a
									href={hosted_invoice_url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Icon name="payment" size="large" link />
									Pay For Invoice
								</a>
							</p>
						</div>
					</Grid.Column>
				</Grid.Row>
			</>
		);
	};
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
							<a href={receipt_url} target="_blank" rel="noopener noreferrer">
								<Icon name="file alternate outline" size="large" link />
								Digital Receipt
							</a>
						</div>
					</Grid.Column>
				</Grid.Row>
			</>
		);
	};
	renderPaymentMethod = (paymentInformation) => {
		switch (paymentInformation.paymentType) {
			case "cc":
				return this.renderCreditCardInformation(
					paymentInformation.creditCardPaymentDetails.charges.data[0]
				);
			case "check":
				return this.renderInvoiceInformation(
					paymentInformation.invoicePaymentDetails
				);
			case "univ":
				return this.renderInvoiceInformation(
					paymentInformation.invoicePaymentDetails
				);
			default:
				return null;
		}
	};
	render() {
		const { paymentInformation } = this.props;
		return (
			<Grid container>
				<Grid.Row className="confirmationDeliveryDetailsRow">
					<Header as="h3">Payment Details</Header>
				</Grid.Row>
				{this.renderPaymentMethod(paymentInformation)}
			</Grid>
		);
	}
}

export default ConfirmationPaymentDetails;

//libs
import React from "react";
//ui components
import { Button, Icon } from "semantic-ui-react";
//css
import "../orderHistory-css/orderActions.css";

class ViewReceiptButton extends React.Component {
	viewReceiptClicked = (orderDetails) => {
		if (orderDetails.paymentInformation.paymentType === "cc") {
			const receiptUrl =
				orderDetails.paymentInformation.creditCardPaymentDetails.charges.data[0]
					.receipt_url;
			return window.open(receiptUrl);
		} else {
			const invoiceUrl =
				orderDetails.paymentInformation.invoicePaymentDetails
					.hosted_invoice_url;
			return window.open(invoiceUrl);
		}
	};

	renderButtonText = (orderDetails) => {
		if (orderDetails.paymentInformation.paymentType === "cc") {
			return "View Receipt";
		} else {
			return "View Invoice";
		}
	};

	render() {
		const { orderDetails } = this.props;
		return (
			<>
				<Button
					className="actionButtonsMargin"
					onClick={() => this.viewReceiptClicked(orderDetails)}
				>
					<Icon name="file alternate outline" link />
					{this.renderButtonText(orderDetails)}
				</Button>
			</>
		);
	}
}

export default ViewReceiptButton;

//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//actions
import {
	refundCreditCard,
	voidInvoice,
	cancelOrder,
	getMyOrders,
} from "../../../actions";
//css
import "../orderHistory-css/orderActions.css";

class CancelOrderModal extends React.Component {
	state = { cancelingOrder: false };
	cancelOrder = async (paymentInformation, orderId) => {
		const {
			refundCreditCard,
			voidInvoice,
			cancelOrder,
			getMyOrders,
			close,
		} = this.props;

		this.setState({ cancelingOrder: true });

		if (paymentInformation.paymentType === "cc") {
			await refundCreditCard(
				paymentInformation.creditCardPaymentDetails.id,
				paymentInformation.creditCardPaymentDetails.amount
			);
			await cancelOrder(orderId, "Refunded");
		} else {
			await voidInvoice(paymentInformation.invoicePaymentDetails.id);
			await cancelOrder(orderId, "Invoice Voided");
		}

		await getMyOrders();
		close();
	};
	render() {
		const {
			close,
			show,
			orderNumber,
			orderId,
			paymentInformation,
		} = this.props;
		return (
			<>
				<Modal show={show} onHide={close}>
					<Modal.Header closeButton>
						<Modal.Title>Cancel Order</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Are you sure you want to cancel order #{orderNumber}?</p>
						<br />
						<p>This action cannot be undone.</p>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							className="float-left"
							disabled={this.state.cancelingOrder}
							onClick={close}
						>
							No
						</Button>
						{!this.state.cancelingOrder ? (
							<Button
								className="float-right"
								type="danger"
								onClick={() => this.cancelOrder(paymentInformation, orderId)}
							>
								Yes
							</Button>
						) : (
							<Button disabled className="float-right">
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
								<span> Canceling Order...</span>
							</Button>
						)}
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, {
	refundCreditCard,
	voidInvoice,
	cancelOrder,
	getMyOrders,
})(CancelOrderModal);

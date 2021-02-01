//libs
import React from "react";
//ui components
import { Button, Icon } from "semantic-ui-react";
//app components
import CancelOrderModal from "../orderHistory-modals/cancelOrderModal";
//css
import "../orderHistory-css/orderActions.css";

class CancelOrderButton extends React.Component {
	state = { showModal: false };

	handleModalClose = () => {
		this.setState({ showModal: false });
	};

	handleModalOpen = () => {
		this.setState({ showModal: true });
	};

	render() {
		const { orderDetails } = this.props;
		return (
			<>
				<Button
					className="actionButtonsMargin"
					onClick={() => this.handleModalOpen()}
				>
					<Icon name="cancel" /> Cancel Order
				</Button>
				<CancelOrderModal
					show={this.state.showModal}
					close={this.handleModalClose}
					orderNumber={orderDetails.orderNumber}
					orderId={orderDetails._id}
					paymentInformation={orderDetails.paymentInformation}
				/>
			</>
		);
	}
}

export default CancelOrderButton;

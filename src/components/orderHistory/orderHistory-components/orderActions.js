//libs
import React from "react";
//ui components
import { Button } from "semantic-ui-react";
//app components
import RepeatOrderButton from "./repeatOrderButton";
import ModifyOrderButton from "./modifyOrderButton";
import CancelOrderButton from "./cancelOrderButton";
import ViewReceiptButton from "./viewReceiptButton";
import ViewOrderButton from "./viewOrderButton";
//css
import "../orderHistory-css/orderActions.css";

class OrderActions extends React.Component {
	render() {
		const { orderDetails } = this.props;
		return (
			<div>
				<Button.Group vertical compact className="block">
					<ViewOrderButton orderDetails={orderDetails} />

					{orderDetails.status !== "Cancelled" &&
					orderDetails.status !== "Completed" ? (
						<ModifyOrderButton orderDetails={orderDetails} />
					) : null}

					{orderDetails.status !== "Cancelled" &&
					orderDetails.status !== "Completed" ? (
						<CancelOrderButton orderDetails={orderDetails} />
					) : null}

					<ViewReceiptButton orderDetails={orderDetails} />
					<RepeatOrderButton orderDetails={orderDetails} />
				</Button.Group>
			</div>
		);
	}
}

export default OrderActions;

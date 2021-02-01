//libs
import React from "react";
//ui components
import { Button, Icon } from "semantic-ui-react";
//app components
import RepeatOrderButton from "./repeatOrderButton";
import ModifyOrderButton from "./modifyOrderButton";
import CancelOrderButton from "./cancelOrderButton";
//css
import "../orderHistory-css/orderActions.css";

class OrderActions extends React.Component {
	render() {
		const { orderDetails } = this.props;
		return (
			<div>
				<Button.Group vertical compact>
					<Button className="actionButtonsMargin">
						<Icon name="eye" />
						View Order
					</Button>

					{orderDetails.status !== "Cancelled" ? (
						<ModifyOrderButton orderDetails={orderDetails} />
					) : null}

					{orderDetails.status !== "Cancelled" ? (
						<CancelOrderButton orderDetails={orderDetails} />
					) : null}

					<Button className="actionButtonsMargin">
						<Icon name="file alternate outline" />
						View Invoice/Reciept
					</Button>
					<RepeatOrderButton orderDetails={orderDetails} />
				</Button.Group>
			</div>
		);
	}
}

export default OrderActions;

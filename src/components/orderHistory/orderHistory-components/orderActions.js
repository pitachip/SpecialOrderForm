//libs
import React from "react";
//ui components
import { Button, Icon } from "semantic-ui-react";
//app components
import RepeatOrderButton from "./repeatOrderButton";
import ModifyOrderButton from "./modifyOrderButton";
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
					<ModifyOrderButton orderDetails={orderDetails} />
					<Button className="actionButtonsMargin">
						<Icon name="cancel" />
						Cancel Order
					</Button>
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

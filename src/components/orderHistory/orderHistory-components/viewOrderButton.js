//libs
import React from "react";
//ui components
import { Button, Icon } from "semantic-ui-react";
//actions
//utils
import { history } from "../../../utils/history";
//css
import "../orderHistory-css/orderActions.css";

class ViewOrderButton extends React.Component {
	viewOrderClicked = (order) => {
		history.push(`/view/${order._id}`);
	};

	render() {
		const { orderDetails } = this.props;
		return (
			<Button
				className="actionButtonsMargin"
				onClick={() => this.viewOrderClicked(orderDetails)}
			>
				<Icon name="eye" /> View Order
			</Button>
		);
	}
}

export default ViewOrderButton;

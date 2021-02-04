//libs
import React from "react";
//ui components
import { Button } from "semantic-ui-react";

class OrderStatusButton extends React.Component {
	render() {
		const { content } = this.props;
		let buttonColor = "";
		switch (content) {
			case "Submitted":
				buttonColor = "blue";
				break;
			case "Paid":
				buttonColor = "green";
				break;
			case "Pending":
				buttonColor = "red";
				break;
			case "Confirmed":
				buttonColor = "green";
				break;
			case "Scheduled For Delivery":
				buttonColor = "green";
				break;
			case "Cancelled":
				buttonColor = "red";
				break;
			default:
				buttonColor = "grey";
				break;
		}
		return (
			<Button basic color={buttonColor} content={content} compact size="tiny" />
		);
	}
}

export default OrderStatusButton;

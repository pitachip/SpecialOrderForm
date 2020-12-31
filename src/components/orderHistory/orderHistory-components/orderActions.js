//libs
import React from "react";
//ui components
import { Button, Icon } from "semantic-ui-react";
//css
import "../orderHistory-css/orderActions.css";

class OrderStatusButton extends React.Component {
	render() {
		return (
			<div>
				<Button.Group vertical compact>
					<Button className="actionButtonsMargin">
						<Icon name="eye" />
						View Order
					</Button>
					<Button className="actionButtonsMargin">
						<Icon name="edit" /> Modify Order
					</Button>
					<Button className="actionButtonsMargin">
						<Icon name="cancel" />
						Cancel Order
					</Button>
					<Button className="actionButtonsMargin">
						<Icon name="file alternate outline" />
						View Invoice/Reciept
					</Button>
					<Button>
						<Icon name="repeat" />
						Repeat Order
					</Button>
				</Button.Group>
			</div>
		);
	}
}

export default OrderStatusButton;

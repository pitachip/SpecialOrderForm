//libs
import React from "react";
//ui components
import { Grid, Icon } from "semantic-ui-react";
//css
import "../view-css/viewOrder.css";

class ViewOrderHeader extends React.Component {
	render() {
		const { orderNumber, customerEmail } = this.props;
		return (
			<Grid className="rowPadding">
				<Grid.Row textAlign="center">
					<Grid.Column>
						<Icon name="check circle outline" color="green" size="big" />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row textAlign="center">
					<Grid.Column>We've recieved your order!</Grid.Column>
				</Grid.Row>
				<Grid.Row textAlign="center">
					<Grid.Column>Order# {orderNumber}</Grid.Column>
				</Grid.Row>
				<Grid.Row textAlign="center">
					<Grid.Column>
						<p className="emailConfirmation">
							A copy of your order confirmation has been sent to {customerEmail}
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default ViewOrderHeader;

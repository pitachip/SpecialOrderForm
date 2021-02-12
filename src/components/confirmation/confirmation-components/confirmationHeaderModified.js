//libs
import React from "react";
//ui components
import { Grid, Icon } from "semantic-ui-react";
//css
import "../confirmation-css/orderConfirmation.css";

/**
 * TODO
 * Find a way to combine this with the other header. Maybe another HOC
 */
class ConfirmationHeaderModified extends React.Component {
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
					<Grid.Column>We've modified your order!</Grid.Column>
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

export default ConfirmationHeaderModified;

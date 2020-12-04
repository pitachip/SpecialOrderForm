//libs
import React from "react";
//ui components
import { Grid, Header } from "semantic-ui-react";
//css
import "../confirmation-css/orderConfirmation.css";

class ConfirmationPickupDetails extends React.Component {
	render() {
		const { location, orderDate } = this.props.orderDetails;
		const {
			address1,
			address2,
			city,
			state,
			zip,
			phoneNumber,
			email,
			pickupInstructions,
		} = this.props.pickupInformation;
		return (
			<Grid container>
				<Grid.Row className="confirmationDeliveryDetailsRow">
					<Header as="h3">Pickup Details</Header>
				</Grid.Row>
				<Grid.Row columns={2} className="confirmationDeliveryDetailsRow">
					<Grid.Column textAlign="center">
						<Header as="h5">Location</Header>
						<div className="deliveryDetails">
							<p>{location}</p>
							<p>{address1}</p>
							<p>{address2}</p>
							<p>
								{city}, {state} {zip}
							</p>
							<p>{phoneNumber}</p>
							<p>{email}</p>
						</div>
					</Grid.Column>
					<Grid.Column textAlign="center">
						<Header as="h5">Pickup Instructions</Header>
						<div className="deliveryDetails">
							<p>{pickupInstructions}</p>
							<p>
								Pickup by{" "}
								{new Date(orderDate).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}{" "}
								on {new Date(orderDate).toLocaleString().split(",")[0]}
							</p>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default ConfirmationPickupDetails;

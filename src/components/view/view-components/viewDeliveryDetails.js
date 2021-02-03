//libs
import React from "react";
//ui components
import { Grid, Header } from "semantic-ui-react";
//css
import "../view-css/viewOrder.css";

class ViewDeliveryDetails extends React.Component {
	render() {
		const { orderDate } = this.props;
		const {
			firstName,
			lastName,
			phoneNumber,
			email,
			address1,
			address2,
			city,
			state,
			zip,
			deliveryInstructions,
		} = this.props.deliveryInformation;
		return (
			<Grid container>
				<Grid.Row className="confirmationDeliveryDetailsRow">
					<Header as="h3">Delivery Details</Header>
				</Grid.Row>
				<Grid.Row columns={2} className="confirmationDeliveryDetailsRow">
					<Grid.Column textAlign="center">
						<Header as="h5">Delivery Contact</Header>
						<div className="deliveryDetails">
							<p>
								{firstName} {lastName}
							</p>
							<p>{phoneNumber}</p>
							<p>{email}</p>
						</div>
					</Grid.Column>
					<Grid.Column textAlign="center">
						<Header as="h5">Delivery Address</Header>
						<div className="deliveryDetails">
							<p>{address1}</p>
							{address2 !== "" ? <p>{address2}</p> : null}
							<p>
								{city}, {state} {zip}
							</p>
							<p>{deliveryInstructions}</p>
							<p>
								Deliver by{" "}
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

export default ViewDeliveryDetails;

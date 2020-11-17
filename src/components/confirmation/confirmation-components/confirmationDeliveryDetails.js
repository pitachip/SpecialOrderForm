//libs
import React from "react";
//ui components
import { Grid, Header } from "semantic-ui-react";
//css
//css
import "../confirmation-css/orderConfirmation.css";

class ConfirmationDeliveryDetails extends React.Component {
	render() {
		return (
			<Grid container>
				<Grid.Row className="confirmationDeliveryDetailsRow">
					<Header as="h3">Delivery Details</Header>
				</Grid.Row>
				<Grid.Row columns={2} className="confirmationDeliveryDetailsRow">
					<Grid.Column>
						<Header as="h5">Delivery Contact</Header>
						<div className="deliveryDetails">
							<p>Rend Alsaadi</p>
							<p>215-253-955</p>
							<p>alsaadirend@gmail.com</p>
						</div>
					</Grid.Column>
					<Grid.Column>
						<Header as="h5">Delivery Address</Header>
						<div className="deliveryDetails">
							<p>1600 N Broad Street</p>
							<p>Philadelhphia, PA 19121</p>
							<p>Extra delivery notes</p>
							<p>Deliver by 12:30pm on 11/20/2020</p>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default ConfirmationDeliveryDetails;

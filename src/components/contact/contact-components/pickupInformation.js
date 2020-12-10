//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import { Grid, Form } from "semantic-ui-react";
//actions
import { updatePickupInstructions } from "../../../actions";
//css
import "../contact-css/pickup.css";

class PickUpInformation extends React.Component {
	render() {
		const { location, pickupInformation } = this.props.orderDetails;
		return (
			<Grid container className="containerMargin">
				<Grid.Row columns={1}>
					<Grid.Column>
						<h2>Pick-Up Information</h2>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={2}>
					<Grid.Column>
						<div className="storeInformation">
							<h4>Location: {location}</h4>
							<p className="storeInformation">{pickupInformation.address1}</p>
							<p className="storeInformation">{pickupInformation.address2}</p>
							<p className="storeInformation">
								{pickupInformation.city}, {pickupInformation.state}{" "}
								{pickupInformation.zip}
							</p>
							<p className="storeInformation">{pickupInformation.email}</p>
							<p className="storeInformation">
								{pickupInformation.phoneNumber}
							</p>
						</div>
					</Grid.Column>
					<Grid.Column>
						<Form>
							<Form.TextArea
								value={pickupInformation.pickupInstructions}
								rows={5}
								label="Pickup Notes"
								placeholder="Let us know about any specific instructions for when you pickup your order"
								onChange={(e, data) =>
									this.props.updatePickupInstructions(data.value)
								}
							/>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default connect(null, { updatePickupInstructions })(PickUpInformation);

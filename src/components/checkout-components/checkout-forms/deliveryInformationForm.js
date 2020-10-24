//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
//utils
import { getStates } from "../../../utils/checkoutUtils";
//actions
import { updateDeliveryDetails } from "../../../actions";

class DeliveryInformationForm extends React.Component {
	state = {
		stateDropdown: [],
		deliveryInformation: {
			address1: "",
			address2: "",
			city: "",
			state: "",
			zip: "",
		},
	};

	componentDidMount() {
		this.setState({ stateDropdown: getStates() });
		//load in redux values
		console.log(this.props.deliveryInformation);
	}

	render() {
		const { address1, address2 } = this.state.deliveryInformation;
		return (
			<>
				{/**TODO: Need to add a search components to autofill the address */}
				<h2>Delivery Information</h2>
				<Form>
					<Form.Group>
						<Form.Label>Address</Form.Label>
						<Form.Control
							placeholder="1234 Main St"
							value={address1}
							onChange={(e) =>
								this.setState({
									deliveryInformation: { address1: e.target.value },
								})
							}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Address 2</Form.Label>
						<Form.Control placeholder="Apartment, studio, or floor" />
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>City</Form.Label>
							<Form.Control />
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>State</Form.Label>
							<Form.Control as="select" defaultValue="Choose State...">
								<option>Choose State...</option>
								{this.state.stateDropdown.map((state) => {
									return (
										<option key={state.abbreviation}>
											{state.abbreviation}
										</option>
									);
								})}
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridZip">
							<Form.Label>Zip</Form.Label>
							<Form.Control type="number" />
						</Form.Group>
					</Form.Row>
				</Form>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		deliveryInformation: state.order.orderDetails.deliveryInformation,
	};
};

export default connect(mapStateToProps, { updateDeliveryDetails })(
	DeliveryInformationForm
);

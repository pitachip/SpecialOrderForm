//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { MdAdd } from "react-icons/md";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class ShoppingCartDetails extends React.Component {
	//TODO: When the user clicks "order", that's when we'll call the reducer

	state = {
		specialRequests: "",
		showTextArea: false,
		location: "",
		shippingMethod: "",
		orderDate: new Date(),
	};

	toggleSpecialInstructionsTextArea = () => {
		if (this.state.specialRequests === "" && this.state.showTextArea) {
			this.setState({ showTextArea: false });
		} else if (this.state.specialRequests === "" && !this.state.showTextArea) {
			this.setState({ showTextArea: true });
		}
	};

	renderDateTimeSelector = () => {
		return (
			<DatePicker
				selected={this.state.orderDate}
				onChange={(date) => this.setState({ orderDate: date })}
				timeInputLabel="Time:"
				dateFormat="MM/dd/yyyy h:mm aa"
				showTimeInput
			/>
		);
	};

	renderShippingOptions = () => {
		return (
			<>
				<Form.Group>
					<Form.Check
						type="radio"
						value="pickup"
						checked={this.state.shippingMethod === "pickup"}
						label="Pick-Up"
						onChange={(e) => this.setState({ shippingMethod: e.target.value })}
					/>
					<Form.Check
						type="radio"
						value="delivery"
						checked={this.state.shippingMethod === "delivery"}
						label="Delivery"
						onChange={(e) => this.setState({ shippingMethod: e.target.value })}
					/>
				</Form.Group>
			</>
		);
	};

	renderLocationDropdownOptions = () => {
		return this.props.storeInformation.locations.map((store) => {
			return (
				<option key={store.storeName}>
					{store.storeName}: {store.storeAddress}
				</option>
			);
		});
	};

	renderLocationDropdown = () => {
		return (
			<>
				<Form.Group>
					<Form.Label>Choose Location</Form.Label>
					<Form.Control
						as="select"
						size="sm"
						custom
						value={this.state.location}
						onChange={(e) => this.setState({ location: e.target.value })}
					>
						<option value=""></option>
						{this.renderLocationDropdownOptions()}
					</Form.Control>
				</Form.Group>
			</>
		);
	};

	renderTextAreaPlaceholder = () => {
		return (
			<div
				style={{ cursor: "pointer" }}
				onClick={() => this.toggleSpecialInstructionsTextArea()}
			>
				<MdAdd />
				Special Instructions
			</div>
		);
	};

	renderTextArea = () => {
		return (
			<>
				<Form.Group>
					<Form.Control
						as="textarea"
						rows="3"
						placeholder="Let us know about any special requests you need for this order"
						onBlur={() => this.toggleSpecialInstructionsTextArea()}
						value={this.state.specialRequests}
						onChange={(e) => this.setState({ specialRequests: e.target.value })}
					/>
				</Form.Group>
			</>
		);
	};

	render() {
		return (
			<div>
				<Card>
					<Card.Body>
						<Form>
							{this.state.showTextArea
								? this.renderTextArea()
								: this.renderTextAreaPlaceholder()}
							{this.renderLocationDropdown()}
							{this.renderShippingOptions()}
							{this.renderDateTimeSelector()}
						</Form>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		storeInformation: state.storeInformation.storeInformation,
	};
};

export default connect(mapStateToProps, {})(ShoppingCartDetails);

//libs
import React, { useEffect, useState } from "react";
import { Field } from "redux-form";
//ui components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
//utils
import { getStates } from "../../../utils/checkoutUtils";

const required = (value) => {
	if (!value || value === "") {
		return "This field is required";
	}
};

const deliverySelectField = ({
	input,
	meta,
	type,
	placeholder,
	states,
	errorMessage,
}) => {
	return (
		<div>
			<Form.Control
				as="select"
				onChange={input.onChange}
				value={input.value}
				placeholder={placeholder}
			>
				<option></option>
				{states.map((state) => {
					return <option key={state.abbreviation}>{state.abbreviation}</option>;
				})}
			</Form.Control>
			{meta.touched && !meta.valid ? errorMessage : null}
		</div>
	);
};

const deliveryInputField = ({
	input,
	meta,
	type,
	placeholder,
	errorMessage,
}) => {
	return (
		<div>
			<Form.Control
				type={type}
				placeholder={placeholder}
				value={input.value}
				onChange={input.onChange}
			/>
			{meta.touched && !meta.valid ? errorMessage : null}
		</div>
	);
};

const deliveryTextArea = ({ input, placeholder }) => {
	return (
		<div>
			<Form.Control
				as="textarea"
				rows={3}
				placeholder={placeholder}
				value={input.value}
				onChange={input.onChange}
			/>
		</div>
	);
};

const DeliveryInformationForm = () => {
	const [states, setStates] = useState([]);

	useEffect(() => {
		setStates(getStates());
	}, []);

	return (
		<div>
			<Form.Group>
				<Form.Label>Address</Form.Label>
				<Field
					name="address1"
					component={deliveryInputField}
					type="text"
					placeholder="1234 Pita Chip Way"
					errorMessage="Address is required"
					validate={required}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Address 2</Form.Label>
				<Field
					name="address2"
					component={deliveryInputField}
					type="text"
					placeholder="Unit 7"
				/>
			</Form.Group>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Label>City</Form.Label>
					<Field
						name="city"
						component={deliveryInputField}
						type="text"
						placeholder="City"
						errorMessage="City is required"
						validate={required}
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>State</Form.Label>
					<Field
						name="state"
						component={deliverySelectField}
						states={states}
						placeholder="Choose State"
						validate={required}
						errorMessage="State is required"
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Zip</Form.Label>
					<Field
						name="zip"
						type="number"
						placeholder="18929"
						component={deliveryInputField}
						errorMessage="Zip is required"
						validate={required}
					/>
				</Form.Group>
			</Form.Row>
			<Form.Group controlId="exampleForm.ControlTextarea1">
				<Form.Label>Delivery Notes/Instructions</Form.Label>
				<Field
					name="deliveryInstructions"
					component={deliveryTextArea}
					placeholder="e.g. Enter through loading dock on 26th street"
				/>
			</Form.Group>
		</div>
	);
};

export default DeliveryInformationForm;

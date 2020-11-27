//libs
import React, { useEffect, useState } from "react";
import { Field } from "redux-form";
//ui components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
//utils
import { getStates } from "../../../utils/checkoutUtils";
//css
import "../checkout-css/checkoutForm.css";

const validateZipCode = (zipCode) =>
	zipCode && !/^\d{5}(-\d{4})?$/.test(zipCode)
		? " code format is invalid"
		: undefined;

const required = (value) => {
	if (!value || value === "") {
		return " is required";
	}
};

const deliverySelectField = ({
	input,
	meta,
	type,
	placeholder,
	states,
	errorMessagePrefix,
}) => {
	return (
		<div>
			<Form.Control
				as="select"
				onChange={input.onChange}
				value={input.value}
				placeholder={placeholder}
				className={`${
					meta.touched && !meta.valid ? "inputValidationError" : ""
				}`}
			>
				<option></option>
				{states.map((state) => {
					return <option key={state.abbreviation}>{state.abbreviation}</option>;
				})}
			</Form.Control>
			{meta.touched && !meta.valid ? (
				<span className="validationErrorMessage">
					{errorMessagePrefix} {meta.error}
				</span>
			) : null}
		</div>
	);
};

const deliveryInputField = ({
	input,
	meta,
	type,
	placeholder,
	errorMessagePrefix,
}) => {
	return (
		<div>
			<Form.Control
				type={type}
				placeholder={placeholder}
				value={input.value}
				onChange={input.onChange}
				className={`${
					meta.touched && !meta.valid ? "inputValidationError" : ""
				}`}
			/>
			{meta.touched && !meta.valid ? (
				<span className="validationErrorMessage">
					{errorMessagePrefix} {meta.error}
				</span>
			) : null}
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
					errorMessagePrefix="Address"
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
						errorMessagePrefix="City"
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
						errorMessagePrefix="State"
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Zip</Form.Label>
					<Field
						name="zip"
						type="number"
						placeholder="18929"
						component={deliveryInputField}
						errorMessagePrefix="Zip"
						validate={[required, validateZipCode]}
					/>
				</Form.Group>
			</Form.Row>
			<Form.Group>
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

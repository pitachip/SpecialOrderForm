//libs
import React from "react";
import { Field } from "redux-form";
//ui components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const validateEmail = (value) =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? " address format is invalid"
		: undefined;

const normalizePhone = (value) => {
	if (!value) {
		return value;
	}

	const onlyNums = value.replace(/[^\d]/g, "");
	if (onlyNums.length <= 3) {
		return onlyNums;
	}
	if (onlyNums.length <= 7) {
		return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
	}
	return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
		6,
		10
	)}`;
};

const required = (value) => {
	if (!value || value === "") {
		return " is required";
	}
};

//TODO: Can move this type of input definition into a common file
const customerInformationInput = ({
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
			/>
			{meta.touched && !meta.valid ? errorMessagePrefix + meta.error : null}
		</div>
	);
};

const CustomerInformationForm = () => {
	return (
		<div>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Label>First Name</Form.Label>
					<Field
						name="firstName"
						component={customerInformationInput}
						type="text"
						placeholder="First"
						errorMessagePrefix="First name"
						validate={required}
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Last Name</Form.Label>
					<Field
						name="lastName"
						component={customerInformationInput}
						type="text"
						placeholder="Last"
						errorMessagePrefix="Last name"
						validate={required}
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Label>Email</Form.Label>
					<Field
						name="email"
						component={customerInformationInput}
						type="text"
						placeholder="example@email.com"
						errorMessagePrefix="Email"
						validate={[required, validateEmail]}
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Phone Number</Form.Label>
					<Field
						name="phoneNumber"
						component={customerInformationInput}
						type="text"
						placeholder="215-412-6789"
						errorMessagePrefix="Phone number"
						validate={required}
						normalize={normalizePhone}
					/>
				</Form.Group>
			</Form.Row>
		</div>
	);
};

export default CustomerInformationForm;

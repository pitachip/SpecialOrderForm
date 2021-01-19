//libs
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field, change, isDirty } from "redux-form";
//ui components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
//css
import "../checkout-css/checkoutForm.css";

const validateEmail = (value) =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? " address format is invalid"
		: undefined;

const normalizePhone = (value) => {
	console.log("normalize phone called");
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
//can also move the label into here and psossibly add stlying on it.
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

const CustomerInformationForm = ({ dirty, change, userMetaData }) => {
	useEffect(() => {
		if (!dirty) {
			change("checkoutContactForm", "firstName", userMetaData.firstName);
			change("checkoutContactForm", "lastName", userMetaData.lastName);
			change("checkoutContactForm", "email", userMetaData.email);
		}
	});
	return (
		<div>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Label className="required">First Name</Form.Label>
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
					<Form.Label className="required">Last Name</Form.Label>
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
					<Form.Label className="required">Email</Form.Label>
					<Field
						name="email"
						component={customerInformationInput}
						type="text"
						placeholder="example@email.com"
						errorMessagePrefix="Email"
						validate={[required, validateEmail]}
					/>
					<Form.Text className="text-muted">
						We will send the order confirmation to this email.
					</Form.Text>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label className="required">Phone Number</Form.Label>
					<Field
						name="phoneNumber"
						component={customerInformationInput}
						type="text"
						placeholder="XXX-XXX-XXXX"
						errorMessagePrefix="Phone number"
						validate={required}
						normalize={normalizePhone}
					/>
				</Form.Group>
			</Form.Row>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		dirty: isDirty("checkoutContactForm")(state),
		userMetaData: state.auth.metaData,
	};
};

export default connect(mapStateToProps, { change })(CustomerInformationForm);

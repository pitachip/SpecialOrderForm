//libs
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Field, getFormValues, change } from "redux-form";
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

//TODO: This stuff (and normalize phone) can eventually go into a utils folder
const required = (value) => {
	if (!value || value === "") {
		return " is required";
	}
};

//TODO: Can move this type of input definition into a common file
const deliveryContactInformationInput = ({
	input,
	meta,
	type,
	placeholder,
	errorMessagePrefix,
	sameAsAbove,
}) => {
	return (
		<div>
			<Form.Control
				type={type}
				placeholder={placeholder}
				value={input.value}
				onChange={input.onChange}
				disabled={sameAsAbove}
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

const deliveryContactInformationCheckbox = ({
	input,
	meta,
	type,
	placeholder,
	errorMessage,
	label,
}) => {
	return (
		<div>
			<Form.Check
				type={type}
				placeholder={placeholder}
				onChange={input.onChange}
				label={label}
				checked={input.value}
			/>
		</div>
	);
};

const DeliveryContactInformationForm = ({ contactInformation, change }) => {
	const [sameAsAbove, setSameAsAbove] = useState(false);

	useEffect(() => {
		if (contactInformation && contactInformation.sameAsAbove) {
			setSameAsAbove(true);
		}
	}, []);

	const sameAsAboveClicked = (checked) => {
		if (checked) {
			change(
				"checkoutContactForm",
				"firstNameDelivery",
				contactInformation.firstName
			);
			change(
				"checkoutContactForm",
				"lastNameDelivery",
				contactInformation.lastName
			);
			change("checkoutContactForm", "emailDelivery", contactInformation.email);
			change(
				"checkoutContactForm",
				"phoneNumberDelivery",
				contactInformation.phoneNumber
			);
			setSameAsAbove(true);
		} else {
			change("checkoutContactForm", "firstNameDelivery", "");
			change("checkoutContactForm", "lastNameDelivery", "");
			change("checkoutContactForm", "emailDelivery", "");
			change("checkoutContactForm", "phoneNumberDelivery", "");
			setSameAsAbove(false);
		}
	};
	return (
		<div>
			<Form.Group>
				<Field
					name="sameAsAbove"
					component={deliveryContactInformationCheckbox}
					type="checkbox"
					label="Same as Above"
					onChange={(e, checked) => sameAsAboveClicked(checked)}
				/>
			</Form.Group>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Label>First Name</Form.Label>
					<Field
						name="firstNameDelivery"
						component={deliveryContactInformationInput}
						type="text"
						placeholder="First"
						errorMessagePrefix="First"
						validate={required}
						sameAsAbove={sameAsAbove}
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Last Name</Form.Label>
					<Field
						name="lastNameDelivery"
						component={deliveryContactInformationInput}
						type="text"
						placeholder="Last"
						errorMessagePrefix="Last"
						validate={required}
						sameAsAbove={sameAsAbove}
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Label>Email</Form.Label>
					<Field
						name="emailDelivery"
						component={deliveryContactInformationInput}
						type="text"
						placeholder="example@email.com"
						errorMessagePrefix="Email"
						validate={[required, validateEmail]}
						sameAsAbove={sameAsAbove}
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Phone Number</Form.Label>
					<Field
						name="phoneNumberDelivery"
						component={deliveryContactInformationInput}
						type="text"
						placeholder="215-412-6789"
						errorMessagePrefix="Phone number"
						validate={required}
						sameAsAbove={sameAsAbove}
						normalize={normalizePhone}
					/>
				</Form.Group>
			</Form.Row>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		contactInformation: getFormValues("checkoutContactForm")(state),
	};
};

export default connect(mapStateToProps, { change })(
	DeliveryContactInformationForm
);

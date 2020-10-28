//libs
import React from "react";
import { connect } from "react-redux";
import { Field, getFormValues, change } from "redux-form";
//ui components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const required = (value) => {
	if (!value || value === "") {
		return "This field is required";
	}
};

//TODO: Can move this type of input definition into a common file
const deliveryContactInformationInput = ({
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
			{meta.touched && !meta.valid ? errorMessage : null}
		</div>
	);
};

const DeliveryContactInformationForm = (props) => {
	const handlechange = () => {
		props.change("checkoutContactForm", "firstNameDelivery", "Test");
	};
	console.log("Customer Form Data: ", props);
	return (
		<div>
			<Form.Group>
				<Field
					name="sameAsAbove"
					component={deliveryContactInformationCheckbox}
					type="checkbox"
					label="Same as Above"
					onChange={(e, checked) => handlechange(props.change)}
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
						errorMessage="First name is required"
						validate={required}
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Last Name</Form.Label>
					<Field
						name="lastName"
						component={deliveryContactInformationInput}
						type="text"
						placeholder="Last"
						errorMessage="Last name is required"
						validate={required}
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Label>Email</Form.Label>
					<Field
						name="email"
						component={deliveryContactInformationInput}
						type="text"
						placeholder="example@email.com"
						errorMessage="Email is required"
						validate={required}
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Phone Number</Form.Label>
					<Field
						name="phoneNumber"
						component={deliveryContactInformationInput}
						type="text"
						placeholder="215-412-6789"
						errorMessage="Phone number is required"
						validate={required}
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

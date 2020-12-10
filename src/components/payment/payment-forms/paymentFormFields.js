//libs
import React from "react";
//ui components
import { Form, Checkbox } from "semantic-ui-react";
//css
import "../../checkout-components/checkout-css/checkoutForm.css";

export const paymentCheckboxField = ({ input, type, label }) => {
	return (
		<>
			<Form.Field
				control={Checkbox}
				type={type}
				label={label}
				onChange={(e, { checked }) => input.onChange(checked)}
				checked={input.checked}
			/>
		</>
	);
};

export const paymentInputField = ({
	input,
	label,
	placeholder,
	meta,
	errorMessagePrefix,
}) => {
	return (
		<>
			<Form.Field>
				<label>{label}</label>
				<input
					placeholder={placeholder}
					onChange={input.onChange}
					value={input.value}
					className={`${
						meta.touched && !meta.valid ? "inputValidationError" : ""
					}`}
				/>
				{meta.touched && !meta.valid ? (
					<span className="validationErrorMessage">
						{errorMessagePrefix}
						{meta.error}
					</span>
				) : null}
			</Form.Field>
		</>
	);
};

export const required = (value) => {
	if (!value || value === "") {
		return " is required";
	}
};

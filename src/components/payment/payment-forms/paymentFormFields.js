//libs
import React from "react";
//ui components
import { Form, Checkbox } from "semantic-ui-react";

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

export const paymentInputField = ({ input, label, placeholder }) => {
	return (
		<>
			<Form.Field>
				<label>{label}</label>
				<input
					placeholder={placeholder}
					onChange={input.onChange}
					value={input.value}
				/>
			</Form.Field>
		</>
	);
};

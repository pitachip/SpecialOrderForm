//libs
import React from "react";
//ui components
import { Form, Checkbox } from "semantic-ui-react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdHelp } from "react-icons/md";
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
	css,
	tooltipText,
	showToolTip,
}) => {
	return (
		<>
			<Form.Field>
				<label className={css ? css : null}>
					{label}{" "}
					{showToolTip ? (
						<span>
							<OverlayTrigger
								placement="right"
								overlay={<Tooltip>{tooltipText}</Tooltip>}
							>
								<MdHelp />
							</OverlayTrigger>
						</span>
					) : null}
				</label>
				<input
					maxLength={30}
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
				<small className="text-muted">
					Characters Remaining: {30 - input.value.length}
				</small>
			</Form.Field>
		</>
	);
};

export const required = (value) => {
	if (!value || value === "") {
		return " is required";
	}
};

//libs
import React from "react";
//ui components
import Button from "react-bootstrap/Button";
import { IconContext } from "react-icons";
//css
import "../payment-css/paymentDetails.css";

class PaymentOptionButton extends React.Component {
	render() {
		const { paymentType, paymentTypeText, buttonClicked } = this.props;
		return (
			<div className="paymentType">
				<Button
					variant="outline-primary"
					size="lg"
					onClick={() => buttonClicked(paymentType)}
				>
					<IconContext.Provider value={{ size: "2em" }}>
						<div>{this.props.paymentIcon}</div>
					</IconContext.Provider>
				</Button>
				<p>{paymentTypeText}</p>
			</div>
		);
	}
}
export default PaymentOptionButton;

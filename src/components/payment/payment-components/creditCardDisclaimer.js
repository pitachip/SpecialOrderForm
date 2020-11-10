//libs
import React from "react";
//ui components
import { Message } from "semantic-ui-react";

class CreditCardDisclaimer extends React.Component {
	render() {
		return (
			<Message
				icon="credit card"
				header="Pay with Credit Card"
				content="You will enter credit card information after submitting the order"
			/>
		);
	}
}

export default CreditCardDisclaimer;

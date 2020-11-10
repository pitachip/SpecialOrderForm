//libs
import React from "react";
//ui components
import { Message } from "semantic-ui-react";

class PaymentDisclaimer extends React.Component {
	render() {
		return <Message icon="money" header="Please choose a form of payment" />;
	}
}

export default PaymentDisclaimer;

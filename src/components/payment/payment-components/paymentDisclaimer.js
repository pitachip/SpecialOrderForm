//libs
import React from "react";
//ui components
import { Message } from "semantic-ui-react";
//app components
import CheckoutNavigation from "../../checkout-components/checkoutNavigation";

class PaymentDisclaimer extends React.Component {
	render() {
		return (
			<>
				<Message icon="money" header="Please choose a form of payment" />
				<CheckoutNavigation
					backNav="/checkout/details"
					backText="Contact"
					forwardText="Submit Order"
					forwardButtonClicked={() => null}
					disableForwardButton={true}
				/>
			</>
		);
	}
}

export default PaymentDisclaimer;

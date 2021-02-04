//libs
import React from "react";
//ui components
import { Message } from "semantic-ui-react";

class NoOrdersFound extends React.Component {
	render() {
		return (
			<Message>
				<Message.Header>No Orders Found</Message.Header>
				<p>We're sorry, we couldn't find an order with that number.</p>
			</Message>
		);
	}
}

export default NoOrdersFound;

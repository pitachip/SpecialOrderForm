//libs
import React from "react";
//ui components
import { Message } from "semantic-ui-react";

class NoOrdersFound extends React.Component {
	render() {
		return (
			<Message>
				<Message.Header>No Orders Found</Message.Header>
			</Message>
		);
	}
}

export default NoOrdersFound;

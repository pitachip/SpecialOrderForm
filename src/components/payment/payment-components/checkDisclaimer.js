//libs
import React from "react";
//ui components
import { Message, List } from "semantic-ui-react";

class CheckDisclaimer extends React.Component {
	render() {
		return (
			<Message>
				<Message.Header>
					Procedure for payment with check/purchase order
				</Message.Header>
				<Message.List>
					<List ordered>
						<List.Item>
							We'll send you a digital invoice upon order confirmation for your
							records or accounts payable
						</List.Item>
						<List.Item>Make all check out to INSERT DATA HERE</List.Item>
					</List>
				</Message.List>
			</Message>
		);
	}
}

export default CheckDisclaimer;

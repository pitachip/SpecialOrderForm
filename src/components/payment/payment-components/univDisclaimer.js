//libs
import React from "react";
//ui components
import { Message, List } from "semantic-ui-react";

class CheckDisclaimer extends React.Component {
	/**
	 * Could consolidate this and the checkDisclaimer into one comp
	 * that takes in the correct props
	 */
	render() {
		return (
			<Message>
				<Message.Header>
					Procedure for payment with university money account
				</Message.Header>
				<Message.List>
					<List ordered>
						<List.Item>
							We'll send you a digital invoice upon order confirmation for your
							records or accounts payable
						</List.Item>
						<List.Item>
							We currently accept Diamond Dollars (Temple) and Dragon Dollars
							(Drexel)
						</List.Item>
					</List>
				</Message.List>
			</Message>
		);
	}
}

export default CheckDisclaimer;

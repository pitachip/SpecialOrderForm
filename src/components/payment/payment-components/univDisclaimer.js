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
							Invoice will be emailed to you upon order confirmation.
						</List.Item>
						<List.Item>
							We will charge the account number that you provide. We currently
							accept Diamond Dollars (Temple) and Dragon Dollars (Drexel)
						</List.Item>
					</List>
				</Message.List>
			</Message>
		);
	}
}

export default CheckDisclaimer;

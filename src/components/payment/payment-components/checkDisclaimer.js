//libs
import React from "react";
//ui components
import { Message, List } from "semantic-ui-react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdHelp } from "react-icons/md";

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
						<List.Item>Make all checks out to INSERT DATA HERE</List.Item>
						<List.Item>
							If applicable, enter your purchase order number
							<span>
								<OverlayTrigger
									placement="right"
									overlay={
										<Tooltip>
											If you don't have the PO# yet you will be able to enter it
											later.
										</Tooltip>
									}
								>
									<MdHelp />
								</OverlayTrigger>
							</span>
						</List.Item>
					</List>
				</Message.List>
			</Message>
		);
	}
}

export default CheckDisclaimer;

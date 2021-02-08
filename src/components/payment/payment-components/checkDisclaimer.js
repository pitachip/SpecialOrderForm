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
							Digital/PDF invoice will be sent upon order confirmation.
						</List.Item>
						<List.Item>
							If paying with check, make all checks out to FALA FILLY INC.
						</List.Item>
						<List.Item>
							If paying with a purchase order, use invoice to obtain a purchase
							order number from your institution. We are listed as Fala Filly
							Inc DBA Pita Chip. Reply to the order confirmation email with your
							purchase order number.
						</List.Item>
					</List>
				</Message.List>
			</Message>
		);
	}
}

export default CheckDisclaimer;

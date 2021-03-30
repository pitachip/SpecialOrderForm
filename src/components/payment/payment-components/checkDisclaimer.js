//libs
import React from "react";
//ui components
import { Message, List, Button } from "semantic-ui-react";
//app components
import UPennInstructionsModal from "../payment-modals/uPennInstructionsModal";

class CheckDisclaimer extends React.Component {
	state = { openPennInstructionsModal: false };

	handleModalClose = () => {
		this.setState({ openPennInstructionsModal: false });
	};
	render() {
		return (
			<>
				<Message>
					<Message.Header>
						Procedure for payment with check/purchase order
					</Message.Header>
					<Message.List>
						<List ordered>
							<List.Item>
								Invoice will be emailed to you upon order confirmation.
							</List.Item>
							<List.Item>
								If paying with check, make all checks out to FALA FILLY INC and
								send to 1600 North Broad Street, Unit 7, Philadelphia, PA 19121
							</List.Item>
							<List.Item>
								<a
									onClick={() =>
										this.setState({ openPennInstructionsModal: true })
									}
								>
									If you are a University of Pennsylvania customer click here.
								</a>
							</List.Item>
						</List>
					</Message.List>
				</Message>
				<UPennInstructionsModal
					show={this.state.openPennInstructionsModal}
					onHide={this.handleModalClose}
				/>
			</>
		);
	}
}

export default CheckDisclaimer;

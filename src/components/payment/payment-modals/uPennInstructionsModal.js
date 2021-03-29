import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class UPennInstructionsModal extends React.Component {
	render() {
		return (
			<>
				<Modal show={this.props.show} onHide={this.props.onHide}>
					<Modal.Header closeButton>
						<Modal.Title>Payment Instructions for UPenn Customers</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ol>
							<li>
								Use invoice to obtain a purchase order number from your accounts
								payable department. We are listed as{" "}
								<b>Fala Filly Inc DBA Pita Chip</b>.
							</li>
							<li>
								Reply to the order confirmation email with your purchase order
								number.
							</li>
							<li>We take care of the rest!</li>
						</ol>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.props.onHide}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default UPennInstructionsModal;

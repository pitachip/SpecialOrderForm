import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class StoreInformation extends React.Component {
	render() {
		//Would desctructre the props here, no need for now though.
		return (
			<>
				<Modal show={this.props.show} onHide={this.props.close}>
					<Modal.Header closeButton>
						<Modal.Title>Hours and Location</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.props.close}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default StoreInformation;

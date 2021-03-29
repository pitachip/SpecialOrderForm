import React from "react";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import StoreInformation from "./modals/storeInformation";

class Disclaimer extends React.Component {
	state = { showModal: false };

	handleClose = () => {
		this.setState({ showModal: false });
	};

	handleOpen = () => {
		this.setState({ showModal: true });
	};

	render() {
		return (
			<Alert variant="info">
				<Row>
					<Col>
						Please note that this order form is for catering clients who have
						tax exempt status or have a form of payment other than credit card
						(e.g. check, purchase order). Please place catering orders at least
						12 hours in advance.
					</Col>
				</Row>
			</Alert>
		);
	}
}

export default Disclaimer;

/**
 * TODO: Will do this in v1.3
 * 					<Col md={2}>
						<Button onClick={this.handleOpen}>Location & Hours</Button>
						<StoreInformation
							show={this.state.showModal}
							close={this.handleClose}
						/>
					</Col>
 */

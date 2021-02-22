//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Form } from "semantic-ui-react";

class UpdatePasswordModal extends React.Component {
	state = { updatingPassword: false };
	updatePassword = async () => {
		console.log("update password button clicked");
	};
	render() {
		const { close, show } = this.props;
		return (
			<>
				<Modal show={show} onHide={close}>
					<Modal.Header closeButton>
						<Modal.Title>Update Password</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Update Password Form to go Here</p>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							className="float-left"
							disabled={this.state.updatingPassword}
							onClick={close}
						>
							Cancel
						</Button>
						{!this.state.updatingPassword ? (
							<Button
								className="float-right"
								type="danger"
								onClick={() => this.updatePassword()}
							>
								Update Password
							</Button>
						) : (
							<Button disabled className="float-right">
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
								<span> Updating Password...</span>
							</Button>
						)}
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, {})(UpdatePasswordModal);

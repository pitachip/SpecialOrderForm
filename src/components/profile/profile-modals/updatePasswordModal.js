//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
//app components
import AuthMessage from "../../auth-components/authMessage";
//actions
import {
	verifyUserPassword,
	updateUserPassword,
	signInWithEmailAndPassword,
} from "../../../actions";
//utils
import { matchStrings } from "../../../utils/authUtils";

/**
 * TODO
 * Might want to put this in the auth folder
 */
class UpdatePasswordModal extends React.Component {
	state = {
		updatingPassword: false,
		currentPassword: "",
		newPassword: "",
		passwordConfirm: "",
		validated: false,
		passwordsMatch: false,
	};

	renderPasswordConfirmationError = () => {
		const { newPassword, passwordConfirm } = this.state;
		if (this.state.validated && this.state.passwordConfirm.length === 0) {
			return "Please confirm your password.";
		} else if (
			!matchStrings(newPassword, passwordConfirm) &&
			this.state.validated
		) {
			return "Passwords do not match.";
		}
	};

	updatePassword = async (e) => {
		const { currentPassword, newPassword, passwordConfirm } = this.state;
		const form = e.currentTarget;
		e.preventDefault();
		e.stopPropagation();

		this.setState({ validated: true });

		if (matchStrings(newPassword, passwordConfirm) && form.checkValidity()) {
			this.setState({ updatingPassword: true });
			const verifyPassword = await this.props.verifyUserPassword(
				currentPassword
			);

			if (verifyPassword) {
				const updateUserPassword = await this.props.updateUserPassword(
					newPassword
				);
				await this.props.signInWithEmailAndPassword(
					updateUserPassword.data.email,
					newPassword
				);
				this.setState({ updatingPassword: false });
				this.props.close();
			} else {
				this.setState({ updatingPassword: false });
			}
		}
	};

	render() {
		const { close, show } = this.props;
		return (
			<div>
				<Modal show={show} onHide={close}>
					<Modal.Header closeButton>
						<Modal.Title>Update Password</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form
							onSubmit={(e) => this.updatePassword(e)}
							noValidate
							validated={this.state.validated}
						>
							<Form.Group>
								<Form.Label className="required">Current Password</Form.Label>
								<Form.Control
									required
									minLength={6}
									type="password"
									placeholder="Enter password"
									value={this.state.currentPassword}
									onChange={(e) =>
										this.setState({ currentPassword: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label className="required">New Password</Form.Label>
								<Form.Control
									required
									minLength={6}
									type="password"
									placeholder="Enter new password"
									value={this.state.newPassword}
									onChange={(e) =>
										this.setState({ newPassword: e.target.value })
									}
								/>
								<Form.Control.Feedback type="invalid">
									Please specify a password that is 6 characters long.
								</Form.Control.Feedback>
								<Form.Text className="text-muted">
									Password must be 6 characters long.
								</Form.Text>
							</Form.Group>

							<Form.Group>
								<Form.Label className="required">Confirm Password</Form.Label>
								<Form.Control
									required
									minLength={6}
									type="password"
									placeholder="Confirm new password"
									value={this.state.passwordConfirm}
									onChange={(e) => {
										this.setState({ passwordConfirm: e.target.value });
										this.renderPasswordConfirmationError();
									}}
									isInvalid={
										(!this.state.passwordsMatch && this.state.validated) ||
										(this.state.passwordConfirm === "" && this.state.validated)
									}
								/>
								<Form.Control.Feedback type="invalid">
									{this.renderPasswordConfirmationError()}
								</Form.Control.Feedback>
							</Form.Group>
							<Button
								variant="secondary"
								className="float-left"
								disabled={this.state.updatingPassword}
								onClick={close}
							>
								Cancel
							</Button>
							{!this.state.updatingPassword ? (
								<Button className="float-right" type="submit">
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
						</Form>
					</Modal.Body>
					{this.props.auth.showAuthMessage ? (
						<Modal.Footer>
							<AuthMessage />
						</Modal.Footer>
					) : null}
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, {
	verifyUserPassword,
	updateUserPassword,
	signInWithEmailAndPassword,
})(UpdatePasswordModal);

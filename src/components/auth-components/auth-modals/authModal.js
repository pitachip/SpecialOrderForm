//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
//app components
import { setAuthMessage, setAuthFormToOpen } from "../../../actions";
import AuthMessage from "../authMessage";
import SignInForm from "../signInForm";
import CreateAccountForm from "../createAccountForm";
import ResetPasswordForm from "../resetPasswordForm";

import "../auth-css/auth.css";

class AuthModal extends React.Component {
	state = { email: "", password: "" };

	closeButtonClicked = () => {
		//Clear out state and error messages
		this.setState({ email: "", password: "" });
		this.props.setAuthMessage("", false, null);
		this.props.close();
	};

	createNewAccountButtonClicked = () => {
		this.props.setAuthFormToOpen("createAccountForm");
	};

	renderModalTitle = () => {
		const { authForm } = this.props.auth;
		switch (authForm) {
			case "signinForm":
				return "Sign In to Your Account";
			case "createAccountForm":
				return "Create an Account";
			case "resetPasswordForm":
				return "Reset Your Password";
			default:
				return "Sign In to Your Account";
		}
	};

	renderAuthForm = () => {
		const { authForm } = this.props.auth;
		switch (authForm) {
			case "signinForm":
				return <SignInForm onAuthSuccess={this.props.onSuccess} />;
			case "createAccountForm":
				return <CreateAccountForm onAuthSuccess={this.props.onSuccess} />;
			case "resetPasswordForm":
				return <ResetPasswordForm onAuthSuccess={this.props.onSuccess} />;
			default:
				return <SignInForm onAuthSuccess={this.props.onSuccess} />;
		}
	};
	render() {
		return (
			<>
				<Modal show={this.props.show} onHide={this.closeButtonClicked}>
					<Modal.Header closeButton>
						<Modal.Title>{this.renderModalTitle()}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Container>
							{this.renderAuthForm()}
							{this.props.auth.showAuthMessage ? <AuthMessage /> : null}
						</Container>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, {
	setAuthMessage,
	setAuthFormToOpen,
})(AuthModal);

//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
//app components
import { setAuthErrorMessage, setAuthFormToOpen } from "../../../actions";
import AuthErrorMessage from "../authErrorMessage";
import SignInForm from "../signInForm";
import CreateAccountForm from "../createAccountForm";

import "../auth-css/auth.css";

class AuthModal extends React.Component {
	state = { email: "", password: "" };

	closeButtonClicked = () => {
		//Clear out state and error messages
		this.setState({ email: "", password: "" });
		this.props.setAuthErrorMessage("", false);
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
			default:
				return "Sign In to Your Account";
		}
	};

	renderAuthForm = () => {
		const { authForm } = this.props.auth;
		switch (authForm) {
			case "signinForm":
				return <SignInForm onSuccess={this.props.close} />;
			case "createAccountForm":
				return <CreateAccountForm onSuccess={this.props.close} />;
			default:
				return <SignInForm onSuccess={this.props.close} />;
		}
	};
	//TODO: create modal that takes in a form depending on what you want to do (e.g. forget password, create, etc.)
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
							<AuthErrorMessage />
							<Card>
								<Card.Body className="signUpCardItems">
									New here?{" "}
									<Button
										className="signUpButton"
										variant="link"
										onClick={this.createNewAccountButtonClicked}
									>
										Sign Up!
									</Button>
								</Card.Body>
							</Card>
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
	setAuthErrorMessage,
	setAuthFormToOpen,
})(AuthModal);

//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//app components
import { setAuthFormToOpen, setAuthMessage } from "../../actions";

class RegistrationMessage extends React.Component {
	createNewAccountButtonClicked = () => {
		this.props.setAuthFormToOpen("createAccountForm");
		this.props.setAuthMessage("", false, null);
	};

	signInButtonClicked = () => {
		this.props.setAuthFormToOpen("signinForm");
		this.props.setAuthMessage("", false, null);
	};
	renderNewUserCard = () => {
		return (
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
		);
	};
	renderExistingUserCard = () => {
		return (
			<Card>
				<Card.Body className="signUpCardItems">
					Already have an account?{" "}
					<Button
						className="signUpButton"
						variant="link"
						onClick={this.signInButtonClicked}
					>
						Sign in!
					</Button>
				</Card.Body>
			</Card>
		);
	};
	render() {
		return (
			<div>
				{this.props.cardType === "newUser"
					? this.renderNewUserCard()
					: this.renderExistingUserCard()}
			</div>
		);
	}
}

export default connect(null, { setAuthFormToOpen, setAuthMessage })(
	RegistrationMessage
);

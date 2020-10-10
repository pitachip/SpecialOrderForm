//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { MdPerson, MdLock } from "react-icons/md";
//app components
import "./auth-css/auth.css";
import {
	signInWithEmailAndPassword,
	setAuthFormToOpen,
	setAuthMessage,
} from "../../actions";
import RegistrationMessage from "./registrationMessage";

class SignInForm extends React.Component {
	state = { email: "", password: "", isLoading: false, validated: false };

	forgotPasswordButtonClicked = () => {
		this.props.setAuthFormToOpen("resetPasswordForm");
		this.props.setAuthMessage("", false, null);
	};

	signInButtonClicked = async (e) => {
		const form = e.currentTarget;
		e.preventDefault();
		e.stopPropagation();
		this.setState({ isLoading: true });
		this.setState({ validated: true });
		if (form.checkValidity()) {
			await this.props.signInWithEmailAndPassword(
				this.state.email,
				this.state.password
			);
			if (!this.props.auth.showAuthMessage) {
				this.setState({ email: "", password: "" });
				//closes the modal
				this.props.onSuccess();
			} else {
				this.setState({ isLoading: false });
			}
		} else {
			this.setState({ isLoading: false });
		}
	};

	render() {
		return (
			<div>
				<Form
					noValidate
					validated={this.state.validated}
					onSubmit={(e) => this.signInButtonClicked(e)}
				>
					<Form.Group>
						<Form.Label>Email address</Form.Label>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>
									<MdPerson />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								required
								type="email"
								placeholder="falafel@email.com"
								value={this.state.email}
								onChange={(e) => this.setState({ email: e.target.value })}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter an email.
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>
									<MdLock />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								required
								type="password"
								placeholder="Your First Pet's Name"
								value={this.state.password}
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter a password.
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Row className="loginButtonContainer">
						<Button
							block
							variant="primary"
							type="submit"
							disabled={this.state.isLoading}
						>
							{this.state.isLoading ? "Logging in…" : "Log In"}
						</Button>
					</Form.Row>
					<Form.Row className="forgotPasswordButtonContainer">
						<Button variant="link" onClick={this.forgotPasswordButtonClicked}>
							Forgot password?
						</Button>
					</Form.Row>
				</Form>
				<RegistrationMessage cardType="newUser" />
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
	signInWithEmailAndPassword,
	setAuthFormToOpen,
	setAuthMessage,
})(SignInForm);

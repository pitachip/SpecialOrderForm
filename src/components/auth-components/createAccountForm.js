//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import { MdMail, MdCheck, MdLock } from "react-icons/md";
//app components
import { matchStrings } from "../../utils/authUtils";
import { createUserAccount } from "../../actions";
import RegistrationMessage from "./registrationMessage";
//css
import "./auth-css/auth.css";

class CreateAccountForm extends React.Component {
	state = {
		firstName: "",
		lastName: "",
		email: "",
		emailConfirmation: "",
		password: "",
		passwordConfirmation: "",
		validated: false,
		passwordsMatch: false,
		emailsMatch: false,
		isLoading: false,
	};

	createAccountButtonClicked = async (e) => {
		const {
			firstName,
			lastName,
			password,
			passwordConfirmation,
			email,
			emailConfirmation,
		} = this.state;

		const form = e.currentTarget;
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			passwordsMatch: matchStrings(password, passwordConfirmation),
		});
		this.setState({
			emailsMatch: matchStrings(email, emailConfirmation),
		});
		this.setState({ validated: true });

		if (
			matchStrings(password, passwordConfirmation) &&
			matchStrings(email, emailConfirmation) &&
			form.checkValidity()
		) {
			this.setState({ isLoading: true });
			await this.props.createUserAccount(firstName, lastName, email, password);

			if (!this.props.auth.showAuthMessage) {
				this.props.onAuthSuccess();
			} else {
				this.setState({ isLoading: false });
			}
		}
	};

	renderEmailConfirmationError = () => {
		const { email, emailConfirmation } = this.state;
		if (this.state.validated && this.state.emailConfirmation.length === 0) {
			return "Please confirm your email.";
		} else if (
			!matchStrings(email, emailConfirmation) &&
			this.state.validated
		) {
			return "Emails do not match.";
		}
	};

	renderPasswordConfirmationError = () => {
		const { password, passwordConfirmation } = this.state;
		if (this.state.validated && this.state.passwordConfirmation.length === 0) {
			return "Please confirm your password.";
		} else if (
			!matchStrings(password, passwordConfirmation) &&
			this.state.validated
		) {
			return "Passwords do not match.";
		}
	};
	render() {
		return (
			<div>
				<Form
					noValidate
					validated={this.state.validated}
					onSubmit={(e) => this.createAccountButtonClicked(e)}
				>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label className="required">First</Form.Label>
							<Form.Control
								required
								placeholder="Enter first name"
								value={this.state.firstName}
								onChange={(e) => this.setState({ firstName: e.target.value })}
							/>
							<Form.Control.Feedback type="invalid">
								Please specify a first name.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label className="required">Last</Form.Label>
							<Form.Control
								required
								placeholder="Enter last name"
								value={this.state.lastName}
								onChange={(e) => this.setState({ lastName: e.target.value })}
							/>
							<Form.Control.Feedback type="invalid">
								Please specify a last name.
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>

					<Form.Group>
						<Form.Label className="required">Email</Form.Label>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>
									<MdMail />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								required
								type="email"
								placeholder="Enter email address"
								value={this.state.email}
								onChange={(e) => this.setState({ email: e.target.value })}
							/>
							<Form.Control.Feedback type="invalid">
								Please specify an email.
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>

					<Form.Group>
						<Form.Label className="required">Confirm Email</Form.Label>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>
									<MdCheck />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								required
								type="email"
								placeholder="Confirm your email address"
								value={this.state.emailConfirmation}
								onChange={(e) =>
									this.setState({ emailConfirmation: e.target.value })
								}
								isInvalid={
									(!this.state.emailsMatch && this.state.validated) ||
									(this.state.emailConfirmation === "" && this.state.validated)
								}
							/>
							<Form.Control.Feedback type="invalid">
								{this.renderEmailConfirmationError()}
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>

					<Form.Group>
						<Form.Label className="required">Password</Form.Label>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>
									<MdLock />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								required
								minLength={6}
								type="password"
								placeholder="Enter password"
								value={this.state.password}
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
							<Form.Control.Feedback type="invalid">
								Please specify a password that is 6 characters long.
							</Form.Control.Feedback>
						</InputGroup>
						<Form.Text className="text-muted">
							Password must be 6 characters long.
						</Form.Text>
					</Form.Group>

					<Form.Group>
						<Form.Label className="required">Confirm Password</Form.Label>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>
									<MdCheck />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								required
								minLength={6}
								type="password"
								placeholder="Confirm password"
								value={this.state.passwordConfirmation}
								onChange={(e) => {
									this.setState({ passwordConfirmation: e.target.value });
									this.renderPasswordConfirmationError();
								}}
								isInvalid={
									(!this.state.passwordsMatch && this.state.validated) ||
									(this.state.passwordConfirmation === "" &&
										this.state.validated)
								}
							/>
							<Form.Control.Feedback type="invalid">
								{this.renderPasswordConfirmationError()}
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Button
						block
						variant="primary"
						type="submit"
						disabled={this.state.isLoading}
					>
						{this.state.isLoading ? "Creating Account…" : "Create Account"}
					</Button>
				</Form>
				<RegistrationMessage cardType="existingUser" />
				<div>
					<p>
						<span style={{ color: "red" }}>*</span> = Required
					</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { createUserAccount })(
	CreateAccountForm
);

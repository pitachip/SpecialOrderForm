//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Card from "react-bootstrap/Card";
import { Icon } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { MdCheck, MdLock } from "react-icons/md";
//app components
import AuthMessage from "./authMessage";
//actions
import { upgradeGuestUserAccount } from "../../actions";
//utils
import { matchStrings } from "../../utils/authUtils";
//css
import "./auth-css/auth.css";

class DelayedAccountCreation extends React.Component {
	state = {
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
		passwordConfirmation: "",
		validated: false,
		passwordsMatch: false,
		emailsMatch: false,
		isLoading: false,
	};
	componentDidMount() {
		const { customerInformation } = this.props.orderConfirmationDetails;
		this.setState({
			firstName: customerInformation.firstName,
			lastName: customerInformation.lastName,
			email: customerInformation.email,
			phoneNumber: customerInformation.phoneNumber,
		});
	}

	createAccountButtonClicked = async (e) => {
		const {
			firstName,
			lastName,
			password,
			passwordConfirmation,
			email,
			phoneNumber,
		} = this.state;

		const form = e.currentTarget;
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			passwordsMatch: matchStrings(password, passwordConfirmation),
		});
		this.setState({ validated: true });

		if (matchStrings(password, passwordConfirmation) && form.checkValidity()) {
			this.setState({ isLoading: true });
			await this.props.upgradeGuestUserAccount(
				firstName,
				lastName,
				email,
				password,
				phoneNumber
			);
			if (!this.props.auth.showAuthMessage) {
				this.props.onAuthSuccess();
			} else {
				this.setState({ isLoading: false });
			}
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
			<div className="sticky-top stickyTopOffset">
				<Card>
					<Card.Header>
						<b>Finish Creating Your Account!</b>
					</Card.Header>
					<Card.Body>
						<Card.Title>With one more click you'll get...</Card.Title>
						<Card.Text>
							<li className="benefitsList">
								<Icon name="check" color="green" />
								Special promotions only available to registered users
							</li>
							<li className="benefitsList">
								<Icon name="check" color="green" />
								Faster checkouts
							</li>
							<li className="benefitsList">
								<Icon name="check" color="green" />
								Access to order tracking and faster customer support
							</li>
						</Card.Text>
						<hr />
						<Form
							noValidate
							onSubmit={(e) => this.createAccountButtonClicked(e)}
							validated={this.state.validated}
						>
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
										minLength={6}
										type="password"
										placeholder="Enter password"
										value={this.state.password}
										onChange={(e) =>
											this.setState({ password: e.target.value })
										}
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
								<Form.Label>Confirm Password</Form.Label>
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
							{!this.state.isLoading ? (
								<Button block variant="primary" type="submit">
									Create Account
								</Button>
							) : (
								<Button disabled block>
									<Spinner
										as="span"
										animation="border"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									<span> Creating Account...</span>
								</Button>
							)}
						</Form>
						{this.props.auth.showAuthMessage ? <AuthMessage /> : null}
					</Card.Body>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { upgradeGuestUserAccount })(
	DelayedAccountCreation
);

//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { MdPerson } from "react-icons/md";
//app components
import "./auth-css/auth.css";
import { sendPasswordResetEmail } from "../../actions";
import RegistrationMessage from "./registrationMessage";

class ResetPasswordForm extends React.Component {
	state = { email: "" };

	passwordResetButtonClicked = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({ isLoading: true });
		await this.props.sendPasswordResetEmail(this.state.email);
		this.setState({ isLoading: false });
	};

	render() {
		return (
			<div>
				<Form onSubmit={(e) => this.passwordResetButtonClicked(e)}>
					<Form.Group>
						<Form.Label>Email address</Form.Label>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>
									<MdPerson />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								type="email"
								placeholder="Enter your email address"
								value={this.state.email}
								onChange={(e) => this.setState({ email: e.target.value })}
							/>
						</InputGroup>
					</Form.Group>
					<Form.Row className="loginButtonContainer">
						<Button
							block
							variant="primary"
							type="submit"
							disabled={this.state.isLoading}
						>
							{this.state.isLoading
								? "Sending email…"
								: "Send password reset email"}
						</Button>
					</Form.Row>
				</Form>
				<RegistrationMessage cardType="existingUser" />
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
	sendPasswordResetEmail,
})(ResetPasswordForm);

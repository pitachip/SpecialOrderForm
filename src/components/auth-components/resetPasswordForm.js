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
import {
	setAuthErrorMessage,
	setAuthFormToOpen,
	sendPasswordResetEmail,
} from "../../actions";

class ResetPasswordForm extends React.Component {
	/**
	 * TODO:
	 * 1. Display the success message via dispatch and a component
	 * 2. Show erorr messages
	 * 3. Format error message better in the server
	 * 4. Clear auth errors from signin -> password reset form
	 */
	state = { email: "" };

	passwordResetButtonClicked = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({ isLoading: true });
		await this.props.sendPasswordResetEmail(this.state.email);
		/*
		if (!this.props.auth.showAuthErrorMessage) {
			this.setState({ email: "", password: "" });
			//closes the modal
			this.props.onSuccess();
		} else {
			this.setState({ isLoading: false });
        }
        */
	};

	render() {
		return (
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
	sendPasswordResetEmail,
})(ResetPasswordForm);

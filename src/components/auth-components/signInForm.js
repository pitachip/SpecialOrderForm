//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { MdPerson, MdLock } from "react-icons/md";
//app components
import { signInWithEmailAndPassword, setAuthErrorMessage } from "../../actions";

class SignInForm extends React.Component {
	state = { email: "", password: "" };

	signInButtonClicked = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await this.props.signInWithEmailAndPassword(
			this.state.email,
			this.state.password
		);
		if (!this.props.auth.showAuthErrorMessage) {
			this.setState({ email: "", password: "" });
			//closes the modal
			this.props.onSuccess();
		}
	};

	render() {
		return (
			<Form onSubmit={(e) => this.signInButtonClicked(e)}>
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
							placeholder="falafel@email.com"
							value={this.state.email}
							onChange={(e) => this.setState({ email: e.target.value })}
						/>
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
							type="password"
							placeholder="Your First Pet's Name"
							value={this.state.password}
							onChange={(e) => this.setState({ password: e.target.value })}
						/>
					</InputGroup>
				</Form.Group>
				<Button variant="primary" type="submit">
					Log In
				</Button>
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
	signInWithEmailAndPassword,
	setAuthErrorMessage,
})(SignInForm);

//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { MdPerson, MdLock } from "react-icons/md";
//app components
import { signInWithEmailAndPassword, setAuthErrorMessage } from "../../actions";
import AuthErrorMessage from "../authErrorMessage";

import "../../css/auth.css";

class AuthModal extends React.Component {
	state = { email: "", password: "" };

	closeButtonClicked = () => {
		//Clear out state and error messages
		this.setState({ email: "", password: "" });
		this.props.setAuthErrorMessage("", false);
		this.props.close();
	};
	signInButtonClicked = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await this.props.signInWithEmailAndPassword(
			this.state.email,
			this.state.password
		);
		if (!this.props.auth.showAuthErrorMessage) {
			this.setState({ email: "", password: "" });
			this.props.close();
		}
	};
	render() {
		return (
			<>
				<Modal show={this.props.show} onHide={this.closeButtonClicked}>
					<Modal.Header closeButton>
						<Modal.Title>Sign In to Your Account</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Container>
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
											placeholder="Password"
											value={this.state.password}
											onChange={(e) =>
												this.setState({ password: e.target.value })
											}
										/>
									</InputGroup>
								</Form.Group>
								<Button variant="primary" type="submit">
									Log In
								</Button>
							</Form>
							<AuthErrorMessage />
							<Card>
								<Card.Body className="signUpCardItems">
									New here?{" "}
									<Button className="signUpButton" variant="link">
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
	signInWithEmailAndPassword,
	setAuthErrorMessage,
})(AuthModal);

//libs
import React from "react";
import { auth } from "../apis/firebase";
import { connect } from "react-redux";
//ui components
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
//app components
import { setAuthFormToOpen, authStateChanged } from "../actions";
import AuthModal from "./auth-components/auth-modals/authModal";

class NavBar extends React.Component {
	state = { showModal: false };

	componentDidMount() {
		auth.onIdTokenChanged((user) => {
			if (user) {
				this.props.authStateChanged(user, false);
			} else {
				this.props.authStateChanged(null, false);
			}
		});
	}

	handleAuthModalClose = () => {
		this.setState({ showModal: false });
	};

	handleAuthModalOpen = () => {
		this.props.setAuthFormToOpen("signinForm");
		this.setState({ showModal: true });
	};

	signoutClicked = async () => {
		//TODO: put this in an action and reducer
		await auth.signOut();
		this.setState({ user: null });
	};

	renderLoadingSpinner = () => {
		return (
			<Spinner animation="border" role="status" className="ml-auto">
				<span className="sr-only">Loading...</span>
			</Spinner>
		);
	};

	renderAuthState = () => {
		const { user, metaData } = this.props.auth;
		if (user && metaData) {
			console.log(user.isAnonymous);
			return !user.isAnonymous ? (
				<NavDropdown
					title={
						metaData.firstName !== ""
							? `Hi,  ${metaData.firstName}!`
							: `Hi, guest!`
					}
					className="ml-auto"
					alignRight
				>
					<NavDropdown.Item eventKey="4.1" disabled>
						My Orders (Under Construction)
					</NavDropdown.Item>
					<NavDropdown.Item eventKey="4.2" disabled>
						Profile (Under Construction)
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item eventKey="4.4" onClick={this.signoutClicked}>
						Sign Out
					</NavDropdown.Item>
				</NavDropdown>
			) : (
				<NavDropdown title="Hi, guest!" className="ml-auto" alignRight>
					<NavDropdown.Item eventKey="4.4" onClick={this.signoutClicked}>
						Sign Out
					</NavDropdown.Item>
				</NavDropdown>
			);
		} else {
			return (
				<Button className="ml-auto" onClick={this.handleAuthModalOpen}>
					Log In
				</Button>
			);
		}
	};

	render() {
		const { user, authLoading } = this.props.auth;
		return (
			<Navbar bg="light" fixed="top" sticky="top" className="fluid">
				<Navbar.Brand>
					<img
						src="/assets/logo.png"
						width="50"
						height="50"
						className="d-inline-block align-top"
						alt="Pita Chip Logo"
					/>
				</Navbar.Brand>
				<h3 className="ml-auto">Pita Chip Special Orders</h3>
				{!user && authLoading
					? this.renderLoadingSpinner()
					: this.renderAuthState()}
				<AuthModal
					show={this.state.showModal}
					close={this.handleAuthModalClose}
					onSuccess={this.handleAuthModalClose}
				/>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, {
	setAuthFormToOpen,
	authStateChanged,
})(NavBar);

//libs
import React from "react";
import { auth } from "../apis/firebase";
//ui components
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

class NavBar extends React.Component {
	state = { user: null, authLoading: true };
	componentDidMount() {
		auth.signInWithEmailAndPassword("customer1@gmail.com", "customer1");
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
			} else {
				this.setState({ authLoading: false });
			}
		});
	}

	signoutClicked = async () => {
		console.log("sign out clicked");
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
		if (this.state.user) {
			return (
				<NavDropdown
					title="Hi {User}!"
					id="nav-dropdown"
					className="ml-auto"
					alignRight
				>
					<NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
					<NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
					<NavDropdown.Item eventKey="4.3">
						Something else here
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item eventKey="4.4" onClick={this.signoutClicked}>
						Sign Out
					</NavDropdown.Item>
				</NavDropdown>
			);
		} else {
			return (
				<Button size="sm" className="ml-auto">
					Log In
				</Button>
			);
		}
	};

	render() {
		return (
			<Navbar bg="light" fixed="top" sticky="top" className="fluid">
				<Navbar.Brand>
					<img
						src="./assets/logo.png"
						width="50"
						height="50"
						className="d-inline-block align-top"
						alt="Pita Chip Logo"
					/>
					Pita Chip Special Orders
				</Navbar.Brand>
				{!this.state.user && this.state.authLoading
					? this.renderLoadingSpinner()
					: this.renderAuthState()}
			</Navbar>
		);
	}
}

export default NavBar;

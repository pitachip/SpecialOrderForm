import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

class NavBar extends React.Component {
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
					<NavDropdown.Item eventKey="4.4">Sign Out</NavDropdown.Item>
				</NavDropdown>
			</Navbar>
		);
	}
}

export default NavBar;

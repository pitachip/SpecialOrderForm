//libs
import React from "react";
//ui components
import Navbar from "react-bootstrap/Navbar";
import { Label } from "semantic-ui-react";
//css
import "../App.css";

class AppFooter extends React.Component {
	render() {
		return (
			<Navbar expand="lg" variant="light" bg="light" className="footer">
				<Navbar.Brand
					href="https://www.linkedin.com/in/rend-alsaadi/"
					className="mx-auto order-0"
					target="_blank"
				>
					<p className="text-muted">Developed By Rend Alsaadi</p>
				</Navbar.Brand>
				<div>
					<Label size="tiny">v1.3</Label>
				</div>
			</Navbar>
		);
	}
}

export default AppFooter;

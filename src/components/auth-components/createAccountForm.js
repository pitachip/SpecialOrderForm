//libs
import React from "react";
import { connect } from "react-redux";
//ui libs
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class CreateAccountForm extends React.Component {
	render() {
		return (
			<Form>
				<Form.Row>
					<Col>
						<Form.Control placeholder="First name" />
					</Col>
					<Col>
						<Form.Control placeholder="Last name" />
					</Col>
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

export default connect(mapStateToProps, {})(CreateAccountForm);

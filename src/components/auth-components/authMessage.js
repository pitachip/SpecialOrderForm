//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Alert from "react-bootstrap/Alert";

class AuthMessage extends React.Component {
	render() {
		return (
			<Alert variant={this.props.auth.authMessageVariant}>
				{this.props.auth.authMessage}
			</Alert>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, {})(AuthMessage);

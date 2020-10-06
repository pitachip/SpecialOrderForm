//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Alert from "react-bootstrap/Alert";
//app components
import { setAuthErrorMessage } from "../../actions";

class AuthAlertMessage extends React.Component {
	render() {
		return (
			<Alert show={this.props.auth.showAuthErrorMessage} variant="danger">
				{this.props.auth.errorMessage}
			</Alert>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { setAuthErrorMessage })(
	AuthAlertMessage
);

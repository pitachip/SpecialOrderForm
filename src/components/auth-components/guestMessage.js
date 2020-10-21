//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Button from "react-bootstrap/Button";
//actions
import { signInGuestUser } from "../../actions";

class GuestMessage extends React.Component {
	continueAsGuestClicked = async () => {
		await this.props.signInGuestUser();
		if (this.props.auth.user) {
			//call a success function
			//history.push("/checkout/details");
			this.props.onAuthSuccess();
		}
	};
	render() {
		return (
			<>
				<Button variant="link" onClick={this.continueAsGuestClicked}>
					Continue as guest
				</Button>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { signInGuestUser })(GuestMessage);

//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//actions
import { signInGuestUser } from "../../actions";

class GuestMessage extends React.Component {
	state = { isLoading: false };
	continueAsGuestClicked = async () => {
		this.setState({ isLoading: true });
		await this.props.signInGuestUser();
		if (this.props.auth.user) {
			this.setState({ isLoading: false });
			this.props.onAuthSuccess();
		}
	};
	render() {
		return (
			<>
				{!this.state.isLoading ? (
					<Button
						variant="link"
						size="sm"
						onClick={this.continueAsGuestClicked}
					>
						Continue as guest
					</Button>
				) : (
					<Button variant="link" disabled size="sm">
						<Spinner
							as="span"
							animation="border"
							size="sm"
							role="status"
							aria-hidden="true"
						/>
						<span> Creating Guest Account...</span>
					</Button>
				)}
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

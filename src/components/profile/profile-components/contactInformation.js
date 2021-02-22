//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import { Card, Grid, Button, Form, Loader } from "semantic-ui-react";
//app components
import UpdatePasswordModal from "../profile-modals/updatePasswordModal";
//actions
import { updateUserMetaData } from "../../../actions";

class ContactInformation extends React.Component {
	state = {
		disabled: true,
		saving: false,
		firstName: "",
		lastName: "",
		email: "",
		showUpdatePasswordModal: false,
	};

	componentDidMount = () => {
		const { user } = this.props;
		if (user) {
			const { firstName, lastName } = this.props.metaData;
			const { email } = user || "";
			this.setState({ firstName: firstName, lastName: lastName, email: email });
		}
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { metaData, user } = this.props;
		if (metaData !== prevProps.metaData) {
			const { firstName, lastName } = this.props.metaData;
			const { email } = user || "";
			this.setState({ firstName: firstName, lastName: lastName, email: email });
		}
	};

	editButtonClicked = () => {
		this.setState({ disabled: false });
	};

	saveButtonClicked = async () => {
		this.setState({ saving: true, disabled: true });
		await this.props.updateUserMetaData(
			this.state.firstName,
			this.state.lastName
		);
		this.setState({ saving: false });
	};

	updatePasswordButtonClicked = () => {
		this.setState({ showUpdatePasswordModal: true });
	};

	updatePasswordModalClosed = () => {
		this.setState({ showUpdatePasswordModal: false });
	};

	renderButton = () => {
		const { disabled, saving } = this.state;
		if (disabled && !saving) {
			return (
				<Button
					basic
					color="blue"
					className="changeButton"
					onClick={this.editButtonClicked}
				>
					Edit
				</Button>
			);
		} else if (!disabled && !saving) {
			return (
				<Button
					basic
					color="blue"
					className="changeButton"
					onClick={this.saveButtonClicked}
				>
					Save
				</Button>
			);
		} else if (disabled && saving) {
			return <Loader active inline size="small" />;
		}
	};
	render() {
		const {
			disabled,
			firstName,
			lastName,
			email,
			showUpdatePasswordModal,
		} = this.state;

		return (
			<>
				<Card fluid>
					<Card.Content>
						<Card.Header>
							<Grid columns={2}>
								<Grid.Column>Contact & Login Information</Grid.Column>
								<Grid.Column textAlign="right">
									{this.renderButton()}
								</Grid.Column>
							</Grid>
						</Card.Header>
					</Card.Content>
					<Card.Content>
						<Form>
							<Grid container columns={2}>
								<Grid.Column>
									<Form.Input label="Username" value={email} disabled />
									<label className="ui form field ">Password</label>
									<br />
									<Button
										basic
										color="blue"
										className="changeButton"
										onClick={() => this.updatePasswordButtonClicked()}
									>
										Update Password
									</Button>
								</Grid.Column>
								<Grid.Column>
									<Form.Input
										label="First Name"
										value={firstName}
										disabled={disabled}
										onChange={(e) =>
											this.setState({ firstName: e.target.value })
										}
									/>
									<Form.Input
										label="Last Name"
										value={lastName}
										disabled={disabled}
										onChange={(e) =>
											this.setState({ lastName: e.target.value })
										}
									/>
								</Grid.Column>
							</Grid>
						</Form>
					</Card.Content>
				</Card>
				<UpdatePasswordModal
					show={showUpdatePasswordModal}
					close={this.updatePasswordModalClosed}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		metaData: state.auth.metaData,
	};
};

export default connect(mapStateToProps, { updateUserMetaData })(
	ContactInformation
);

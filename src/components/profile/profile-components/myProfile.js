//libs
import React from "react";
//ui components
import { Grid } from "semantic-ui-react";
//app components
import ContactInformation from "./contactInformation";

class MyProfile extends React.Component {
	render() {
		return (
			<Grid container>
				<Grid.Row columns={1}>
					<Grid.Column>
						<h2>My Account</h2>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={1}>
					<Grid.Column>
						<ContactInformation />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default MyProfile;

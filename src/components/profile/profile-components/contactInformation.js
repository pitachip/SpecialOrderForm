//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import { Card, Grid, Button } from "semantic-ui-react";

class ContactInformation extends React.Component {
	render() {
		return (
			<Card fluid>
				<Card.Content>
					<Card.Header>
						<Grid columns={2}>
							<Grid.Column>Contact & Login Information</Grid.Column>
							<Grid.Column textAlign="right">
								<Button basic color="blue" className="changeButton">
									Edit
								</Button>
							</Grid.Column>
						</Grid>
					</Card.Header>
				</Card.Content>
				<Card.Content>
					<Grid container columns={2}>
						<Grid.Column>
							<Grid.Row>
								<b>Username: </b> rend@gmail.com
							</Grid.Row>
							<Grid.Row>
								<b>Password: </b> ******
							</Grid.Row>
						</Grid.Column>
						<Grid.Column>
							<Grid.Row>
								<b>First Name: </b> Rend
							</Grid.Row>
							<Grid.Row>
								<b>Last Name: </b> Alsaadi
							</Grid.Row>
							<Grid.Row>
								<b>Phone Number: </b> 215-253-9255
							</Grid.Row>
						</Grid.Column>
					</Grid>
				</Card.Content>
			</Card>
		);
	}
}

/**
 * 						<Grid.Column>
							<Grid.Row>
								<b>Email: </b> rend@gmail.com
							</Grid.Row>
							<Grid.Row>
								<b>Password: </b> ******
							</Grid.Row>
						</Grid.Column>
						<Grid.Column>
							<Grid.Row columns={2} divided>
								<Grid.Column width={8}>
									<b>First Name: </b> Rend
								</Grid.Column>
								<Grid.Column width={8}>
									<b>Last Name: </b> Alsaadi
								</Grid.Column>
							</Grid.Row>
						</Grid.Column>
 * 
 */

/**
  * 						<Grid.Row columns="equal" centered>
							<Grid.Column>
								<Grid.Row>
									<b>Email: </b> rend@gmail.com
								</Grid.Row>
								<Grid.Row>
									<b>Password: </b> ******
								</Grid.Row>
							</Grid.Column>
							<Grid.Column>
								<Grid.Row centered>
									<Grid.Column width={8}>Test</Grid.Column>
									<Grid.Column>Two</Grid.Column>
								</Grid.Row>
							</Grid.Column>
						</Grid.Row>
  */

export default ContactInformation;

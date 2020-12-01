//libs
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//ui components
import Container from "react-bootstrap/Container";
import { Grid } from "semantic-ui-react";
//app components
import OrderConfirmation from "../confirmation/confirmation-components/orderConfirmation";
import CheckoutProgressBar from "./checkoutProgressBar";
import DelayedAccountCreation from "../auth-components/delayedAccountCreation";
import ConfirmationNextSteps from "../confirmation/confirmation-components/confirmationNextSteps";
//utils
import { history } from "../../utils/history";
//css
import "./checkout-css/checkoutDetails.css";

class ConfirmationDetails extends React.Component {
	guestAccountUpgraded = () => {
		history.push("/order");
	};
	render() {
		const progressBar = [
			{
				icon: "food",
				title: "Order",
				completed: true,
				disabled: false,
				active: false,
				description: null,
			},
			{
				icon: "info",
				title: "Contact",
				completed: true,
				disabled: false,
				active: false,
				description: "Enter your contact information",
			},
			{
				icon: "payment",
				title: "Payment",
				completed: true,
				disabled: false,
				active: false,
				description: "Enter your payment details and submit order",
			},
			{
				icon: "flag checkered",
				title: "Confirmation",
				completed: false,
				disabled: false,
				active: true,
				description: "Review your submitted order",
			},
		];
		const { data } = this.props.location.state.orderConfirmation;
		const { user } = this.props.auth;
		return (
			<Container className="checkoutDetailsContainer">
				<Grid>
					<Grid.Row>
						<CheckoutProgressBar progressBarData={progressBar} />
					</Grid.Row>
					<Grid.Row columns={2}>
						<Grid.Column width={10}>
							<OrderConfirmation orderConfirmationDetails={data} />
						</Grid.Column>
						<Grid.Column width={6}>
							{!user ? (
								<DelayedAccountCreation
									orderConfirmationDetails={data}
									onAuthSuccess={this.guestAccountUpgraded}
								/>
							) : (
								<ConfirmationNextSteps />
							)}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, {})(withRouter(ConfirmationDetails));

//libs
import React from "react";
import { connect } from "react-redux";
import { persistor } from "../../../store";
import { reset, getFormValues } from "redux-form";
//ui components
import { Card, Icon, Grid, Divider } from "semantic-ui-react";
//app components
import ConfirmationDeliveryDetails from "./confirmationDeliveryDetails";
//css
import "../confirmation-css/orderConfirmation.css";

class OrderConfirmation extends React.Component {
	state = { order: null };
	componentDidMount = async () => {
		const { order, customerInformation, paymentInformation } = this.props;

		/**
		 * Save these values so that we can display them in the
		 * confirmation page
		 */
		this.setState({
			order: order,
			customerInformation: customerInformation,
			paymentInformation: paymentInformation,
		});

		/**
		 * Clear out the redux persist values and the redux form values
		 */
		await persistor.purge();
		this.props.reset("checkoutContactForm");
		this.props.reset("paymentInformationForm");
	};
	render() {
		return (
			<Card fluid color="green">
				<Card.Content>
					<Card.Header>
						<Grid className="rowPadding">
							<Grid.Row textAlign="center">
								<Grid.Column>
									<Icon name="check circle outline" color="green" size="big" />
								</Grid.Column>
							</Grid.Row>
							<Grid.Row textAlign="center">
								<Grid.Column>We've recieved your order!</Grid.Column>
							</Grid.Row>
							<Grid.Row textAlign="center">
								<Grid.Column>Order# 1001</Grid.Column>
							</Grid.Row>
							<Grid.Row textAlign="center">
								<Grid.Column>
									<p className="emailConfirmation">
										A copy of your order confirmation has been sent to
										alsaadirend@gmail.com
									</p>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Card.Header>
					<Divider />
					<ConfirmationDeliveryDetails />
					<Divider />
				</Card.Content>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		order: state.order,
		customerInformation: getFormValues("checkoutContactForm")(state),
		paymentInformation: getFormValues("paymentInformationForm")(state),
	};
};

export default connect(mapStateToProps, { reset })(OrderConfirmation);

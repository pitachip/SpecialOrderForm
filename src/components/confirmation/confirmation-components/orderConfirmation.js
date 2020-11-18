//libs
import React from "react";
import { connect } from "react-redux";
import { persistor } from "../../../store";
import { reset, getFormValues } from "redux-form";
//ui components
import { Card, Icon, Grid, Divider } from "semantic-ui-react";
//app components
import ConfirmationDeliveryDetails from "./confirmationDeliveryDetails";
import ConfirmationOrderDetails from "./confirmationOrderDetails";
import ConfirmationOrderTotals from "./confirmationOrderTotals";
//css
import "../confirmation-css/orderConfirmation.css";

class OrderConfirmation extends React.Component {
	state = { order: null, orderItems: [] };
	componentDidMount = async () => {
		const orderItems = [
			{
				menuItem: "Build Your Own",
				basePrice: 1300,
				quantity: 6,
				specialInstructions: "Special instructions for byo",
				modifiers: [
					{
						modifierId: "5fb37ae6b92c4aa069458c41",
						modifierName: "Choose Your Protein",
						modifierChoices: [
							{
								name: "Chicken Shawarma (Popular)",
								modifierChoiceId: "5fb37ae6b92c4aa069458c42",
							},
							{
								name: "Falafel (Popular)",
								modifierChoiceId: "5fb37ae6b92c4aa069458c43",
							},
						],
					},
					{
						modifierId: "5fb37ae6b92c4aa069458c46",
						modifierName: "Choose Your Hummus",
						modifierChoices: [
							{
								name: "Original Hummus",
								modifierChoiceId: "5fb37ae6b92c4aa069458c47",
							},
						],
					},
					{
						modifierId: "5fb37ae6b92c4aa069458c49",
						modifierName: "Choose Your Toppings",
						modifierChoices: [
							{
								name: "Tomato & Cucumber Salad (Popular)",
								modifierChoiceId: "5fb37ae6b92c4aa069458c4a",
							},
							{
								name: "Sliced Cucumbers",
								modifierChoiceId: "5fb37ae6b92c4aa069458c4f",
							},
						],
					},
					{
						modifierId: "5fb37ae6b92c4aa069458c52",
						modifierName: "Choose Your Sauces",
						modifierChoices: [
							{
								name: "Garlic Sauce (Popular)",
								modifierChoiceId: "5fb37ae6b92c4aa069458c53",
							},
							{
								name: "Original Tahini Sauce (Popular)",
								modifierChoiceId: "5fb37ae6b92c4aa069458c54",
							},
						],
					},
					{
						modifierId: "5fb37ae6b92c4aa069458c5a",
						modifierName: "Extra Protein",
						modifierChoices: [
							{
								name: "Extra Chicken Shawarma",
								modifierChoiceId: "5fb37ae6b92c4aa069458c5b",
							},
						],
					},
					{
						modifierId: "5fb37ae6b92c4aa069458c5f",
						modifierName: "My Group Includes...",
						modifierChoices: [
							{
								name: "0 Vegetarians",
								modifierChoiceId: "5fb37ae6b92c4aa069458c60",
							},
						],
					},
					{
						modifierId: "5fb37ae6b92c4aa069458c65",
						modifierName: "Include Utencils, Napkins, Plates, etc?",
						modifierChoices: [
							{
								name: "No",
								modifierChoiceId: "5fb37ae6b92c4aa069458c67",
							},
						],
					},
				],
				uniqueId: "13d6cb4e-bf81-40d4-b63b-0137e5e8b3ba",
				originalSelectionFormat: {},
				originalMenuItem: {},
			},
			{
				menuItem: "Chicken Shawarma Box",
				basePrice: 1300,
				specialInstructions: "Special instructions for lunch box",
				quantity: 5,
				modifiers: [],
				uniqueId: "16caef27-36a3-4c90-b98c-8e8012fcb179",
				originalSelectionFormat: {},
				originalMenuItem: {},
			},
		];

		const { order, customerInformation, paymentInformation } = this.props;

		/**
		 * Save these values so that we can display them in the
		 * confirmation page
		 */
		this.setState({
			order: order,
			customerInformation: customerInformation,
			paymentInformation: paymentInformation,
			orderItems: orderItems,
		});

		console.log(this.props);

		/**
		 * Clear out the redux persist values and the redux form values
		 */
		await persistor.purge();
		this.props.reset("checkoutContactForm");
		this.props.reset("paymentInformationForm");
	};
	render() {
		return (
			<Card fluid color="green" centered className="confirmationCard">
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
					<ConfirmationOrderDetails orderDetails={this.state.orderItems} />
					<ConfirmationOrderTotals />
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

/**
 * order:
orderDetails: {shippingMethod: "delivery", orderDate: "2020-11-18T06:48:41.667Z", location: "", specialInstructions: ""}
orderItems: (2) [{…}, {…}]
totals: {subTotal: 143, tax: 11.44, total: 179.44, delivery: 25}
 */

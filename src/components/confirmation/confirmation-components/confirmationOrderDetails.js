//libs
import React from "react";
//ui components
import { Grid, Header, Accordion, Icon } from "semantic-ui-react";
//css
import "../confirmation-css/orderConfirmation.css";

class ConfirmationOrderDetails extends React.Component {
	state = { activeIndex: null };
	handleModifierAccordionClick = (e, accordion) => {
		const newIndex =
			this.state.activeIndex === accordion.index ? null : accordion.index;
		this.setState({ activeIndex: newIndex });
	};
	//TODO: Figure out how to remove comma off end of last item
	renderModifierChoices = (modifierChoices) => {
		let choices = "";
		modifierChoices.map((modifierChoice) => {
			choices = choices + modifierChoice.name + ", ";
		});
		return choices;
	};
	renderOrderModifiers = (modifiers, uniqueId) => {
		return (
			<Accordion fluid>
				<Accordion.Title
					active={this.state.activeIndex === uniqueId}
					index={uniqueId}
					onClick={(e, index) => this.handleModifierAccordionClick(e, index)}
				>
					<Icon name="dropdown" />
					Details
				</Accordion.Title>
				<Accordion.Content active={this.state.activeIndex === uniqueId}>
					<ul>
						{modifiers.map((modifier) => {
							return (
								<li>
									{modifier.modifierName}:{" "}
									{this.renderModifierChoices(modifier.modifierChoices)}
								</li>
							);
						})}
					</ul>
				</Accordion.Content>
			</Accordion>
		);
	};
	renderOrderItems = (orderItems) => {
		return orderItems.map((orderItem) => {
			return (
				<>
					<Grid.Row
						key={orderItem.uniqueId}
						className="confirmationOrderDetailsRow"
					>
						<Grid.Column width={1}>
							<p>{orderItem.quantity}x</p>
						</Grid.Column>
						<Grid.Column width={3}>
							<p>{orderItem.menuItem}</p>
						</Grid.Column>
						<Grid.Column width={2}>
							<p>${orderItem.basePrice / 100}/pp</p>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row className="confirmationOrderDetailsRow">
						<p>Special Instructions: {orderItem.specialInstructions}</p>
					</Grid.Row>
					<Grid.Row className="confirmationOrderDetailsRow">
						{this.renderOrderModifiers(orderItem.modifiers, orderItem.uniqueId)}
					</Grid.Row>
				</>
			);
		});
	};
	render() {
		const { orderDetails } = this.props;
		return (
			<Grid container>
				<Grid.Row className="confirmationDeliveryDetailsRow">
					<Header as="h3">Order Details</Header>
				</Grid.Row>
				{this.renderOrderItems(orderDetails)}
			</Grid>
		);
	}
}

export default ConfirmationOrderDetails;

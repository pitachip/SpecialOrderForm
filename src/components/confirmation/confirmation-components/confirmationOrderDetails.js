//libs
import React from "react";
//ui components
import { Grid, Header, Accordion, Icon, Table } from "semantic-ui-react";
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
			return (choices = choices + modifierChoice.name + ", ");
		});
		return choices;
	};
	renderOrderModifiers = (modifiers, index) => {
		return (
			<Accordion fluid>
				<Accordion.Title
					active={this.state.activeIndex === index}
					index={index}
					onClick={(e, index) => this.handleModifierAccordionClick(e, index)}
				>
					<Icon name="dropdown" />
					Details
				</Accordion.Title>
				<Accordion.Content active={this.state.activeIndex === index}>
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
		return orderItems.map((orderItem, index) => {
			return (
				<Table.Row>
					<Table.Cell>
						{orderItem.quantity}x &nbsp; {orderItem.menuItem}
						{this.renderOrderModifiers(orderItem.modifiers, index)}
					</Table.Cell>
					<Table.Cell>{orderItem.specialInstructions}</Table.Cell>
					<Table.Cell>${orderItem.basePrice / 100}</Table.Cell>
				</Table.Row>
			);
		});
	};
	render() {
		const { orderItems, specialInstructions } = this.props;
		return (
			<>
				<Grid container>
					<Grid.Row className="confirmationDeliveryDetailsRow">
						<Header as="h3">Order Details</Header>
					</Grid.Row>
				</Grid>
				<Table striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Item</Table.HeaderCell>
							<Table.HeaderCell>Special Instructions</Table.HeaderCell>
							<Table.HeaderCell>Price Per Person</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{this.renderOrderItems(orderItems)}</Table.Body>
					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell colSpan="3">
								<p>
									<b>Overall Order Notes:</b>
								</p>
								<p>{specialInstructions}</p>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</>
		);
	}
}

export default ConfirmationOrderDetails;

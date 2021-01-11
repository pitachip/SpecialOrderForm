//libs
import React from "react";
import { connect } from "react-redux";
import each from "lodash/each";
//ui components
import { Table, Button, Icon, Accordion } from "semantic-ui-react";
//app components
import UpdateShoppingCartItemModal from "./menu/menu-modals/updateShoppingCartItemModal";
import DeleteShoppingCartItemModal from "./menu/menu-modals/deleteShoppingCartItemModal";
//css
import "../css/shoppingCartItem.css";

class ShoppingCartItem extends React.Component {
	state = {
		showUpdateModal: false,
		showDeleteModal: false,
		editOrderItem: false,
		activeIndex: null,
	};

	//TODO: Can probably combine the two below by passing in the state you want to update
	handleMenuItemDetailModalClose = () => {
		this.setState({ showUpdateModal: false });
	};

	handleDeleteShoppingCartItemModalClose = () => {
		this.setState({ showDeleteModal: false });
	};

	handleModifierAccordionClick = (e, accordion) => {
		const newIndex =
			this.state.activeIndex === accordion.index ? null : accordion.index;
		this.setState({ activeIndex: newIndex });
	};

	renderDeleteShoppingCartItemModal = (orderItem) => {
		return this.state.showDeleteModal ? (
			<DeleteShoppingCartItemModal
				show={this.state.showDeleteModal}
				close={this.handleDeleteShoppingCartItemModalClose}
				orderItemToDelete={orderItem}
			/>
		) : null;
	};

	renderUpdateShoppingCartItemModal = (orderItem) => {
		return this.state.showUpdateModal ? (
			<UpdateShoppingCartItemModal
				show={this.state.showUpdateModal}
				close={this.handleMenuItemDetailModalClose}
				editOrderItem={true}
				orderItemToEdit={orderItem}
			/>
		) : null;
	};

	renderModifierChoices = (modifierChoices) => {
		let choices = "";
		modifierChoices.map((modifierChoice) => {
			return (choices = choices + modifierChoice.name + ", ");
		});
		return choices;
	};

	renderOrderModifiers = (modifiers, index, specialInsructions) => {
		return (
			<Accordion>
				<Accordion.Title
					active={this.state.activeIndex === index}
					index={index}
					onClick={(e, index) => this.handleModifierAccordionClick(e, index)}
				>
					<Icon name="dropdown" />
					Details
				</Accordion.Title>
				<Accordion.Content active={this.state.activeIndex === index}>
					<div>
						<ul>
							{modifiers.map((modifier) => {
								return (
									<li>
										<b>{modifier.modifierName}</b>:{" "}
										{this.renderModifierChoices(modifier.modifierChoices)}
									</li>
								);
							})}
						</ul>
						<p>Special Instructions: {specialInsructions}</p>
					</div>
				</Accordion.Content>
			</Accordion>
		);
	};

	renderCalculatedPrice = (orderItem) => {
		let modifierTotal = 0;
		each(orderItem.modifiers, (modifier) => {
			each(modifier.modifierChoices, (modifierChoice) => {
				modifierTotal = modifierTotal + modifierChoice.price;
			});
		});
		return ((orderItem.basePrice + modifierTotal) / 100) * orderItem.quantity;
	};

	render() {
		const { orderItem, index } = this.props;
		return (
			<>
				<Table.Row>
					<Table.Cell verticalAlign="middle">
						{orderItem.quantity}x {orderItem.name}
						{this.renderOrderModifiers(
							orderItem.modifiers,
							index,
							orderItem.specialInstructions
						)}
					</Table.Cell>
					<Table.Cell verticalAlign="top">
						${this.renderCalculatedPrice(orderItem)}
					</Table.Cell>
					<Table.Cell verticalAlign="top" textAlign="right">
						<Button
							compact
							icon
							onClick={() => {
								this.setState({ showUpdateModal: true, editOrderItem: true });
							}}
						>
							<Icon name="edit" />
						</Button>
						<Button
							compact
							icon
							onClick={() => {
								this.setState({ showDeleteModal: true });
							}}
						>
							<Icon name="delete" />
						</Button>
					</Table.Cell>
				</Table.Row>
				<Table.Row></Table.Row>
				{this.renderUpdateShoppingCartItemModal(orderItem)}
				{this.renderDeleteShoppingCartItemModal(orderItem)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderDetails: state.order.orderDetails,
	};
};

export default connect(mapStateToProps, {})(ShoppingCartItem);

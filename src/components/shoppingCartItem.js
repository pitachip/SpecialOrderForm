//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { MdCreate, MdDelete } from "react-icons/md";
//app components
import UpdateShoppingCartItemModal from "./modals/updateShoppingCartItemModal";
import DeleteShoppingCartItemModal from "./modals/deleteShoppingCartItemModal";

import "../css/shoppingCartItem.css";

class ShoppingCartItem extends React.Component {
	state = {
		showUpdateModal: false,
		showDeleteModal: false,
		editOrderItem: false,
	};

	//TODO: Can probably combine the two below by passing in the state you want to update
	handleMenuItemDetailModalClose = () => {
		this.setState({ showUpdateModal: false });
	};

	handleDeleteShoppingCartItemModalClose = () => {
		this.setState({ showDeleteModal: false });
	};

	renderDeleteShoppingCartItemModal = () => {
		return this.state.showDeleteModal ? (
			<DeleteShoppingCartItemModal
				show={this.state.showDeleteModal}
				close={this.handleDeleteShoppingCartItemModalClose}
				orderItemToDelete={this.props.item}
			/>
		) : null;
	};

	renderUpdateShoppingCartItemModal = () => {
		return this.state.showUpdateModal ? (
			<UpdateShoppingCartItemModal
				show={this.state.showUpdateModal}
				close={this.handleMenuItemDetailModalClose}
				editOrderItem={true}
				orderItemToEdit={this.props.item}
			/>
		) : null;
	};

	renderCalculatedPrice = () => {
		return (this.props.item.basePrice / 100) * this.props.item.quantity;
	};

	renderDeleteButton = (key) => {
		return (
			<Button
				variant="link"
				value={key}
				onClick={() => {
					this.setState({ showDeleteModal: true });
				}}
			>
				<MdDelete />
			</Button>
		);
	};

	renderEditButton = (key) => {
		return (
			<Button
				variant="link"
				value={key}
				onClick={() => {
					this.setState({ showUpdateModal: true, editOrderItem: true });
				}}
			>
				<MdCreate />
			</Button>
		);
	};

	renderOrderItemSpecialInstructions = () => {
		return <p>Special Instructions: {this.props.item.specialInstructions}</p>;
	};

	renderOrderItemDetails = () => {
		return this.props.item.modifiers.map((modifier) => {
			return (
				<div key={modifier.modifierId}>
					<p>
						{modifier.modifierName}:{" "}
						{modifier.modifierChoices.map((choice) => {
							return "" + choice.name + ", ";
						})}
					</p>
				</div>
			);
		});
	};
	render() {
		return (
			<>
				<Row>
					<Col md={8}>
						<p>
							{this.props.item.quantity}x {this.props.item.menuItem}
						</p>
					</Col>
					<Col md={4} className="shoppingCartItemPrice">
						<p>${this.renderCalculatedPrice()}</p>
					</Col>
					<Col>
						{this.renderEditButton(this.props.item.uniqueId)}
						{this.renderDeleteButton(this.props.item.uniqueId)}
					</Col>
				</Row>
				<Row>
					<Accordion>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							Details
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								{this.renderOrderItemDetails()}
								{this.renderOrderItemSpecialInstructions()}
							</Card.Body>
						</Accordion.Collapse>
					</Accordion>
				</Row>
				{this.renderUpdateShoppingCartItemModal()}
				{this.renderDeleteShoppingCartItemModal()}
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

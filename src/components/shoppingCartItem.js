//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { MdCreate } from "react-icons/md";
//app components
import UpdateShoppingCartItemModal from "./modals/updateShoppingCartItemModal";

import "../css/shoppingCartItem.css";

class ShoppingCartItem extends React.Component {
	state = { price: 0, showModal: false, editOrderItem: false };

	//TODO: I feel like calculating the price can go into the utils
	componentDidMount() {
		const calculatedPrice =
			(this.props.item.basePrice / 100) * this.props.item.quantity;
		this.setState({ price: calculatedPrice });
	}

	handleMenuItemDetailModalClose = () => {
		this.setState({ showModal: false });
	};

	renderUpdateShoppingCartItemModal = () => {
		return this.state.showModal ? (
			<UpdateShoppingCartItemModal
				show={this.state.showModal}
				close={this.handleMenuItemDetailModalClose}
				editOrderItem={true}
				orderItemToEdit={this.props.item}
			/>
		) : null;
	};

	renderEditButton = (key) => {
		return (
			<Button
				variant="link"
				value={key}
				onClick={() => {
					this.setState({ showModal: true, editOrderItem: true });
				}}
			>
				{key}
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
					<p>{this.props.item.specialInstructions}</p>
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
						<p>${this.state.price}</p>
					</Col>
					<Col>{this.renderEditButton(this.props.item.uniqueId)}</Col>
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

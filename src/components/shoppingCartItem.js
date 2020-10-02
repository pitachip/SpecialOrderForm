//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import "../css/shoppingCartItem.css";

class ShoppingCartItem extends React.Component {
	state = { price: 0 };

	componentDidMount() {
		const calculatedPrice =
			(this.props.item.basePrice / 100) * this.props.item.quantity;
		this.setState({ price: calculatedPrice });
	}

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

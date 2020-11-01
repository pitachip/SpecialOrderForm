//libs
import React from "react";
import { connect } from "react-redux";
import each from "lodash/each";
import NumberFormat from "react-number-format";
//ui components
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//css
import "./checkout-css/checkoutDetails.css";

/**
 * TODO: I will def need to refactor this and the shopping cart
 * I think there is a lot of code duplication for something that
 * has basically the same functionality.
 */
class OrderSummary extends React.Component {
	getNumberOfItemsOrdered = () => {
		let numberOfItemsOrdered = 0;

		each(this.props.orderItems, (orderItem) => {
			numberOfItemsOrdered = numberOfItemsOrdered + orderItem.quantity;
		});

		return numberOfItemsOrdered;
	};

	renderCalculatedPrice = (orderItem) => {
		return (orderItem.basePrice / 100) * orderItem.quantity;
	};

	renderOrderDate = () => {
		let formattedDate = "";
		let formatOptions = {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		if (this.props.orderDetails.orderDate !== "") {
			formattedDate = new Date(
				this.props.orderDetails.orderDate
			).toLocaleDateString("en-US", formatOptions);
		}
		return (
			<>
				<Row>
					<Col md={4}>
						<p>Order Date</p>
					</Col>
					<Col md={8} className="shoppingCartItemPrice">
						<p>{formattedDate}</p>
					</Col>
				</Row>
			</>
		);
	};

	renderShoppingCartTotals = (totals) => {
		return (
			<>
				<Row>
					<Col md={8}>
						<p>Subtotal</p>
					</Col>
					<Col md={4} className="shoppingCartTotalPrice">
						<p>
							<NumberFormat
								value={this.props.totals.subTotal}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"$"}
								decimalScale={2}
								fixedDecimalScale="true"
							/>
						</p>
					</Col>
				</Row>
				<Row>
					<Col md={8}>
						<p>Tax</p>
					</Col>
					<Col md={4} className="shoppingCartTotalPrice">
						<p>
							<NumberFormat
								value={this.props.totals.tax}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"$"}
								decimalScale={2}
								fixedDecimalScale="true"
							/>
						</p>
					</Col>
				</Row>
				<Row>
					{totals.delivery > 0 ? (
						<>
							<Col md={8}>
								<p>Delivery</p>
							</Col>
							<Col md={4} className="shoppingCartTotalPrice">
								<p>
									<NumberFormat
										value={this.props.totals.delivery}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"$"}
										decimalScale={2}
										fixedDecimalScale="true"
									/>
								</p>
							</Col>
						</>
					) : null}
				</Row>
				<Row>
					<Col md={8}>
						<p>Total</p>
					</Col>
					<Col md={4} className="shoppingCartTotalPrice">
						<p>
							<NumberFormat
								value={this.props.totals.total}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"$"}
								decimalScale={2}
								fixedDecimalScale="true"
							/>
						</p>
					</Col>
				</Row>
			</>
		);
	};

	renderShoppingCartItems = () => {
		return this.props.orderItems.map((orderItem) => {
			return (
				<>
					<Row>
						<Col md={8}>
							<p>
								{orderItem.quantity}x {orderItem.menuItem}
							</p>
						</Col>
						<Col md={4} className="shoppingCartItemPrice">
							<p>${this.renderCalculatedPrice(orderItem)}</p>
						</Col>
					</Row>
				</>
			);
		});
	};

	render() {
		return (
			<div className="sticky-top orderSummaryOffset">
				<Card>
					<Card.Header>
						My Order: {this.getNumberOfItemsOrdered()} Items
					</Card.Header>
					<Card.Body>
						{this.renderShoppingCartItems()}
						<hr />
						{this.renderShoppingCartTotals(this.props.totals)}
						<hr />
						{this.renderOrderDate()}
					</Card.Body>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderItems: state.order.orderItems,
		orderDetails: state.order.orderDetails,
		totals: state.order.totals,
	};
};

export default connect(mapStateToProps, {})(OrderSummary);

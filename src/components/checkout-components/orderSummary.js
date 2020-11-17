//libs
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getFormValues } from "redux-form";
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

	renderDeliveryDetails = () => {
		if (
			this.props.location.pathname === "/checkout/payment" &&
			this.props.contactInformation
		) {
			const {
				address1,
				address2,
				city,
				state,
				zip,
				firstNameDelivery,
				lastNameDelivery,
				emailDelivery,
				phoneNumberDelivery,
			} = this.props.contactInformation;
			return (
				<>
					<Row>
						<Col md={4}>
							<p>Address</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<p>{address1}</p>
						</Col>
					</Row>
					<Row>
						<Col md={8}>
							<p>{address2}</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<p>
								{city}, {state} {zip}
							</p>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							<p>Delivery Contact</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<p>
								{firstNameDelivery} {lastNameDelivery}
							</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<p>{emailDelivery}</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<p>{phoneNumberDelivery}</p>
						</Col>
					</Row>
				</>
			);
		} else {
			return null;
		}
	};

	renderContactDetails = () => {
		if (
			this.props.location.pathname === "/checkout/payment" &&
			this.props.contactInformatio
		) {
			const {
				firstName,
				lastName,
				email,
				phoneNumber,
			} = this.props.contactInformation;
			return (
				<>
					<Row>
						<Col md={4}>
							<p>Name</p>
						</Col>
						<Col md={8} className="shoppingCartItemPrice">
							<p>
								{firstName} {lastName}
							</p>
						</Col>
					</Row>
					<Row>
						<Col md={4}>
							<p>Email</p>
						</Col>
						<Col md={8} className="shoppingCartItemPrice">
							<p>{email}</p>
						</Col>
					</Row>
					<Row>
						<Col md={5}>
							<p>Phone Number</p>
						</Col>
						<Col md={7} className="shoppingCartItemPrice">
							<p>{phoneNumber}</p>
						</Col>
					</Row>
				</>
			);
		} else {
			return null;
		}
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
				<hr />
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
						{this.props.totals.tax > 0 ? (
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
						) : (
							<p>(Tax Exempt)</p>
						)}
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
		console.log("With Router ", this.props);
		return (
			<div className="sticky-top orderSummaryOffset">
				<Card>
					<Card.Header>
						My Order: {this.getNumberOfItemsOrdered()} Items
					</Card.Header>
					<Card.Body>
						<Card.Subtitle className="mb-2 text-muted">Items</Card.Subtitle>
						{this.renderShoppingCartItems()}
						<hr />
						<Card.Subtitle className="mb-2 text-muted">Totals</Card.Subtitle>
						{this.renderShoppingCartTotals(this.props.totals)}
						<hr />
						<Card.Subtitle className="mb-2 text-muted">
							Contact Details
						</Card.Subtitle>
						{this.renderContactDetails()}
						<hr />
						<Card.Subtitle className="mb-2 text-muted">
							Delivery Details
						</Card.Subtitle>
						{this.renderOrderDate()}
						{this.renderDeliveryDetails()}
					</Card.Body>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		totals: state.order.totals,
		orderItems: state.order.orderItems,
		orderDetails: state.order.orderDetails,
		contactInformation: getFormValues("checkoutContactForm")(state),
	};
};

export default withRouter(connect(mapStateToProps, {})(OrderSummary));

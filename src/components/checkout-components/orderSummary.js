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
import { Button } from "semantic-ui-react";
//utils
import { history } from "../../utils/history";
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

	renderPickupDetails = (location, pickupInformation) => {
		if (
			this.props.location.pathname === "/checkout/payment" &&
			this.props.contactInformation
		) {
			return (
				<>
					<hr />
					<Card.Subtitle className="mb-2 text-muted">
						Pick-Up Details
					</Card.Subtitle>
					<Row>
						<Col md={6} className="text-center">
							<div className="storeInformation">
								<h4>Location</h4>
								<p className="storeInformation">{location}</p>
								<p className="storeInformation">{pickupInformation.address1}</p>
								<p className="storeInformation">{pickupInformation.address2}</p>
								<p className="storeInformation">
									{pickupInformation.city}, {pickupInformation.state}{" "}
									{pickupInformation.zip}
								</p>
								<p className="storeInformation">{pickupInformation.email}</p>
								<p className="storeInformation">
									{pickupInformation.phoneNumber}
								</p>
							</div>
						</Col>
					</Row>
				</>
			);
		} else {
			return null;
		}
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
				deliveryInstructions,
			} = this.props.contactInformation;
			return (
				<>
					<hr />
					<Card.Subtitle className="mb-2 text-muted">
						Delivery Details
					</Card.Subtitle>
					<Row>
						<Col md={6} className="text-center">
							<p>
								<u>Delivery Address</u>
							</p>
							<p className="contactDetails">{address1}</p>
							{address2 ? <p className="contactDetails">{address2}</p> : null}
							<p className="contactDetails">
								{city}, {state} {zip}
							</p>
						</Col>
						<Col md={6} className="text-center">
							<p>
								<u>Delivery Notes</u>
							</p>
							<p className="contactDetails">{deliveryInstructions}</p>
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
			this.props.contactInformation
		) {
			const {
				firstName,
				lastName,
				email,
				phoneNumber,
				firstNameDelivery,
				lastNameDelivery,
				emailDelivery,
				phoneNumberDelivery,
			} = this.props.contactInformation;
			return (
				<>
					<hr />
					<Card.Subtitle className="mb-2 text-muted">
						Contact Details
					</Card.Subtitle>
					<Row>
						<Col md={6} className="text-center">
							<p>
								<u>Primary Contact</u>
							</p>
							<p className="contactDetails">
								{firstName} {lastName}
							</p>
							<p className="contactDetails">{email}</p>
							<p className="contactDetails">{phoneNumber}</p>
						</Col>
						<Col md={6} className="text-center">
							<p>
								<u>Delivery Contact</u>
							</p>
							<p className="contactDetails">
								{firstNameDelivery} {lastNameDelivery}
							</p>
							<p className="contactDetails">{emailDelivery}</p>
							<p className="contactDetails">{phoneNumberDelivery}</p>
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
		const { shippingMethod } = this.props.orderDetails;
		if (this.props.orderDetails.orderDate !== "") {
			formattedDate = new Date(
				this.props.orderDetails.orderDate
			).toLocaleDateString("en-US", formatOptions);
		}
		return (
			<>
				<Row>
					<Col>
						<p className="shoppingCartTotalPrice">
							{shippingMethod === "delivery" ? "Delivery" : "Pick-Up"} Date &
							Time:&nbsp;{formattedDate}
						</p>
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
					<Col md={6}>
						<p>Tax</p>
					</Col>
					<Col md={6} className="shoppingCartTotalPrice">
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
						<p>
							<b>Total</b>
						</p>
					</Col>
					<Col md={4} className="shoppingCartTotalPrice">
						<p>
							<b>
								<NumberFormat
									value={this.props.totals.total}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
									decimalScale={2}
									fixedDecimalScale="true"
								/>
							</b>
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
								{orderItem.quantity}x {orderItem.name}
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
		const {
			shippingMethod,
			location,
			pickupInformation,
		} = this.props.orderDetails;
		return (
			<div className="sticky-top orderSummaryOffset">
				<Card>
					<Card.Header>
						<Row>
							<Col md={4}>My Order: {this.getNumberOfItemsOrdered()} Items</Col>
							<Col md={8}>{this.renderOrderDate()}</Col>
						</Row>
					</Card.Header>
					<Card.Body>
						<Card.Subtitle className="mb-2 text-muted">Items</Card.Subtitle>
						<p>
							<Button
								basic
								color="blue"
								className="changeButton"
								onClick={() => history.push("/order")}
							>
								Need to make a change?
							</Button>
						</p>

						{this.renderShoppingCartItems()}
						<hr />
						<Card.Subtitle className="mb-2 text-muted">Totals</Card.Subtitle>
						{this.renderShoppingCartTotals(this.props.totals)}
						{this.renderContactDetails()}
						{shippingMethod === "delivery"
							? this.renderDeliveryDetails()
							: this.renderPickupDetails(location, pickupInformation)}
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
		locationInformation: state.storeInformation,
		contactInformation: getFormValues("checkoutContactForm")(state),
	};
};

export default withRouter(connect(mapStateToProps, {})(OrderSummary));

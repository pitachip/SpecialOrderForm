//libs
import React from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import each from "lodash/each";
//ui componenets
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//app components
import { updateOrderTotals, getMenuConfig } from "../actions";

import "../css/shoppingCartTotal.css";

class ShoppingCartTotal extends React.Component {
	async componentDidMount() {
		await this.props.getMenuConfig();
	}

	componentDidUpdate(prevProps, prevState) {
		/**
		 * Only update the price when a new order item has been added
		 */
		if (prevProps.orderItems.length !== this.props.orderItems.length) {
			const calculatedAmounts = this.calculateTotals();
			this.props.updateOrderTotals(calculatedAmounts);
		}
	}

	/**
	 * Might have to put this in a util because it needs to be used here and the details for
	 * when it changes from pickup to delivery and vice versa
	 */
	calculateTotals = () => {
		const deliveryFee = this.props.menuConfig.settings.cateringDeliveryFee;
		const shippingMethod = this.props.orderDetails.shippingMethod;
		let totals = {
			subTotal: 0,
			tax: 0,
			total: 0,
			delivery: shippingMethod === "delivery" ? deliveryFee : 0,
		};

		each(this.props.orderItems, (item) => {
			totals.subTotal =
				totals.subTotal + item.quantity * (item.basePrice / 100);
			totals.tax = totals.subTotal * this.props.menuConfig.settings.taxRate;
			totals.total = totals.subTotal + totals.tax + totals.delivery;
		});

		return totals;
	};

	renderDeliverFee = () => {
		if (this.props.menuConfig) {
			const deliveryFee = this.props.menuConfig.settings.cateringDeliveryFee;
			const shippingMethod = this.props.orderDetails.shippingMethod;
			return (
				<NumberFormat
					value={shippingMethod === "delivery" ? deliveryFee : 0}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
			);
		}
	};

	renderOrderMinmumText = () => {
		return (
			<>
				<NumberFormat
					value={this.props.menuConfig.settings.minimumOrderAmount}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
			</>
		);
	};

	render() {
		const { menuConfig } = this.props;
		return (
			<div>
				<Card>
					<Card.Body>
						<Row>
							<Col md={8}>
								<p>
									Subtotal{" (min: "}
									{menuConfig ? this.renderOrderMinmumText() : null}
									{")"}
								</p>
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
							<Col md={8}>
								<p>Delivery</p>
							</Col>
							<Col md={4} className="shoppingCartTotalPrice">
								<p>{this.renderDeliverFee()}</p>
							</Col>
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
					</Card.Body>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderItems: state.order.orderItems,
		totals: state.order.totals,
		menuConfig: state.menu.menuConfig,
		orderDetails: state.order.orderDetails,
	};
};

export default connect(mapStateToProps, { updateOrderTotals, getMenuConfig })(
	ShoppingCartTotal
);

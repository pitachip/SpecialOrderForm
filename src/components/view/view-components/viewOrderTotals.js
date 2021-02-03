//libs
import React from "react";
import NumberFormat from "react-number-format";
//ui components
import { Grid } from "semantic-ui-react";
//css
import "../view-css/viewOrder.css";

class ViewOrderTotals extends React.Component {
	render() {
		const { subTotal, tax, delivery, total } = this.props.orderTotals;
		return (
			<Grid container>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={2}>
					<Grid.Column className="orderConfirmationTotalColumnPadding">
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">Subtotal</span>
							</p>
						</div>
					</Grid.Column>
					<Grid.Column
						className="orderConfirmationTotalColumnPadding"
						textAlign="left"
					>
						<div>
							<p>
								<span className="orderConfirmationTotalField">
									<NumberFormat
										value={subTotal}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"$"}
										decimalScale={2}
										fixedDecimalScale="true"
									/>
								</span>
							</p>
						</div>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={2}>
					<Grid.Column className="orderConfirmationTotalColumnPadding">
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">Taxes</span>
							</p>
						</div>
					</Grid.Column>
					<Grid.Column
						className="orderConfirmationTotalColumnPadding"
						textAlign="left"
					>
						<div>
							<p>
								<span className="orderConfirmationTotalField">
									<NumberFormat
										value={tax}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"$"}
										decimalScale={2}
										fixedDecimalScale="true"
									/>
								</span>
							</p>
						</div>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={2}>
					<Grid.Column className="orderConfirmationTotalColumnPadding">
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">Delivery</span>
							</p>
						</div>
					</Grid.Column>
					<Grid.Column
						className="orderConfirmationTotalColumnPadding"
						textAlign="left"
					>
						<div>
							<p>
								<span className="orderConfirmationTotalField">
									<NumberFormat
										value={delivery}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"$"}
										decimalScale={2}
										fixedDecimalScale="true"
									/>
								</span>
							</p>
						</div>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={2}>
					<Grid.Column className="orderConfirmationTotalColumnPadding">
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">
									<b>Total</b>
								</span>
							</p>
						</div>
					</Grid.Column>
					<Grid.Column
						className="orderConfirmationTotalColumnPadding"
						textAlign="left"
					>
						<div>
							<p>
								<span className="orderConfirmationTotalField">
									<b>
										<NumberFormat
											value={total}
											displayType={"text"}
											thousandSeparator={true}
											prefix={"$"}
											decimalScale={2}
											fixedDecimalScale="true"
										/>
									</b>
								</span>
							</p>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default ViewOrderTotals;

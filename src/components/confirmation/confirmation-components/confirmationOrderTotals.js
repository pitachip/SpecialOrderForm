//libs
import React from "react";
//ui components
import { Grid } from "semantic-ui-react";
//css
import "../confirmation-css/orderConfirmation.css";

class ConfirmationOrderTotals extends React.Component {
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
								<span className="orderConfirmationTotalField">${subTotal}</span>
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
								<span className="orderConfirmationTotalField">${tax}</span>
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
								<span className="orderConfirmationTotalField">${delivery}</span>
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
									<b>${total}</b>
								</span>
							</p>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default ConfirmationOrderTotals;

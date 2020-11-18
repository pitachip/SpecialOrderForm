//libs
import React from "react";
//ui components
import { Grid } from "semantic-ui-react";
//css
import "../confirmation-css/orderConfirmation.css";

class ConfirmationOrderTotals extends React.Component {
	render() {
		const { orderTotals } = this.props;
		return (
			<Grid container>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={2}>
					<Grid.Column
						width={8}
						className="orderConfirmationTotalColumnPadding"
					>
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">Subtotal</span>
							</p>
						</div>
					</Grid.Column>
					<Grid.Column
						textAlign="orderConfirmationTotalColumnPadding right"
						width={4}
					>
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">$7.99</span>
							</p>
						</div>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={2}>
					<Grid.Column
						width={8}
						className="orderConfirmationTotalColumnPadding"
					>
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">Taxes</span>
							</p>
						</div>
					</Grid.Column>
					<Grid.Column
						textAlign="orderConfirmationTotalColumnPadding right"
						width={4}
					>
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">$7.99</span>
							</p>
						</div>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={2}>
					<Grid.Column
						width={8}
						className="orderConfirmationTotalColumnPadding"
					>
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">Delivery</span>
							</p>
						</div>
					</Grid.Column>
					<Grid.Column
						textAlign="orderConfirmationTotalColumnPadding right"
						width={4}
					>
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">$25</span>
							</p>
						</div>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row className="confirmationDeliveryDetailsRow" columns={2}>
					<Grid.Column
						width={8}
						className="orderConfirmationTotalColumnPadding"
					>
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">
									<b>Total</b>
								</span>
							</p>
						</div>
					</Grid.Column>
					<Grid.Column
						textAlign="orderConfirmationTotalColumnPadding right"
						width={4}
					>
						<div className="orderConfirmationDot">
							<p>
								<span className="orderConfirmationTotalField">
									<b>$25.99</b>
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

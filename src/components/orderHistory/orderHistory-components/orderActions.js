//libs
import React from "react";
import { connect } from "react-redux";
import each from "lodash/each";
//ui components
import { Button, Icon } from "semantic-ui-react";
//actions
import {
	addItemToOrder,
	updateShippingMethod,
	updateOrderTotals,
	deleteAllOrderItems,
} from "../../../actions";
//utils
import {
	formatSelectionForCheckout,
	calculateTotals,
} from "../../../utils/orderCheckoutUtils";
import { history } from "../../../utils/history";
//css
import "../orderHistory-css/orderActions.css";

class OrderStatusButton extends React.Component {
	repeatOrderClicked = (order) => {
		const {
			addItemToOrder,
			updateShippingMethod,
			updateOrderTotals,
			deleteAllOrderItems,
		} = this.props;
		/**
		 * TODO
		 * 3. need to set the shipping location
		 * 4. need to make sure this works for invoices too
		 */
		console.log("Repeat order clicked", order);
		//Need to set all the data in Redux
		deleteAllOrderItems();
		const { orderItems, orderDetails } = order;
		each(orderItems, (item) => {
			addItemToOrder(
				formatSelectionForCheckout(
					item.originalMenuItem,
					item.originalSelectionFormat,
					item.quantity,
					item.specialInstructions,
					false,
					null
				)
			);
		});

		const calculatedAmounts = calculateTotals(
			orderItems,
			this.props.menuConfig.settings,
			orderDetails.shippingMethod
		);
		updateOrderTotals(calculatedAmounts);

		updateShippingMethod(orderDetails.shippingMethod);
		//if it's pickup, add the location

		history.push("/order");
	};

	render() {
		const { orderDetails } = this.props;
		return (
			<div>
				<Button.Group vertical compact>
					<Button className="actionButtonsMargin">
						<Icon name="eye" />
						View Order
					</Button>
					<Button className="actionButtonsMargin">
						<Icon name="edit" /> Modify Order
					</Button>
					<Button className="actionButtonsMargin">
						<Icon name="cancel" />
						Cancel Order
					</Button>
					<Button className="actionButtonsMargin">
						<Icon name="file alternate outline" />
						View Invoice/Reciept
					</Button>
					<Button onClick={() => this.repeatOrderClicked(orderDetails)}>
						<Icon name="repeat" />
						Repeat Order
					</Button>
				</Button.Group>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menuConfig: state.menu.menuConfig,
		orderItems: state.order.orderItems,
	};
};

export default connect(mapStateToProps, {
	addItemToOrder,
	updateShippingMethod,
	updateOrderTotals,
	deleteAllOrderItems,
})(OrderStatusButton);

//libs
import React from "react";
import { connect } from "react-redux";
import each from "lodash/each";
//ui components
import { Button, Icon } from "semantic-ui-react";
//actions
import { addItemToOrder } from "../../../actions";
//utils
import { formatForRepeatOrder } from "../../../utils/orderCheckoutUtils";
//css
import "../orderHistory-css/orderActions.css";

class OrderStatusButton extends React.Component {
	repeatOrderClicked = (orderDetails) => {
		console.log("Repeat order clicked", orderDetails);
		//Need to set all the data in Redux
		const { orderItems } = orderDetails;
		each(orderItems, (item) => {
			this.props.addItemToOrder(
				formatForRepeatOrder(
					item,
					item.originalSelectionFormat,
					item.quantity,
					item.specialInstructions
				)
			);
		});

		//Push user to the /order page
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
	return { order: state.order };
};

export default connect(mapStateToProps, { addItemToOrder })(OrderStatusButton);

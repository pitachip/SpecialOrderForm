//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import { Table } from "semantic-ui-react";
//app components
import ShoppingCartItem from "./shoppingCartItem";

class ShoppingCartItems extends React.Component {
	render() {
		const { orderItems } = this.props;
		return (
			<>
				<Table basic="very" compact="very" striped>
					<Table.Body>
						{orderItems.map((orderItem, index) => {
							return (
								<ShoppingCartItem
									key={orderItem.uniqueId}
									orderItem={orderItem}
									orderItemIndex={index}
								/>
							);
						})}
					</Table.Body>
				</Table>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderItems: state.order.orderItems,
	};
};

export default connect(mapStateToProps, {})(ShoppingCartItems);

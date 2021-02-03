//libs
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import NumberFormat from "react-number-format";
//ui components
import { Table, Pagination } from "semantic-ui-react";
//app components
import OrderStatusButton from "./orderStatusButton";
import OrderActions from "./orderActions";
//actions
import { getMyOrders } from "../../../actions";
//hoc
import withLoading from "../../../hoc/withLoading";

class OrderHistoryTable extends React.Component {
	state = { testState: "testing" };
	async componentDidMount() {
		await this.props.getMyOrders();
	}

	renderOrderDate = (orderDate) => {
		let formattedDate = "";
		let formatOptions = {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
		};
		formattedDate = new Date(orderDate).toLocaleDateString(
			"en-US",
			formatOptions
		);
		return formattedDate;
	};

	renderPaymentType = (paymentType) => {
		switch (paymentType) {
			case "cc":
				return "Credit Card";
			case "check":
				return "Check";
			case "univ":
				return "University Money Account";
			default:
				return "N/A";
		}
	};

	renderOrders = (orders) => {
		return orders.map((order) => {
			const {
				orderNumber,
				status,
				orderTotals,
				paymentInformation,
				createdAt,
			} = order;
			return (
				<Table.Row>
					<Table.Cell>#{orderNumber}</Table.Cell>
					<Table.Cell>
						<OrderStatusButton content={status} />
					</Table.Cell>
					<Table.Cell>
						<NumberFormat
							value={orderTotals.total}
							displayType={"text"}
							thousandSeparator={true}
							prefix={"$"}
							decimalScale={2}
							fixedDecimalScale="true"
						/>
					</Table.Cell>
					<Table.Cell>
						{this.renderPaymentType(paymentInformation.paymentType)}
					</Table.Cell>
					<Table.Cell>
						<OrderStatusButton content={paymentInformation.paymentStatus} />
						<p>Due on:</p>
					</Table.Cell>
					<Table.Cell>{this.renderOrderDate(createdAt)}</Table.Cell>
					<Table.Cell textAlign="center">
						<OrderActions orderDetails={order} />
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	render() {
		const { orders, pagination } = this.props;
		return (
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Order Number</Table.HeaderCell>
						<Table.HeaderCell>Status</Table.HeaderCell>
						<Table.HeaderCell>Total</Table.HeaderCell>
						<Table.HeaderCell>Payment Method</Table.HeaderCell>
						<Table.HeaderCell>Payment Status</Table.HeaderCell>
						<Table.HeaderCell>Placed On</Table.HeaderCell>
						<Table.HeaderCell>Actions</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{this.renderOrders(orders)}</Table.Body>
			</Table>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.orderHistory.orders,
		pagination: state.orderHistory.pagination,
	};
};

/*
export default compose(
	connect(mapStateToProps, { getMyOrders }),
	withLoading
)(OrderHistoryTable);
*/

export default connect(mapStateToProps, { getMyOrders })(OrderHistoryTable);

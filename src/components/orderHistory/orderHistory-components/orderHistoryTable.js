//libs
import React from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
//ui components
import { Icon, Menu, Table } from "semantic-ui-react";
//app components
import OrderStatusButton from "./orderStatusButton";
import OrderActions from "./orderActions";
//actions
import { getMyOrders } from "../../../actions";

class OrderHistoryTable extends React.Component {
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

	renderOrders = (orderHistory) => {
		return orderHistory.orders.map((order) => {
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
		const { orderHistory } = this.props;
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
				<Table.Body>{this.renderOrders(orderHistory)}</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan="7">
							<Menu floated="right" pagination>
								<Menu.Item as="a" icon>
									<Icon name="chevron left" />
								</Menu.Item>
								<Menu.Item as="a">1</Menu.Item>
								<Menu.Item as="a">2</Menu.Item>
								<Menu.Item as="a">3</Menu.Item>
								<Menu.Item as="a">4</Menu.Item>
								<Menu.Item as="a" icon>
									<Icon name="chevron right" />
								</Menu.Item>
							</Menu>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		);
	}
}

const mapStateToProps = (state) => {
	return { orderHistory: state.orderHistory };
};

export default connect(mapStateToProps, { getMyOrders })(OrderHistoryTable);

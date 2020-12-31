//libs
import React from "react";
//ui components
import { Icon, Menu, Table } from "semantic-ui-react";
//app components
import OrderStatusButton from "./orderStatusButton";
import OrderActions from "./orderActions";

class OrderHistoryTable extends React.Component {
	render() {
		return (
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Order Number</Table.HeaderCell>
						<Table.HeaderCell>Status</Table.HeaderCell>
						<Table.HeaderCell>Total</Table.HeaderCell>
						<Table.HeaderCell>Payment Type</Table.HeaderCell>
						<Table.HeaderCell>Payment Status</Table.HeaderCell>
						<Table.HeaderCell>Placed On</Table.HeaderCell>
						<Table.HeaderCell>Actions</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row>
						<Table.Cell>#1001</Table.Cell>
						<Table.Cell>
							<OrderStatusButton color="blue" content="Submitted" />
						</Table.Cell>
						<Table.Cell>$130.00</Table.Cell>
						<Table.Cell>Purchase Order</Table.Cell>
						<Table.Cell>
							<OrderStatusButton color="red" content="Pending" />
						</Table.Cell>
						<Table.Cell>12/31/2020</Table.Cell>
						<Table.Cell textAlign="center">
							<OrderActions />
						</Table.Cell>
					</Table.Row>
				</Table.Body>

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

export default OrderHistoryTable;

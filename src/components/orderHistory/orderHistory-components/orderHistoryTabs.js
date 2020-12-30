//libs
import React from "react";
//ui components
import { Tab } from "semantic-ui-react";
//app components
import OrderHistoryTable from "./orderHistoryTable";

class OrderHistoryTabs extends React.Component {
	render() {
		const panes = [
			{
				menuItem: "All",
				render: () => (
					<Tab.Pane attached={false}>
						<OrderHistoryTable />
					</Tab.Pane>
				),
			},
			{
				menuItem: "In Progress",
				render: () => (
					<Tab.Pane attached={false}>
						<OrderHistoryTable />
					</Tab.Pane>
				),
			},
			{
				menuItem: "Completed",
				render: () => (
					<Tab.Pane attached={false}>
						<OrderHistoryTable filter="completed" />
					</Tab.Pane>
				),
			},
			{
				menuItem: "Cancelled",
				render: () => (
					<Tab.Pane attached={false}>
						<OrderHistoryTable filter="canceled" />
					</Tab.Pane>
				),
			},
		];
		return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
	}
}

export default OrderHistoryTabs;

//libs
import React from "react";
//ui components
import { Tab, Pagination } from "semantic-ui-react";
//app components
import OrderHistoryTable from "./orderHistoryTable";
//hoc
import withLoading from "../../../hoc/withLoading";
const OrderHistoryTableWithLoading = withLoading(OrderHistoryTable, "test");

class OrderHistoryTabs extends React.Component {
	/**TODO
	 * I think that I need to route the withLoading HOC
	 * from here so I can pass the loading indicator and call the api
	 * from here.
	 * Might be able to get the handle on pagination requests this way (see All)
	 */
	render() {
		const panes = [
			{
				menuItem: "All",
				render: () => (
					<Tab.Pane attached={false}>
						<OrderHistoryTableWithLoading loading={true} />
						<Pagination defaultActivePage={1} totalPages={1} />
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

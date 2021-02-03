//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import { Tab, Pagination } from "semantic-ui-react";
//app components
import OrderHistoryTable from "./orderHistoryTable";
//actions
import { getMyOrders } from "../../../actions";
//utils
import { createFilterString } from "../../../utils/orderHistoryUtils";
//hoc
import withLoading from "../../../hoc/withLoading";
const OrderHistoryTableWithLoading = withLoading(OrderHistoryTable);

class OrderHistoryTabs extends React.Component {
	state = {
		loadingOrders: false,
		loadingText: "Loading all orders...",
		filterString: "",
	};

	componentDidMount = async () => {
		this.setState({ loadingOrders: true });
		await this.props.getMyOrders(1);
		this.setState({ loadingOrders: false });
	};

	tabChanged = async (tab, panes) => {
		const filterString = createFilterString(panes[tab].menuItem);
		this.setState({
			filterString: filterString,
			loadingOrders: true,
			loadingText: "Loading...",
		});
		await this.props.getMyOrders(1, filterString);
		this.setState({ loadingOrders: false });
	};

	pageChanged = async (page) => {
		this.setState({ loadingOrders: true, loadingText: "Loading..." });
		await this.props.getMyOrders(page, this.state.filterString);
		this.setState({ loadingOrders: false });
	};

	render() {
		const { pagination } = this.props;
		const { loadingOrders } = this.state;
		const panes = [
			{
				menuItem: "All",
				render: () => (
					<Tab.Pane attached={false}>
						<OrderHistoryTableWithLoading
							loading={loadingOrders}
							loadingText={"Loading all orders"}
						/>
						<Pagination
							defaultActivePage={1}
							totalPages={pagination.totalPages}
							onPageChange={(e, data) => this.pageChanged(data.activePage)}
						/>
					</Tab.Pane>
				),
			},
			{
				menuItem: "In Progress",
				render: () => (
					<Tab.Pane attached={false}>
						<OrderHistoryTableWithLoading
							loading={loadingOrders}
							loadingText={"Loading in progress orders..."}
						/>
						<Pagination
							defaultActivePage={1}
							totalPages={pagination.totalPages}
							onPageChange={(e, data) => this.pageChanged(data.activePage)}
						/>
					</Tab.Pane>
				),
			},
			{
				menuItem: "Completed",
				render: () => (
					<Tab.Pane attached={false}>
						<OrderHistoryTableWithLoading
							loading={loadingOrders}
							loadingText={"Loading completed orders..."}
						/>
						<Pagination
							defaultActivePage={1}
							totalPages={pagination.totalPages}
							onPageChange={(e, data) => this.pageChanged(data.activePage)}
						/>
					</Tab.Pane>
				),
			},
			{
				menuItem: "Cancelled",
				render: () => (
					<Tab.Pane attached={false}>
						<OrderHistoryTableWithLoading
							loading={loadingOrders}
							loadingText={"Loading cancelled orders..."}
						/>
						<Pagination
							defaultActivePage={1}
							totalPages={pagination.totalPages}
							onPageChange={(e, data) => this.pageChanged(data.activePage)}
						/>
					</Tab.Pane>
				),
			},
		];
		return (
			<Tab
				className="paginationAlign"
				menu={{ secondary: true, pointing: true }}
				panes={panes}
				onTabChange={(e, data) => this.tabChanged(data.activeIndex, data.panes)}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.orderHistory.orders,
		pagination: state.orderHistory.pagination,
	};
};

export default connect(mapStateToProps, { getMyOrders })(OrderHistoryTabs);

//libs
import React from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
//ui components
import { Tab, Pagination } from "semantic-ui-react";
//app components
import OrderHistoryTable from "./orderHistoryTable";
import NoOrdersFound from "./noOrdersFound";
//actions
import { getMyOrders, setActiveTab } from "../../../actions";
//utils
import { createFilterString } from "../../../utils/orderHistoryUtils";
//hoc
import withLoading from "../../../hoc/withLoading";
const OrderHistoryTableWithLoading = withLoading(OrderHistoryTable);

class OrderHistoryTabs extends React.Component {
	state = {
		loadingOrders: true,
		loadingText: "Loading all orders...",
		filterString: "",
		activePage: 1,
	};

	componentDidMount = async () => {
		this.setState({ loadingOrders: true });
		this.props.setActiveTab(0);
		await this.props.getMyOrders(1);
		this.setState({ loadingOrders: false });
	};

	tabChanged = async (tab, panes) => {
		const filterString = createFilterString(panes[tab].menuItem);
		this.setState({
			filterString: filterString,
			loadingOrders: true,
			activePage: 1,
		});
		this.props.setActiveTab(tab);
		await this.props.getMyOrders(1, filterString);
		this.setState({ loadingOrders: false });
	};

	pageChanged = async (page) => {
		this.setState({
			loadingOrders: true,
			loadingText: "Loading...",
			activePage: page,
		});
		await this.props.getMyOrders(page, this.state.filterString);
		this.setState({ loadingOrders: false });
	};

	render() {
		const { pagination, activeTab, orders } = this.props;
		const { loadingOrders, activePage } = this.state;
		const panes = [
			{
				menuItem: "All",
				render: () => (
					<Tab.Pane attached={false}>
						{isEmpty(orders) && !loadingOrders ? (
							<NoOrdersFound />
						) : (
							<>
								<OrderHistoryTableWithLoading
									loading={loadingOrders}
									loadingText={"Loading all orders..."}
								/>
								<div className="paginationAlign">
									<Pagination
										defaultActivePage={1}
										activePage={activePage}
										totalPages={pagination.totalPages}
										onPageChange={(e, data) =>
											this.pageChanged(data.activePage)
										}
									/>
								</div>
							</>
						)}
					</Tab.Pane>
				),
			},
			{
				menuItem: "In Progress",
				render: () => (
					<Tab.Pane attached={false}>
						{isEmpty(orders) && !loadingOrders ? (
							<NoOrdersFound />
						) : (
							<>
								<OrderHistoryTableWithLoading
									loading={loadingOrders}
									loadingText={"Loading in progress orders..."}
								/>
								<div className="paginationAlign">
									<Pagination
										defaultActivePage={1}
										totalPages={pagination.totalPages}
										onPageChange={(e, data) =>
											this.pageChanged(data.activePage)
										}
									/>
								</div>
							</>
						)}
					</Tab.Pane>
				),
			},
			{
				menuItem: "Completed",
				render: () => (
					<Tab.Pane attached={false}>
						{isEmpty(orders) && !loadingOrders ? (
							<NoOrdersFound />
						) : (
							<>
								<OrderHistoryTableWithLoading
									loading={loadingOrders}
									loadingText={"Loading completed orders..."}
								/>
								<div className="paginationAlign">
									<Pagination
										defaultActivePage={1}
										totalPages={pagination.totalPages}
										onPageChange={(e, data) =>
											this.pageChanged(data.activePage)
										}
									/>
								</div>
							</>
						)}
					</Tab.Pane>
				),
			},
			{
				menuItem: "Cancelled",
				render: () => (
					<Tab.Pane attached={false}>
						{isEmpty(orders) && !loadingOrders ? (
							<NoOrdersFound />
						) : (
							<>
								<OrderHistoryTableWithLoading
									loading={loadingOrders}
									loadingText={"Loading cancelled orders..."}
								/>
								<div className="paginationAlign">
									<Pagination
										defaultActivePage={1}
										totalPages={pagination.totalPages}
										onPageChange={(e, data) =>
											this.pageChanged(data.activePage)
										}
									/>
								</div>
							</>
						)}
					</Tab.Pane>
				),
			},
		];
		return (
			<Tab
				menu={{ secondary: true, pointing: true }}
				panes={panes}
				onTabChange={(e, data) => this.tabChanged(data.activeIndex, data.panes)}
				activeIndex={activeTab}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.orderHistory.orders,
		pagination: state.orderHistory.pagination,
		activeTab: state.orderHistory.activeTab,
	};
};

export default connect(mapStateToProps, { getMyOrders, setActiveTab })(
	OrderHistoryTabs
);

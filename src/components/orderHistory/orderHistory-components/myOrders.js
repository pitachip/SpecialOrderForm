//libs
import React from "react";
import { connect } from "react-redux";
import { persistor } from "../../../store";
import { reset, getFormValues } from "redux-form";
//ui components
import { Grid, Button, Icon } from "semantic-ui-react";
//app components
import SearchOrders from "./searchOrders";
import OrderHistoryTabs from "./orderHistoryTabs";
//utils
import { history } from "../../../utils/history";
//css
import "../orderHistory-css/myOrders.css";

class MyOrders extends React.Component {
	placeNewOrderClicked = async () => {
		await persistor.purge();
		this.props.reset("checkoutContactForm");
		this.props.reset("paymentInformationForm");
		history.push("/order");
	};
	render() {
		return (
			<Grid container className="gridMargin">
				<Grid.Row columns={1}>
					<Grid.Column textAlign="right">
						<Button size="small" onClick={() => this.placeNewOrderClicked()}>
							<Icon name="plus" /> Place an Order
						</Button>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={2}>
					<Grid.Column>
						<h2>My Orders</h2>
					</Grid.Column>
					<Grid.Column>
						<SearchOrders />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={1}>
					<Grid.Column>
						<OrderHistoryTabs />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		customerInformation: getFormValues("checkoutContactForm")(state),
		paymentInformation: getFormValues("paymentInformationForm")(state),
	};
};

export default connect(mapStateToProps, { reset })(MyOrders);

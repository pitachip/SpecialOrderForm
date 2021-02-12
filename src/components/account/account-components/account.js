//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import { Grid } from "semantic-ui-react";
//app components
import AccountMenu from "./accountMenu";
import MyOrders from "../../orderHistory/orderHistory-components/myOrders";
import MyProfile from "../../profile/profile-components/myProfile";
//actions
import { setActiveMenuTab } from "../../../actions";

class Account extends React.Component {
	renderAccountComponent() {
		const { location, setActiveMenuTab } = this.props;
		switch (location.pathname) {
			case "/account/details":
				setActiveMenuTab("account details");
				return <MyProfile />;
			case "/account/orders":
				setActiveMenuTab("order history");
				return <MyOrders />;
			default:
				setActiveMenuTab("account details");
				return <MyProfile />;
		}
	}

	render() {
		return (
			<Grid columns={2}>
				<Grid.Column width={3}>
					<AccountMenu />
				</Grid.Column>
				<Grid.Column width={13}>{this.renderAccountComponent()}</Grid.Column>
			</Grid>
		);
	}
}

export default connect(null, { setActiveMenuTab })(Account);

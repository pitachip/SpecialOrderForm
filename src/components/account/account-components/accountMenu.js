//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import { Menu } from "semantic-ui-react";
//actions
import { setActiveMenuTab } from "../../../actions";
//utils
import { history } from "../../../utils/history";

class AccountMenu extends React.Component {
	render() {
		const { activeMenuTab, setActiveMenuTab } = this.props;

		return (
			<Menu pointing vertical>
				<Menu.Item
					name="account details"
					active={activeMenuTab === "account details"}
					onClick={(e, { name }) => {
						setActiveMenuTab(name);
						history.push("/account/details");
					}}
				/>
				<Menu.Item
					name="order history"
					active={activeMenuTab === "order history"}
					onClick={(e, { name }) => {
						setActiveMenuTab(name);
						history.push("/account/orders");
					}}
				/>
			</Menu>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		activeMenuTab: state.account.activeMenuTab,
	};
};

export default connect(mapStateToProps, { setActiveMenuTab })(AccountMenu);

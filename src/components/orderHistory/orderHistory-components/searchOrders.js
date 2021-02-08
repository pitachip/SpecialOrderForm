//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import { Input, Button } from "semantic-ui-react";
//actions
import { getMyOrders, setActiveTab } from "../../../actions";

class SearchOrders extends React.Component {
	state = { orderNumber: "", searching: false };
	searchClicked = async () => {
		this.setState({ searching: true });
		this.props.setActiveTab(0);
		await this.props.getMyOrders(
			1,
			this.state.orderNumber !== ""
				? `orderNumber=${this.state.orderNumber}`
				: ""
		);
		this.setState({ searching: false });
	};

	searchTermChanged = (term) => {
		term = term.replace(/\D/g, "");
		this.setState({ orderNumber: term });
	};

	enterKeyClicked = async (event) => {
		if (event === "Enter") {
			this.setState({ searching: true });
			this.props.setActiveTab(0);
			await this.props.getMyOrders(
				1,
				this.state.orderNumber !== ""
					? `orderNumber=${this.state.orderNumber}`
					: ""
			);
			this.setState({ searching: false });
		}
	};

	render() {
		return (
			<Input
				action={<Button onClick={() => this.searchClicked()}>Search</Button>}
				fluid
				loading={this.state.searching}
				icon="search"
				iconPosition="left"
				placeholder="Search by Order Number"
				onChange={(e, data) => this.searchTermChanged(data.value)}
				onKeyDown={(e) => this.enterKeyClicked(e.key)}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { getMyOrders, setActiveTab })(
	SearchOrders
);

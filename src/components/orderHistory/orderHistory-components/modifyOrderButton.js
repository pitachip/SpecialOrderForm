//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import { Button, Icon } from "semantic-ui-react";
//actions
import { setRootUrl, setRetrieveOrder } from "../../../actions";
//utils
import { history } from "../../../utils/history";
//css
import "../orderHistory-css/orderActions.css";

class ModifyOrderButton extends React.Component {
	modifyOrderClicked = (order) => {
		this.props.setRetrieveOrder(true);
		this.props.setRootUrl(`/modify/${order._id}/`);
		history.push(`/modify/${order._id}`);
	};

	render() {
		const { orderDetails } = this.props;
		return (
			<Button
				className="actionButtonsMargin"
				onClick={() => this.modifyOrderClicked(orderDetails)}
			>
				<Icon name="edit" /> Modify Order
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, {
	setRootUrl,
	setRetrieveOrder,
})(ModifyOrderButton);

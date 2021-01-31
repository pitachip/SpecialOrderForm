//libs
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
//actions
import { setRootUrl } from "../actions";

const withNewOrder = (SpecialOrder) => {
	class WithNewOrderComponent extends React.Component {
		componentDidMount() {
			this.props.setRootUrl("/");
		}

		render() {
			return <SpecialOrder />;
		}
	}
	return WithNewOrderComponent;
};

const mapStateToProps = (state) => {
	return {};
};

//created in order to wrap the connect function with the HOC
const composedNewOrder = compose(
	connect(mapStateToProps, { setRootUrl }),
	withNewOrder
);

export default composedNewOrder;

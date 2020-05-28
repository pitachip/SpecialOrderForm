import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getSpecialOrders } from "../actions";

const SpecialOrder = ({ getSpecialOrders }) => {
	useEffect(() => {
		getSpecialOrders();
	});
	return (
		<div>
			<Button>Generate Invoice</Button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { specialOrder: state.specialOrder };
};

export default connect(mapStateToProps, { getSpecialOrders })(SpecialOrder);

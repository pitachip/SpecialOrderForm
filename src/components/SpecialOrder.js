//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//app componenets
import NavBar from "./navBar";
import Disclaimer from "./disclaimer";
import MenuCategories from "./menuCategories";
import MenuItems from "./menuItems";
import OrderDetails from "./orderDetails";
import { getSpecialOrders, getStoreInformation } from "../actions";

//TODO: Get rid of getSpecialOrders and its resources
class SpecialOrder extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				<Disclaimer />
				<div className="container-fluid">
					<Row>
						<Col md={2}>
							<MenuCategories />
						</Col>
						<Col md={6}>
							<MenuItems />
						</Col>
						<Col md={4}>
							<OrderDetails />
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { specialOrder: state.specialOrder };
};

export default connect(mapStateToProps, {
	getSpecialOrders,
	getStoreInformation,
})(SpecialOrder);

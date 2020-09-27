import React from "react";
import { connect } from "react-redux";
import { getSpecialOrders } from "../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "./navBar";
import Disclaimer from "./disclaimer";
import MenuCategories from "./menuCategories";
import MenuItems from "./menuItems";
import OrderDetails from "./orderDetails";

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

export default connect(mapStateToProps, { getSpecialOrders })(SpecialOrder);

import React from "react";
import { connect } from "react-redux";
import { getSpecialOrders } from "../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "./navBar";
import Disclaimer from "./disclaimer";
import MenuCategories from "./menuCategories";
import MenuDetails from "./menuDetails";
import ShoppingCart from "./shoppingCart";

class SpecialOrder extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				<Disclaimer />
				<Row>
					<Col md={2}>
						<MenuCategories />
					</Col>
					<Col md={7}>
						<MenuDetails />
					</Col>
					<Col md={3}>
						<ShoppingCart />
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { specialOrder: state.specialOrder };
};

export default connect(mapStateToProps, { getSpecialOrders })(SpecialOrder);

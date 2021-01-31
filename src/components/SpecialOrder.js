//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//app componenets
import Disclaimer from "./disclaimer";
import MenuCategories from "./menu/menu-components/menuCategories";
import MenuItems from "./menu/menu-components/menuItems";
import OrderDetails from "./orderDetails";
import { getSpecialOrders } from "../actions";
//css
import "../App.css";

//TODO: Get rid of getSpecialOrders and its resources
class SpecialOrder extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<div className="specialOrderContainer">
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
	return {
		specialOrder: state.specialOrder,
	};
};

export default connect(mapStateToProps, {
	getSpecialOrders,
})(SpecialOrder);

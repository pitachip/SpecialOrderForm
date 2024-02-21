//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Embed, Dimmer, Header } from "semantic-ui-react";
//app componenets
import MenuCategories from "./menu/menu-components/menuCategories";
import MenuItems from "./menu/menu-components/menuItems";
import OrderDetails from "./orderDetails";
import { getSpecialOrders } from "../actions";
//css
import "../App.css";

//TODO: Get rid of getSpecialOrders and its resources
class SpecialOrder extends React.Component {
	componentDidMount() {
		//	window.scrollTo(0, 0);
	}
	render() {
		const { rootUrl } = this.props;
		if (rootUrl === "/") {
			return (
				<div className="specialOrderContainer">
					<Dimmer active page>
						<Header as="h1" icon inverted>
							A New Way to Place Your Order!
						</Header>
						<p>
							We've created a new way for you to place your catering orders that
							are tax exempt or need a special form of payment.
							<br />
							Please watch the instructional video below and after visit{" "}
							<a href="https://www.pitachipphilly.com/catering" target="_blank">
								this link
							</a>{" "}
							to place your order.
						</p>
						<Embed
							id="Wo3X6JG5eQs"
							placeholder="/assets/SpecialOrderInstructions.jpg"
							source="youtube"
						/>
					</Dimmer>
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
		} else {
			return (
				<div className="specialOrderContainer">
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
}

const mapStateToProps = (state) => {
	return {
		specialOrder: state.specialOrder,
		rootUrl: state.navigation.rootUrl,
	};
};

export default connect(mapStateToProps, {
	getSpecialOrders,
})(SpecialOrder);

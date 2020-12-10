//libs
import React from "react";
//ui components
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "../css/menuItemDetail.css";

class ItemQuantity extends React.Component {
	increaseCount = () => {
		this.props.onQuantityChanged(this.props.quantity + 1);
	};
	decreaseCount = () => {
		if (this.props.quantity !== 0) {
			this.props.onQuantityChanged(this.props.quantity - 1);
		}
	};
	render() {
		return (
			<div>
				<Row md={2}>
					<Col className="quantityText">
						<p>Quantity</p>
					</Col>
					<Col className="quantityToggles">
						<div onClick={() => this.decreaseCount()}>
							<IconContext.Provider
								value={{
									style: {
										fontSize: "4em",
										color: "rgb(178, 19, 0)",
										padding: "15px",
									},
								}}
							>
								<MdRemoveCircleOutline />
							</IconContext.Provider>
						</div>
						<div>{this.props.quantity}</div>
						<div onClick={() => this.increaseCount()}>
							<IconContext.Provider
								value={{
									style: {
										fontSize: "4em",
										color: "rgb(178, 19, 0)",
										padding: "15px",
									},
								}}
							>
								<MdAddCircleOutline />
							</IconContext.Provider>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
export default ItemQuantity;

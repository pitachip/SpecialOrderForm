import React from "react";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "../../css/menuItemDetail.css";

class ItemQuantity extends React.Component {
	state = { itemCount: 0 };

	increaseCount = async () => {
		await this.setState({ itemCount: this.state.itemCount + 1 });
		this.props.onQuantityChanged(this.state.itemCount);
	};
	decreaseCount = async () => {
		if (this.state.itemCount !== 0) {
			await this.setState({ itemCount: this.state.itemCount - 1 });
			this.props.onQuantityChanged(this.state.itemCount);
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
						<div>{this.state.itemCount}</div>
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

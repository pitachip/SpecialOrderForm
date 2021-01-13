//libs
import React from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
//ui components
import Modal from "react-bootstrap/Modal";
//app components
import MenuItemDetail from "../menu-components/menuItemDetail";
//actions
import { resetSelection } from "../../../actions";

class AddShoppingCartItemModal extends React.Component {
	modalClosed = () => {
		this.props.resetSelection();
		this.props.close();
	};
	render() {
		const { name, description, basePrice, itemMinimum } = this.props.menuItem;
		return (
			<Modal size="lg" show={this.props.show} onHide={this.modalClosed}>
				<Modal.Header closeButton>
					<Modal.Title>
						{name}
						<br />
						<h6 className="text-muted">{description}</h6>
						<h6 className="text-muted">
							<NumberFormat
								className="nospace"
								value={basePrice / 100}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"$"}
								decimalScale={2}
								fixedDecimalScale="true"
							/>
							{` per person ${
								itemMinimum > 0 ? `| ${itemMinimum} person minimum` : ""
							}`}
						</h6>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MenuItemDetail
						close={this.modalClosed}
						editOrderItem={this.props.editOrderItem}
					/>
				</Modal.Body>
			</Modal>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		menuItem: state.menu.selectedMenuItem,
	};
};

export default connect(mapStateToProps, { resetSelection })(
	AddShoppingCartItemModal
);

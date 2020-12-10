//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Modal from "react-bootstrap/Modal";
//app components
import MenuItemDetail from "../menuItemDetail";

class UpdateShoppingCartItemModal extends React.Component {
	modalClosed = () => {
		this.props.close();
	};
	render() {
		const { menuItem } = this.props.orderItemToEdit;
		return (
			<Modal size="lg" show={this.props.show} onHide={this.modalClosed}>
				<Modal.Header closeButton>
					<Modal.Title>{menuItem}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MenuItemDetail
						close={this.modalClosed}
						editOrderItem={this.props.editOrderItem}
						orderItemToEdit={this.props.orderItemToEdit}
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

export default connect(mapStateToProps, {})(UpdateShoppingCartItemModal);

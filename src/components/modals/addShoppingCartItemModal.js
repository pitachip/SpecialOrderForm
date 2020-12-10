//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Modal from "react-bootstrap/Modal";
//app components
import MenuItemDetail from "../menuItemDetail";

class AddShoppingCartItemModal extends React.Component {
	modalClosed = () => {
		this.props.close();
	};
	render() {
		const { name, description } = this.props.menuItem[0];
		return (
			<Modal size="lg" show={this.props.show} onHide={this.modalClosed}>
				<Modal.Header closeButton>
					<Modal.Title>
						{name}
						<br />
						<h6 className="text-muted">{description}</h6>
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

export default connect(mapStateToProps, {})(AddShoppingCartItemModal);

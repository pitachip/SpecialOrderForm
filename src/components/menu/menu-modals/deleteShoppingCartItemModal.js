//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//actions
import { deleteOrderItem } from "../../../actions";

class DeleteShoppingCartItemModal extends React.Component {
	deleteItemFromShoppingCart = () => {
		this.props.deleteOrderItem(
			this.props.orderItemToDelete,
			this.props.orderItems
		);
		this.props.close();
	};

	render() {
		return (
			<>
				<Modal show={this.props.show} onHide={this.props.close}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Item</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure you want to delete this item from your shopping cart?
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.props.close}>
							Cancel
						</Button>
						<Button variant="danger" onClick={this.deleteItemFromShoppingCart}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderItems: state.order.orderItems,
	};
};

export default connect(mapStateToProps, { deleteOrderItem })(
	DeleteShoppingCartItemModal
);

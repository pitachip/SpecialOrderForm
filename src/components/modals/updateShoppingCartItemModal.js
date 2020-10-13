//libs
import React from "react";
import { connect } from "react-redux";
import each from "lodash/each";
import findKey from "lodash/findKey";
import omit from "lodash/omit";
//ui components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { MdAdd } from "react-icons/md";
//app componenets
import ItemQuantity from "../../utils/itemQuantity";
import {
	validateModifiers,
	filterSelectedModifiers,
	removeErrorMessage,
	createErrorMessage,
} from "../../utils/menuItemValidation";
import { formatSelectionForCheckout } from "../../utils/orderCheckoutUtils";

//actions
import { addItemToOrder } from "../../actions";

class UpdateShoppingCartItemModal extends React.Component {
	render() {
		return (
			<div>
				<Modal size="lg" show={this.props.show} onHide={this.modalClosed}>
					<Modal.Body>This will be the update modal</Modal.Body>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menuItem: state.menu.selectedMenuItem,
	};
};

export default connect(mapStateToProps, { addItemToOrder })(
	UpdateShoppingCartItemModal
);

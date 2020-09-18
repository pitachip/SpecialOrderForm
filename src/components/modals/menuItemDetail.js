import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

class MenuItemDetail extends React.Component {
	render() {
		const { name } = this.props.menuItem[0];
		return (
			<>
				<Modal show={this.props.show} onHide={this.props.close}>
					<Modal.Header closeButton>
						<Modal.Title>{name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.props.close}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menuCategoryId: state.menu.menuCategoryId,
		menuItemId: state.menu.menuItemId,
		menuItem: state.menu.selectedMenuItem,
	};
};

export default connect(mapStateToProps, {})(MenuItemDetail);

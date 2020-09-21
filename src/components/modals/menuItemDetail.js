import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";

class MenuItemDetail extends React.Component {
	renderModalStructure = (name, modifiers) => {
		return (
			<div>
				<Modal size="lg" show={this.props.show} onHide={this.props.close}>
					<Modal.Header closeButton>
						<Modal.Title>{name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{modifiers ? this.renderModifierSections(modifiers) : null}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.props.close}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	};
	renderModifierSections = (modifiers) => {
		return modifiers.map((item) => {
			console.log(item);
			return (
				<div key={item.name}>
					<h4 key={item.name}>{item.name}</h4>
					<p>Choose up to {item.max_number_options}</p>
					<Form>
						<Row>{this.renderModifierOptions(item.options)}</Row>
					</Form>
				</div>
			);
		});
	};

	renderModifierOptions = (options) => {
		return options.map((option) => {
			return (
				<Col xs={6}>
					<Form.Check inline type="checkbox" label={option.name} />
				</Col>
			);
		});
	};
	render() {
		/**
		 * TODO: have to figure out how to add individual validation to each form group
		 */
		const { name, modifiers } = this.props.menuItem[0];

		return (
			<div>{name ? this.renderModalStructure(name, modifiers) : null}</div>
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

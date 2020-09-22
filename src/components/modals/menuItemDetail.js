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
//app componenets
import ItemQuantity from "../utils/itemQuantity";
import { validateModifiers } from "../utils/menuItemValidation";

class MenuItemDetail extends React.Component {
	/**
	 * need to make a reducer to hold the order details but only once the menu item is submitted
	 * need to figure out validation
	 *
	 */

	state = { selection: {} };
	modiferOptionSelected = async (option) => {
		/*
		console.log("Target: ", option.target);
		console.log("Checked: ", option.target.checked);
		console.log("Name: ", option.target.name);
		console.log("Id: ", option.target.id);
		console.log("Category: ", option.target.getAttribute("data-category"));
		*/

		const name = option.target.name;
		const id = option.target.id;
		const category = option.target.getAttribute("data-category");
		const checked = option.target.checked;

		/**Check to see if object needs to be removed
		 * from the state because it has been unchecked
		 */
		if (!option.target.checked) {
			const objectToRemove = findKey(this.state.selection, {
				name: option.target.name,
			});
			await this.setState({
				selection: omit(this.state.selection, objectToRemove),
			});
		} else {
			await this.setState({
				selection: {
					...this.state.selection,
					[id]: {
						name,
						category,
						checked,
					},
				},
			});
		}
	};

	formSubmitted = (e) => {
		const { modifiers } = this.props.menuItem[0];
		console.log("Submit Clicked");
		e.preventDefault();
		/**VALIDATION POC
		 * iterate over entire formControls object (e.g. for each section header...)
		 * maybe need to add a validation object to the inputs
		 * -find how many objects have the same section title > use that number to validate against the
		 *  number required for that section (max_number)
		 */
		//Go through each modifier section
		each(modifiers, (modifier) => {
			console.log("Modifer: ", modifier);
			console.log("Selection: ", this.state.selection);
			validateModifiers();
			//then return a list of all items checked (important) off with that category
			//create a utility function to do this.
		});
	};

	renderModalStructure = (name, modifiers) => {
		return (
			<div>
				<Modal size="lg" show={this.props.show} onHide={this.props.close}>
					<Modal.Header closeButton>
						<Modal.Title>{name}</Modal.Title>
					</Modal.Header>
					<Form onSubmit={(e) => this.formSubmitted(e)}>
						<Modal.Body>
							{modifiers ? this.renderModifierSections(modifiers) : null}
						</Modal.Body>
						<Modal.Footer>
							<Container fluid>
								<ItemQuantity />
								<Button type="submit">Submit</Button>
							</Container>
						</Modal.Footer>
					</Form>
				</Modal>
			</div>
		);
	};
	renderModifierSections = (modifiers) => {
		return modifiers.map((item) => {
			return (
				<div key={item.name}>
					<h4 key={item.name}>{item.name}</h4>
					<p>Choose up to {item.max_number_options}</p>
					<Row>{this.renderModifierOptions(item.options, item.name)}</Row>
				</div>
			);
		});
	};

	renderModifierOptions = (options, categoryName) => {
		return options.map((option) => {
			return (
				<Col xs={6}>
					<Form.Check
						inline
						type="checkbox"
						data-category={categoryName}
						label={option.name}
						name={option.name}
						id={option._id}
						onChange={(e) => {
							this.modiferOptionSelected(e);
						}}
					/>
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

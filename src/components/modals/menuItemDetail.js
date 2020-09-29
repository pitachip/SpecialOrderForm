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
import ItemQuantity from "../utils/itemQuantity";
import {
	validateModifiers,
	filterSelectedModifiers,
	removeErrorMessage,
	createErrorMessage,
} from "../utils/menuItemValidation";
import { formatSelectionForCheckout } from "../utils/orderCheckoutUtils";

//actions
import { addItemToOrder } from "../../actions";

class MenuItemDetail extends React.Component {
	/**
	 * need to make a reducer to hold the order details but only once the menu item is submitted
	 */
	state = { selection: {}, validationErrors: [], quantity: 0 };

	modiferOptionSelected = async (option) => {
		const name = option.target.name;
		const id = option.target.id;
		const modifier = option.target.getAttribute("data-modifier");
		const modifierId = option.target.getAttribute("data-modifier-id");
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
						id,
						modifier,
						modifierId,
						checked,
					},
				},
			});
		}
	};

	quantityUpdated = (quantity) => {
		this.setState({ quantity });
	};

	modalClosed = () => {
		this.setState({ selection: {}, validationErrors: [] });
		this.props.close();
	};

	formSubmitted = async (e) => {
		e.preventDefault();
		const { modifiers } = this.props.menuItem[0];
		let groupedErrorMessages = this.state.validationErrors;

		each(modifiers, (modifier) => {
			//filter the items in that modifier group so that we can validate them
			const filteredModifierItems = filterSelectedModifiers(
				modifier.name,
				this.state.selection
			);
			//validate the filtered modifier items based on the min and max provided in each section
			validateModifiers(
				filteredModifierItems,
				modifier.min_number_options,
				modifier.max_number_options
			);

			if (
				!validateModifiers(
					filteredModifierItems,
					modifier.min_number_options,
					modifier.max_number_options
				)
			) {
				//Create an error message only if it hasn't been created already
				const errorMessage = createErrorMessage(
					this.state.validationErrors,
					modifier.name,
					modifier.min_number_options,
					modifier.max_number_options
				);
				if (errorMessage) {
					groupedErrorMessages.push(errorMessage);
				}
			} else {
				//remove the error message if it was previously in there and the selection has been made
				const removedErrorMessages = removeErrorMessage(
					modifier.name,
					this.state.validationErrors
				);
				if (removedErrorMessages) {
					groupedErrorMessages = removedErrorMessages;
				}
			}
		});
		/**
		 * For whatever reason it's better to set the state at the very end once the loop
		 * is done. That's why I was setting it in a temp variable
		 */
		await this.setState({ validationErrors: groupedErrorMessages });

		if (this.state.validationErrors.length === 0) {
			//create an action to store in a reducer
			this.props.addItemToOrder(
				formatSelectionForCheckout(
					this.props.menuItem,
					this.state.selection,
					this.state.quantity
				)
			);
			this.setState({ selection: {}, validationErrors: [] });
			this.props.close();
		}
	};

	renderErrorMessages = () => {
		return (
			<div>
				<Alert variant="danger">
					<ul>
						{this.state.validationErrors.map((error) => {
							return <li>{error}</li>;
						})}
					</ul>
				</Alert>
			</div>
		);
	};

	renderModalStructure = (menuItemName, modifiers) => {
		return (
			<div>
				<Modal size="lg" show={this.props.show} onHide={this.modalClosed}>
					<Modal.Header closeButton>
						<Modal.Title>{menuItemName}</Modal.Title>
					</Modal.Header>
					<Form onSubmit={(e) => this.formSubmitted(e)}>
						<Modal.Body>
							{modifiers ? this.renderModifierSections(modifiers) : null}
						</Modal.Body>
						<Modal.Footer>
							<Container fluid>
								<ItemQuantity onQuantityChanged={this.quantityUpdated} />
								<Button type="submit" block>
									<MdAdd />
									Add to Order
								</Button>
							</Container>
							{this.state.validationErrors.length > 0
								? this.renderErrorMessages()
								: null}
						</Modal.Footer>
					</Form>
				</Modal>
			</div>
		);
	};
	renderModifierSections = (modifiers) => {
		return modifiers.map((modifier) => {
			return (
				<div key={modifier.name}>
					<h4 key={modifier.name}>{modifier.name}</h4>
					<p>Choose up to {modifier.max_number_options}</p>
					<Row>
						{this.renderModifierOptions(
							modifier.options,
							modifier.name,
							modifier._id
						)}
					</Row>
				</div>
			);
		});
	};

	renderModifierOptions = (modifierOptions, modifierName, modifierId) => {
		return modifierOptions.map((option) => {
			return (
				<Col xs={6}>
					<Form.Check
						inline
						type="checkbox"
						data-modifier={modifierName}
						data-modifier-id={modifierId}
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
		const { name, modifiers } = this.props.menuItem[0];

		return (
			<div>{name ? this.renderModalStructure(name, modifiers) : null}</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menuItem: state.menu.selectedMenuItem,
	};
};

export default connect(mapStateToProps, { addItemToOrder })(MenuItemDetail);

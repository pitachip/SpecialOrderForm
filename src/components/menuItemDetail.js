//libs
import React from "react";
import { connect } from "react-redux";
import each from "lodash/each";
import findKey from "lodash/findKey";
import omit from "lodash/omit";
//ui components
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { MdAdd, MdCreate } from "react-icons/md";
//utils
import ItemQuantity from "../utils/itemQuantity";
import {
	validateModifiers,
	filterSelectedModifiers,
	removeErrorMessage,
	createErrorMessage,
	validateQuantity,
	createQuantityErrorMessage,
} from "../utils/menuItemValidation";
import {
	formatSelectionForCheckout,
	calculateTotals,
} from "../utils/orderCheckoutUtils";
//actions
import { addItemToOrder, updateOrderItem, updateOrderTotals } from "../actions";

class ModifierOptionCheckbox extends React.Component {
	state = { checked: false };

	componentDidMount() {
		if (this.props.selection) {
			let wasSelected = false;
			wasSelected = this.wasOptionSelected(
				this.props.option._id,
				this.props.selection
			);
			if (wasSelected) {
				this.setState({ checked: wasSelected });
			}
		}
	}
	//TODO: put this in the utils once it works
	wasOptionSelected = (optionId, selection) => {
		let wasSelected = false;
		wasSelected = findKey(selection, { id: optionId });
		return wasSelected ? true : false;
	};
	render() {
		const { modifierName, modifierId, option } = this.props;
		return (
			<div>
				<Form.Check
					inline
					type="checkbox"
					data-modifier={modifierName}
					data-modifier-id={modifierId}
					label={option.name}
					name={option.name}
					id={option._id}
					onChange={(e) => {
						this.props.checkboxSelected(e);
						this.setState({ checked: e.target.checked });
					}}
					checked={this.state.checked}
				/>
			</div>
		);
	}
}

class MenuItemDetail extends React.Component {
	state = {
		selection: {},
		validationErrors: [],
		quantity: 0,
		specialInStructions: "",
	};

	componentDidMount() {
		if (this.props.editOrderItem) {
			this.setState({
				selection: this.props.orderItemToEdit.originalSelectionFormat,
				specialInstructions: this.props.orderItemToEdit.specialInstructions,
			});
			this.quantityUpdated(this.props.orderItemToEdit.quantity);
		}
	}

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

		//Validating Quantity TODO: Lots of refactoring needed here
		const quantityValidationError = validateQuantity(this.state.quantity);
		if (quantityValidationError) {
			const quantityErrorMessage = createQuantityErrorMessage(
				this.state.validationErrors,
				"Quantity"
			);
			console.log(quantityErrorMessage);
			if (quantityErrorMessage < 0 || quantityErrorMessage === 0) {
				groupedErrorMessages.push(quantityValidationError);
			}
		} else {
			//remove the error message if its already in there
			const removedQuantityValidationMessage = removeErrorMessage(
				"Quantity",
				this.state.validationErrors
			);
			if (removedQuantityValidationMessage) {
				groupedErrorMessages = removedQuantityValidationMessage;
			}
		}
		/**
		 * For whatever reason it's better to set the state at the very end once the loop
		 * is done. That's why I was setting it in a temp variable
		 */
		await this.setState({ validationErrors: groupedErrorMessages });

		//Need logic here to replace the item that was being edited
		if (this.state.validationErrors.length === 0 && !this.props.editOrderItem) {
			this.props.addItemToOrder(
				formatSelectionForCheckout(
					this.props.menuItem,
					this.state.selection,
					this.state.quantity,
					this.state.specialInstructions
				)
			);
			this.setState({ selection: {}, validationErrors: [] });
			this.props.close();
		} else if (
			this.state.validationErrors.length === 0 &&
			this.props.editOrderItem
		) {
			this.props.updateOrderItem(
				formatSelectionForCheckout(
					this.props.menuItem,
					this.state.selection,
					this.state.quantity,
					this.state.specialInstructions,
					this.props.editOrderItem,
					this.props.orderItemToEdit.uniqueId
				),
				this.props.orderItems
			);
			const calculatedAmounts = calculateTotals(
				this.props.orderItems,
				this.props.menuConfig.settings,
				this.props.orderDetails.shippingMethod
			);
			this.props.updateOrderTotals(calculatedAmounts);
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
							return <li key={error}>{error}</li>;
						})}
					</ul>
				</Alert>
			</div>
		);
	};

	renderModifierOptions = (modifierOptions, modifierName, modifierId) => {
		return modifierOptions.map((option) => {
			return (
				<Col xs={6} key={option._id}>
					<ModifierOptionCheckbox
						modifierName={modifierName}
						modifierId={modifierId}
						option={option}
						checkboxSelected={this.modiferOptionSelected}
						selection={
							this.props.editOrderItem
								? this.props.orderItemToEdit.originalSelectionFormat
								: null
						}
					/>
				</Col>
			);
		});
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

	renderForm = (menuItemName, modifiers, submitLabel, submitIcon) => {
		return (
			<div>
				<Form onSubmit={(e) => this.formSubmitted(e)}>
					{modifiers ? this.renderModifierSections(modifiers) : null}
					<Form.Group>
						<Form.Control
							as="textarea"
							rows="2"
							placeholder="Let us know about any special requests you need for this order"
							value={this.state.specialInstructions}
							onChange={(e) =>
								this.setState({ specialInstructions: e.target.value })
							}
						/>
					</Form.Group>
					<Container fluid>
						<ItemQuantity
							onQuantityChanged={this.quantityUpdated}
							quantity={this.state.quantity}
						/>
						<Button type="submit" block>
							{submitIcon}&nbsp;{submitLabel}
						</Button>
					</Container>
					{this.state.validationErrors.length > 0
						? this.renderErrorMessages()
						: null}
				</Form>
			</div>
		);
	};

	renderAddItem = () => {
		const { name, modifiers } = this.props.menuItem[0];
		return this.renderForm(name, modifiers, "Add to Order", <MdAdd />);
	};
	renderEditItem = () => {
		/**
		 * Load in values from redux based on the menu item that was selected
		 * for that shopping cart item
		 */
		const { name, modifiers } = this.props.orderItemToEdit.originalMenuItem;
		return this.renderForm(name, modifiers, "Update Item", <MdCreate />);
	};
	/**
	 * Determine if we are adding a new item or editing one
	 */
	render() {
		return (
			<div>
				{!this.props.editOrderItem
					? this.renderAddItem()
					: this.renderEditItem()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menuItem: state.menu.selectedMenuItem,
		orderItems: state.order.orderItems,
		menuConfig: state.menu.menuConfig,
		orderDetails: state.order.orderDetails,
	};
};

export default connect(mapStateToProps, {
	addItemToOrder,
	updateOrderItem,
	updateOrderTotals,
})(MenuItemDetail);

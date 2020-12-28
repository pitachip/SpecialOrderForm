//libs
import React from "react";
import { connect } from "react-redux";
import each from "lodash/each";
//ui components
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { MdAdd, MdCreate } from "react-icons/md";
import { Card } from "semantic-ui-react";
//app components
import ModifierOptionRadio from "./modifierOptionRadio";
import ModifierOptionCheckbox from "./modifierOptionCheckbox";
//utils
import ItemQuantity from "../../../utils/itemQuantity";
import {
	validateModifiers,
	filterSelectedModifiers,
	removeErrorMessage,
	createErrorMessage,
	validateQuantity,
	createQuantityErrorMessage,
} from "../../../utils/menuItemValidation";
import {
	formatSelectionForCheckout,
	calculateTotals,
} from "../../../utils/orderCheckoutUtils";
//actions
import {
	addItemToOrder,
	updateOrderItem,
	updateOrderTotals,
	resetSelection,
} from "../../../actions";
//css
import "../menu-css/menuItemDetail.css";

class MenuItemDetail extends React.Component {
	/**
	 * TODO:
	 * 7. refactor quantity a bit
	 */
	state = {
		validationErrors: [],
		quantity: 0,
		specialInStructions: "",
	};

	componentDidMount() {
		if (this.props.editOrderItem) {
			this.setState({
				specialInstructions: this.props.orderItemToEdit.specialInstructions,
			});
			this.quantityUpdated(this.props.orderItemToEdit.quantity);
		}
	}

	quantityUpdated = (quantity) => {
		this.setState({ quantity });
	};

	formSubmitted = async (e) => {
		e.preventDefault();
		const { modifiers, itemMinimum } = this.props.menuItem[0];
		const { selection } = this.props;
		let groupedErrorMessages = this.state.validationErrors;

		each(modifiers, (modifier) => {
			//filter the items in that modifier group so that we can validate them
			const filteredModifierItems = filterSelectedModifiers(
				modifier.name,
				selection
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
		const quantityValidationError = validateQuantity(
			this.state.quantity,
			itemMinimum
		);
		if (quantityValidationError) {
			const quantityErrorMessage = createQuantityErrorMessage(
				this.state.validationErrors,
				"Number of guests"
			);
			if (quantityErrorMessage < 0 || quantityErrorMessage === 0) {
				groupedErrorMessages.push(quantityValidationError);
			}
		} else {
			//remove the error message if its already in there
			const removedQuantityValidationMessage = removeErrorMessage(
				"Number of guests",
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
					this.props.selection,
					this.state.quantity,
					this.state.specialInstructions
				)
			);
			this.setState({ validationErrors: [] });
			this.props.close();
		} else if (
			this.state.validationErrors.length === 0 &&
			this.props.editOrderItem
		) {
			this.props.updateOrderItem(
				formatSelectionForCheckout(
					this.props.menuItem,
					this.props.selection,
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
			this.setState({ validationErrors: [] });
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

	renderModifierOptions = (
		modifierOptions,
		modifierName,
		modifierId,
		maxOptions
	) => {
		if (maxOptions === 1) {
			//Need to render them all together to manage their state.
			return (
				<ModifierOptionRadio
					modifierOptions={modifierOptions}
					modifierName={modifierName}
					modifierId={modifierId}
					edit={this.props.editOrderItem}
					orderItemToEdit={this.props.orderItemToEdit}
				/>
			);
		} else {
			return modifierOptions.map((option) => {
				return (
					<Col xs={6} key={option._id}>
						<ModifierOptionCheckbox
							modifierName={modifierName}
							modifierId={modifierId}
							option={option}
							edit={this.props.editOrderItem}
							orderItemToEdit={this.props.orderItemToEdit}
						/>
					</Col>
				);
			});
		}
	};

	renderModifierSections = (modifiers) => {
		return modifiers.map((modifier) => {
			return (
				<Card fluid color="red" key={modifier.name}>
					<Card.Content>
						<Card.Header
							className={`${modifier.min_number_options > 0 ? "required" : ""}`}
						>
							{modifier.name}
						</Card.Header>
						{modifier.min_number_options > 0 ? (
							<Card.Meta>Choose up to {modifier.max_number_options}</Card.Meta>
						) : null}
						<Row>
							{this.renderModifierOptions(
								modifier.options,
								modifier.name,
								modifier._id,
								modifier.max_number_options
							)}
						</Row>
					</Card.Content>
				</Card>
			);
		});
	};

	renderForm = (menuItemName, modifiers, submitLabel, submitIcon) => {
		return (
			<div>
				<div style={{ marginBottom: "10px" }}>
					<p>
						<span style={{ color: "red" }}>*</span> = Required
					</p>
				</div>
				<Form onSubmit={(e) => this.formSubmitted(e)}>
					{modifiers ? this.renderModifierSections(modifiers) : null}
					<Card fluid color="red">
						<Card.Content>
							<Card.Header className="specialInstructions">
								Special Instructions
							</Card.Header>
							<Form.Group>
								<Form.Control
									as="textarea"
									rows="2"
									placeholder="Let us know about any special requests you have for this item"
									value={this.state.specialInstructions}
									onChange={(e) =>
										this.setState({ specialInstructions: e.target.value })
									}
								/>
							</Form.Group>
						</Card.Content>
					</Card>
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
		selection: state.menu.selection,
		validationErrors: state.menu.validationErrors,
	};
};

export default connect(mapStateToProps, {
	addItemToOrder,
	updateOrderItem,
	updateOrderTotals,
	resetSelection,
})(MenuItemDetail);

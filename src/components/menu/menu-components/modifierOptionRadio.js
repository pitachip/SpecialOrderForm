//libs
import React from "react";
import { connect } from "react-redux";
import findKey from "lodash/findKey";
import each from "lodash/each";
//ui components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
//actions
import {
	addModifierSelection,
	removeModifierSelection,
	loadSelectionToEdit,
} from "../../../actions";

class ModifierOptionRadio extends React.Component {
	state = { value: "" };

	async componentDidMount() {
		const { edit, loadSelectionToEdit } = this.props;
		if (edit) {
			let wasSelected = false;

			await loadSelectionToEdit(
				this.props.orderItemToEdit.originalSelectionFormat
			);
			wasSelected = this.wasOptionSelected(
				this.props.modifierOptions,
				this.props.selection
			);
			if (wasSelected) {
				this.setState({ value: wasSelected });
			}
		} else {
			//Add the default selections
			const {
				modifierOptions,
				addModifierSelection,
				modifierName,
				modifierId,
			} = this.props;
			each(modifierOptions, (option) => {
				if (option.default) {
					const { _id, name, price } = option;
					this.setState({ value: option._id });
					addModifierSelection(
						name,
						_id,
						modifierName,
						modifierId,
						true,
						price
					);
				}
			});
		}
	}

	//TODO: put this in the utils once it works
	wasOptionSelected = (modifierOptions, selection) => {
		let wasSelected = false;
		each(modifierOptions, (option) => {
			let findItem = findKey(selection, { id: option._id });
			if (findItem) {
				wasSelected = findItem;
			}
		});
		return wasSelected;
	};

	modifierOptionSelected = (
		name,
		id,
		modifierName,
		modifierId,
		checked,
		price
	) => {
		const {
			addModifierSelection,
			removeModifierSelection,
			selection,
		} = this.props;

		const modifierToRemove = findKey(selection, {
			modifierName: modifierName,
		});

		//Remove any existing radio modifiers that were selected
		removeModifierSelection(modifierToRemove, selection);

		//add the new one that was clicked
		addModifierSelection(name, id, modifierName, modifierId, checked, price);
	};

	render() {
		const { modifierName, modifierId, modifierOptions } = this.props;
		return modifierOptions.map((option) => {
			return (
				<Col xs={6} key={option._id}>
					<Form.Check
						inline
						type="radio"
						data-modifier={modifierName}
						data-modifier-name={option.name}
						data-modifier-id={modifierId}
						name={modifierName}
						label={option.name}
						id={option._id}
						onChange={(e) => {
							this.modifierOptionSelected(
								option.name,
								option._id,
								modifierName,
								modifierId,
								true,
								option.price
							);
							this.setState({ value: e.target.value });
						}}
						checked={this.state.value === option._id}
						value={option._id}
					/>
				</Col>
			);
		});
	}
}

const mapStateToProps = (state) => {
	return {
		selection: state.menu.selection,
	};
};

export default connect(mapStateToProps, {
	addModifierSelection,
	removeModifierSelection,
	loadSelectionToEdit,
})(ModifierOptionRadio);

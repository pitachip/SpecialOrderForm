//libs
import React from "react";
import { connect } from "react-redux";
import findKey from "lodash/findKey";
//ui components
import Form from "react-bootstrap/Form";
//actions
import {
	addModifierSelection,
	removeModifierSelection,
} from "../../../actions";

class ModifierOptionCheckbox extends React.Component {
	state = { checked: false };

	componentDidMount() {
		const { edit } = this.props;
		if (edit) {
			let wasSelected = false;
			wasSelected = this.wasOptionSelected(
				this.props.option._id,
				this.props.selection
			);
			if (wasSelected) {
				this.setState({ checked: wasSelected });
			}
		} else {
			//Set the default options (e.g. popular options)
			const {
				option,
				modifierName,
				modifierId,
				addModifierSelection,
			} = this.props;
			if (option.default) {
				addModifierSelection(
					option.name,
					option._id,
					modifierName,
					modifierId,
					true
				);
				this.setState({ checked: true });
			}
		}
	}
	modifierOptionSelected = (name, id, modifierName, modifierId, checked) => {
		const {
			addModifierSelection,
			removeModifierSelection,
			selection,
		} = this.props;

		if (!checked) {
			const modifierToRemove = findKey(selection, {
				name: name,
			});
			removeModifierSelection(modifierToRemove, selection);
		} else {
			addModifierSelection(name, id, modifierName, modifierId, checked);
		}
	};
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
					data-modifier-name={option.name}
					label={option.name}
					name={option.name}
					id={option._id}
					onChange={(e) => {
						this.modifierOptionSelected(
							option.name,
							option._id,
							modifierName,
							modifierId,
							e.target.checked
						);
						this.setState({ checked: e.target.checked });
					}}
					checked={this.state.checked}
				/>
			</div>
		);
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
})(ModifierOptionCheckbox);

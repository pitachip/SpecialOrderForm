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
} from "../../../actions";

class ModifierOptionRadio extends React.Component {
	state = { value: "" };

	componentDidMount() {
		const { edit } = this.props;
		if (edit) {
			let wasSelected = false;
			wasSelected = this.wasOptionSelected(
				this.props.modifierOptions,
				this.props.selection
			);
			if (wasSelected) {
				this.setState({ value: wasSelected });
			}
		} else {
			//Add the default selections
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

	modifierOptionSelected = (name, id, modifierName, modifierId, checked) => {
		const {
			addModifierSelection,
			removeModifierSelection,
			selection,
		} = this.props;

		/**
		 * TODO:
		 * Need to figure out a way to first remove the previously selected radio button
		 * iterate over the options and any that doesnt equal the one passed in should be removed?
		 */

		if (!checked) {
			const modifierToRemove = findKey(selection, {
				name: name,
			});
			removeModifierSelection(modifierToRemove, selection);
		} else {
			addModifierSelection(name, id, modifierName, modifierId, checked);
		}
	};

	render() {
		const { modifierName, modifierId, modifierOptions, selection } = this.props;
		console.log(selection);
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
								true
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
})(ModifierOptionRadio);

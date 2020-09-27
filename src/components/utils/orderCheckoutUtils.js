import pickBy from "lodash/pickBy";
import each from "lodash/each";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";

export const formatSelectionForCheckout = (menuItem, selections, quantity) => {
	let formattedSelection = {};

	formattedSelection = {
		menuItem: menuItem[0].name,
		basePrice: menuItem[0].basePrice,
		quantity,
		modifiers: [],
	};

	each(menuItem[0].modifiers, (modifier) => {
		const modifierChoices = pickBy(selections, { modifierId: modifier._id });

		if (!isEmpty(modifierChoices)) {
			let modifierChoiceArray = [];

			map(modifierChoices, (modifierChoice) => {
				modifierChoiceArray.push({
					name: modifierChoice.name,
					modifierChoiceId: modifierChoice.id,
				});
			});

			formattedSelection.modifiers.push({
				modifierId: modifier._id,
				modifierName: modifier.name,
				modifierChoices: modifierChoiceArray,
			});
		}
	});

	return formattedSelection;
};

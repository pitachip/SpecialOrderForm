import pickBy from "lodash/pickBy";
import each from "lodash/each";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";

export const formatSelectionForCheckout = (
	menuItem,
	selections,
	quantity,
	specialInstructions
) => {
	let formattedSelection = {};

	formattedSelection = {
		menuItem: menuItem[0].name,
		basePrice: menuItem[0].basePrice,
		quantity,
		specialInstructions,
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

export const calculateTotals = (
	orderItems,
	menuConfigSettings,
	shippingMethod
) => {
	const deliveryFee = menuConfigSettings.cateringDeliveryFee;
	let totals = {
		subTotal: 0,
		tax: 0,
		total: 0,
		delivery: shippingMethod === "delivery" ? deliveryFee : 0,
	};

	each(orderItems, (item) => {
		totals.subTotal = totals.subTotal + item.quantity * (item.basePrice / 100);
		totals.tax = totals.subTotal * menuConfigSettings.taxRate;
		totals.total = totals.subTotal + totals.tax + totals.delivery;
	});

	return totals;
};

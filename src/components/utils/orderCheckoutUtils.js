export const formatSelectionForCheckout = (menuItem, selections, quantity) => {
	let formattedSelection = {};
	console.log("Menu Item: ", menuItem);
	console.log("Selections: ", selections);

	formattedSelection = {
		menuItem: menuItem[0].name,
		basePrice: menuItem[0].basePrice,
		quantity,
		modifiers: [],
	};

	/**
	 * !!!Try first to see if you can use the id of the modifier instead of the item id in the set state
	 * for each modifier id
	 * try to find that modifier id in the selections
	 * if yes, see if that modifier exists in the array already
	 * if it does, then add each modifier choice to that part of the array
	 * if not add it to the array and add its choices after that
	 */

	return formattedSelection;
};

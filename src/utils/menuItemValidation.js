import pickBy from "lodash/pickBy";

//TODO: refactor this a bit to be more clean
/** See if the right amount of checkboxes have been selected for that section */
export const validateModifiers = (
	selectedModifiers,
	minSelection,
	maxSelection
) => {
	if (
		Object.keys(selectedModifiers).length > maxSelection ||
		Object.keys(selectedModifiers).length < minSelection
	) {
		return false;
	} else {
		return true;
	}
};

export const filterSelectedModifiers = (modifier, modifierItems) => {
	return pickBy(modifierItems, { modifierName: modifier });
};

export const removeErrorMessage = (modifier, errorMessages) => {
	if (errorMessages.length === 0) {
		return null;
	} else {
		const errorMessageToDelete = errorMessages.filter((el) => {
			return el.indexOf(modifier) > -1;
		});

		const newErrorMessageArray = errorMessages.indexOf(errorMessageToDelete[0]);

		if (newErrorMessageArray > -1) {
			errorMessages.splice(newErrorMessageArray, 1);
		}
		return errorMessages;
	}
};

export const createErrorMessage = (
	errorMessageArray,
	modifier,
	minSelection,
	maxSelection
) => {
	//only create it if it doesnt exist already in the array
	//return an array to be set as the new state
	let errorMessage;

	const errorAlreadyExists = errorMessageArray.filter((el) => {
		return el.indexOf(modifier) > -1;
	}).length;

	if (errorAlreadyExists < 0 || errorAlreadyExists === 0) {
		errorMessage =
			modifier +
			": Must select between " +
			minSelection +
			" and " +
			maxSelection;
	}
	return errorMessage;
};

export const validateQuantity = (quantity, itemMinimum) => {
	if (itemMinimum > 0) {
		return quantity < itemMinimum
			? `Number of guests must be at least ${itemMinimum}`
			: null;
	} else {
		return quantity <= 0 ? "Number of guests must be greater than 0" : null;
	}
};

export const createQuantityErrorMessage = (errorMessageArray, message) => {
	//only create it if it doesnt exist already in the array
	//return an array to be set as the new state
	let errorMessage;

	const errorAlreadyExists = errorMessageArray.filter((el) => {
		return el.indexOf(message) > -1;
	}).length;

	if (errorAlreadyExists < 0 || errorAlreadyExists === 0) {
		errorMessage = errorAlreadyExists;
	}
	return errorMessage;
};

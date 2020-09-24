import pickBy from "lodash//pickBy";

//TODO: refactor this a bit to be more clean
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
	return pickBy(modifierItems, { category: modifier });
};

export const removeErrorMessage = (modifier, errorMessages) => {
	console.log("error messages coming into delete", errorMessages);
	if (errorMessages.length === 0) {
		return null;
	} else {
		const errorMessageToDelete = errorMessages.filter((el) => {
			return el.indexOf(modifier) > -1;
		});
		console.log("Error Message to Delete Index: ", errorMessageToDelete);

		const newErrorMessageArray = errorMessages.indexOf(errorMessageToDelete[0]);
		console.log("New Message Array Index: ", newErrorMessageArray);
		if (newErrorMessageArray > -1) {
			errorMessages.splice(newErrorMessageArray, 1);
		}

		//console.log("error message to delete: ", errorMessageToDelete);

		//errorMessages = errorMessages.filter((e) => e !== errorMessageToDelete);

		console.log("Value of new error messages after delete ", errorMessages);
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

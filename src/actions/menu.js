import pitachip from "../apis/pitachip";
import filter from "lodash/filter";
import omit from "lodash/omit";

export const getMenu = () => async (dispatch) => {
	const response = await pitachip.get("/menu");
	dispatch({ type: "SET_MENU", payload: response.data });
};

export const getMenuConfig = () => async (dispatch) => {
	let response = await pitachip.get("/config");
	response = filter(response.data, { type: "menuConfig" });
	dispatch({ type: "SET_MENU_CONFIG", payload: response[0] });
};

export const setMenuCategory = (categoryId) => (dispatch) => {
	dispatch({ type: "SET_MENU_CATEGORY", payload: categoryId });
};

export const setMenuItem = (menuItemId, menuCategoryId, menuCategories) => (
	dispatch
) => {
	//filter the right category
	const menuCategory = filter(menuCategories, {
		_id: menuCategoryId,
	});
	const menuItems = menuCategory[0].items;

	//filter the right item
	const menuItem = filter(menuItems, { _id: menuItemId });

	dispatch({ type: "SET_MENU_ITEM", payload: { menuItemId, menuItem } });
};

export const addModifierSelection = (
	name,
	id,
	modifierName,
	modifierId,
	checked
) => (dispatch) => {
	dispatch({
		type: "ADD_MODIFIER_SELECTION",
		payload: { name, id, modifierName, modifierId, checked },
	});
};

export const removeModifierSelection = (objectToRemove, selection) => (
	dispatch
) => {
	const updatedSelection = omit(selection, objectToRemove);
	dispatch({ type: "REMOVE_MODIFIER_SELECTION", payload: updatedSelection });
};

export const resetSelection = () => (dispatch) => {
	dispatch({
		type: "RESET_SELECTION",
		payload: { selection: {}, validationErrors: [] },
	});
};

export const loadSelectionToEdit = (selection) => async (dispatch) => {
	await dispatch({ type: "LOAD_SELECTION", payload: selection });
};

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

export const setMenuItem = (menuItem) => (dispatch) => {
	dispatch({ type: "SET_MENU_ITEM", payload: { menuItem } });
};

export const addModifierSelection = (
	name,
	id,
	modifierName,
	modifierId,
	checked,
	price
) => (dispatch) => {
	dispatch({
		type: "ADD_MODIFIER_SELECTION",
		payload: { name, id, modifierName, modifierId, checked, price },
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
		payload: { selection: {} },
	});
};

export const loadSelectionToEdit = (selection) => async (dispatch) => {
	await dispatch({ type: "LOAD_SELECTION", payload: selection });
};

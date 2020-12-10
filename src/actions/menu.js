import pitachip from "../apis/pitachip";
import filter from "lodash/filter";

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

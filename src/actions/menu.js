import pitachip from "../apis/pitachip";

export const getMenu = () => async (dispatch) => {
	const response = await pitachip.get("/menu");
	dispatch({ type: "SET_MENU", payload: response.data });
};

export const setMenuCategory = (categoryId) => (dispatch) => {
	dispatch({ type: "SET_MENU_CATEGORY", payload: categoryId });
};

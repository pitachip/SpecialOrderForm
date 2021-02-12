export const setActiveMenuTab = (menuTab) => (dispatch) => {
	dispatch({ type: "SET_ACTIVE_MENU_TAB", payload: menuTab });
};

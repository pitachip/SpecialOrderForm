const INITIAL_STATE = {
	menu: [],
	menuItems: [],
	menuCategoryId: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_MENU":
			return { ...state, menu: action.payload };
		case "SET_MENU_CATEGORY":
			return { ...state, menuCategoryId: action.payload };
		default:
			return state;
	}
};

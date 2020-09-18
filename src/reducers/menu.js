const INITIAL_STATE = {
	menu: [],
	menuItems: [],
	menuCategoryId: null,
	menuItemId: null,
	selectedMenuItem: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_MENU":
			return { ...state, menu: action.payload };
		case "SET_MENU_CATEGORY":
			return { ...state, menuCategoryId: action.payload };
		case "SET_MENU_ITEM":
			return {
				...state,
				menuItemId: action.payload.menuItemId,
				selectedMenuItem: action.payload.menuItem,
			};
		default:
			return state;
	}
};

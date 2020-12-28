const INITIAL_STATE = {
	menu: [],
	menuItems: [],
	menuCategoryId: null,
	menuItemId: null,
	selectedMenuItem: null,
	menuConfig: {
		settings: {
			minimumOrderAmount: 0,
		},
	},
	selection: {},
	quantity: 0,
	specialInsructions: "",
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_MENU":
			return { ...state, menu: action.payload };
		case "SET_MENU_CONFIG":
			return { ...state, menuConfig: action.payload };
		case "SET_MENU_CATEGORY":
			return { ...state, menuCategoryId: action.payload };
		case "SET_MENU_ITEM":
			return {
				...state,
				menuItemId: action.payload.menuItemId,
				selectedMenuItem: action.payload.menuItem,
			};
		case "ADD_MODIFIER_SELECTION":
			return {
				...state,
				selection: {
					...state.selection,
					[action.payload.id]: {
						name: action.payload.name,
						id: action.payload.id,
						modifierName: action.payload.modifierName,
						modifierId: action.payload.modifierId,
						checked: action.payload.checked,
						price: action.payload.price,
					},
				},
			};
		case "REMOVE_MODIFIER_SELECTION":
			return {
				...state,
				selection: action.payload,
			};
		case "RESET_SELECTION":
			return {
				...state,
				selection: action.payload.selection,
			};
		case "LOAD_SELECTION":
			return {
				...state,
				selection: action.payload,
			};
		default:
			return state;
	}
};

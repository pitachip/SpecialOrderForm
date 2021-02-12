const INITIAL_STATE = {
	activeMenuTab: "account details",
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_ACTIVE_MENU_TAB":
			return {
				...state,
				activeMenuTab: action.payload,
			};
		default:
			return state;
	}
};

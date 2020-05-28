const INITIAL_STATE = {
	specialOrder: {},
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_SPECIAL_ORDER":
			return { ...state, sectors: action.payload };
		default:
			return state;
	}
};

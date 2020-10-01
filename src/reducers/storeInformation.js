const INITIAL_STATE = {
	storeInformation: {
		locations: [],
	},
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_STORE_INFORMATION":
			return { storeInformation: action.payload };
		default:
			return state;
	}
};

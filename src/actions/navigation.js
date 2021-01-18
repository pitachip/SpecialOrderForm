export const setRootUrl = (rootUrl) => (dispatch) => {
	dispatch({ type: "SET_ROOT_URL", payload: rootUrl });
};

export const setRetrieveOrder = (flag) => (dispatch) => {
	dispatch({ type: "SET_RETRIEVE_ORDER", payload: flag });
};

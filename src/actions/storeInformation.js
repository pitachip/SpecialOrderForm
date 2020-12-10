import pitachip from "../apis/pitachip";
import filter from "lodash/filter";

export const getStoreInformation = () => async (dispatch) => {
	let response = await pitachip.get("/config");
	response = filter(response.data, { type: "storeInformation" });
	dispatch({ type: "SET_STORE_INFORMATION", payload: response[0] });
};

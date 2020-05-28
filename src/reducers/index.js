import { combineReducers } from "redux";
import specialOrderReducer from "./specialOrderReducer";

export default combineReducers({
	specialOrder: specialOrderReducer,
});

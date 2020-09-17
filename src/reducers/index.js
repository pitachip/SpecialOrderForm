import { combineReducers } from "redux";
import specialOrderReducer from "./specialOrderReducer";
import menuReducer from "./menu";

export default combineReducers({
	specialOrder: specialOrderReducer,
	menu: menuReducer,
});

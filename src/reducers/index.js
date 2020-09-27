import { combineReducers } from "redux";
import specialOrderReducer from "./specialOrderReducer";
import menuReducer from "./menu";
import orderDetailsReducer from "./orderDetails";

export default combineReducers({
	specialOrder: specialOrderReducer,
	menu: menuReducer,
	order: orderDetailsReducer,
});

import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import specialOrderReducer from "./specialOrderReducer";
import menuReducer from "./menu";
import orderDetailsReducer from "./orderDetails";
import storeInformation from "./storeInformation";
import authReducer from "./auth";
import orderHistoryReducer from "./orderHistory";
import navigationReducer from "./navigation";

export default combineReducers({
	specialOrder: specialOrderReducer,
	menu: menuReducer,
	order: orderDetailsReducer,
	storeInformation: storeInformation,
	auth: authReducer,
	orderHistory: orderHistoryReducer,
	navigation: navigationReducer,
	form: reduxFormReducer,
});

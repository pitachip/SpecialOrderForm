import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist"; // imports from redux-persist
import storage from "redux-persist/lib/storage/session"; // defaults to localStorage for web
import thunk from "redux-thunk";

import rootReducer from "./reducers"; // Root reducer

const persistConfig = {
	// configuration object for redux-persist
	key: "root",
	storage, // define which storage to use
	blacklist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
	applyMiddleware(thunk) // add any middlewares here
);

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export { store, persistor };

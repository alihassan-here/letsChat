import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";
import userReducer from "../features/userSlice";
import { persistReducer, persistStore } from "redux-persist";


//saveUserOnlyFilter
const saveUserOnlyFilter = createFilter("user", ["user"])
//persist configuration
const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"],
    transforms: [saveUserOnlyFilter]
}
const rootReducer = combineReducers({
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
    ,
    devTools: true
});

export const persister = persistStore(store);
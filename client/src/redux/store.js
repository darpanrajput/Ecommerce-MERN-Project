import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  //blacklist: ["cart"],// the cart doesn't persist
  //whitelist: ["cart"],//only store the cart as persisted data
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: {
  //   cart: cartReducer,
  //   // user: userReducer,
  //   user: persistedReducer,only user is persisted
  // },

  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

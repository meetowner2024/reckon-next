"use client";
import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "@/components/store/slices/projectsSlice"
import footerReducer from "@/components/store/slices/footerSlice"
import headerReducer from "@/components/store/slices/headerSlice"
import contactReducer from "@/components/store/slices/contactSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";


const rootReducer = combineReducers({
  projects: projectsReducer,
  footer:footerReducer,
  header:headerReducer,
  contact:contactReducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

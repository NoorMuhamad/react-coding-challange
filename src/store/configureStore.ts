import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import nodesReducer from "../reducers/nodes";
import blockReducer from "../reducers/blocks"

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    block: blockReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

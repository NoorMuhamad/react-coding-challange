import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { RootState } from "../store/configureStore";
import fetch from "cross-fetch";



export const checkNodeBlock = createAsyncThunk(
  "nodes/checkNodeBlock",
  async (block: string) => {
    console.log(block)
    const response = await fetch(`${block}/api/v1/blocks`);
    const data = await response.json();
    console.log(data)
    return data;
  }
);

export const checkNodesBlock = createAsyncThunk(
  "nodes/checkNodesBlock",
  async (block: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(checkNodeBlock(block));
  }
);

export const nodesSlice = createSlice({
  name: "nodes",
  initialState: initialState().blocks ,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkNodeBlock.pending, (state, action) => {
      state.list = []
    });
    builder.addCase(checkNodeBlock.fulfilled, (state, action) => {
      console.log(action.payload.data)
      state.list = action.payload.data
    });
    builder.addCase(checkNodeBlock.rejected, (state, action) => {
      state.list = []
    });
  },
});

export const selectBlocks = (state: RootState) => state.block.list;
export default nodesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import Bid from "../bid.json";

const initialState = {
	message: Bid,
	amount: 0,
	total: 0,
	isLoading: false,
};

const msgSlice = createSlice({
	name: "msg",
	initialState,
	reducers: {
		fetchData: (state, action) => {
			const products = action.payload;
			state.msgItems = products;
		},
		sendMsg: (state, action) => {
			const msg = action.payload;

			const prevMsg = [...state.message];
			if (prevMsg.length > 6) {
				prevMsg.shift();
			}
			prevMsg.push(msg);

			state.message = prevMsg;
		},
	},
});
export const { fetchData, sendMsg } = msgSlice.actions;

export default msgSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const getLocalStorage = () => {
	let products = localStorage.getItem("products");
	if (products) {
		return JSON.parse(localStorage.getItem("products"));
	} else {
		return [];
	}
};
const details = () => {
	let temp = localStorage.getItem("details");
	if (temp) {
		return JSON.parse(localStorage.getItem("details"));
	} else {
		return {};
	}
};
const getCart = () => {
	let cart = localStorage.getItem("cart");
	if (cart) {
		return JSON.parse(localStorage.getItem("cart"));
	} else {
		return [];
	}
};
const getAmount = () => {
	let amount = localStorage.getItem("amount");
	if (amount) {
		return JSON.parse(localStorage.getItem("amount"));
	} else {
		return 0;
	}
};
const initialState = {
	products: getLocalStorage(),
	cartItems: getCart(),
	amount: getAmount(),
	shipDet: details(),
	total: 0,
	isLoading: false,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		fetchData: (state, action) => {
			const products = action.payload;
			state.products = products;
			localStorage.setItem("products", JSON.stringify(products));
			// state.cartItems = products;
		},
		addCart: (state, action) => {
			const { like, count, id, amount } = action.payload;
			const item = state.products.find((p) => id === p.id);
			// let amount = item.price.usd * count;
			const me = { ...item, like, count, amount: amount };
			state.cartItems = [...state.cartItems, me];
		},

		removeItem: (state, action) => {
			const itemId = action.payload;
			const tempCart = state.cartItems.filter((item) => item.id !== itemId);
			state.cartItems = [...tempCart];
			localStorage.setItem("cart", JSON.stringify(tempCart));
		},
		Check: (state, action) => {
			const value = action.payload;
			state.amount = value;
			localStorage.setItem("amount", JSON.stringify(value));
			// prod.amount = prod.amount + 1;
		},
		saveDetail: (state, action) => {
			state.shipDet = action.payload;

			localStorage.setItem("details", JSON.stringify(action.payload));
		},

		clearCart: (state, action) => {
			localStorage.removeItem("cart");
			state.cartItems = [];
		},
		Search: (state, action) => {
			state.products = action.payload;
		},
		Sort: (state, action) => {
			state.products = action.payload;
		},
	},
});
export const {
	fetchData,
	addCart,
	removeItem,
	clearCart,
	saveDetail,
	Check,
	Search,
	Sort,
} = cartSlice.actions;

export default cartSlice.reducer;

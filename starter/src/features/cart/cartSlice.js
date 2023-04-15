import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//     .then((res) => res.json())
//     .catch((err) => {
//       console.log(err);
//     });
// });

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (sa, thunkAPI) => {
    try {
      console.log(thunkAPI);
      thunkAPI.dispatch(openModal());
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      //   console.log(err);
      return thunkAPI.rejectWithValue("something went wrong...");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    toggle: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (payload.type === "increase") cartItem.amount++;
      if (payload.type === "decrease" && cartItem.amount > 0) cartItem.amount--;
    },
    calculateTotals: (state) => {
      console.log(state);
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

export const { clearCart, toggle, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;

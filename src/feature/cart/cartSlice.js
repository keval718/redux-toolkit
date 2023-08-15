import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    cartItems: [],
    amount: 1,
    total: 0,
    isLoading: true,
};
const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', async (_, thunkAPI) => {
    try {
        console.log(thunkAPI)
        const { data } = await axios.get(url);
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue('Something went wrong')
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        actionItem: (state, { payload }) => {
            const cartItems = state.cartItems.find((item) => item.id === payload.id);
            if (payload.type === 'increase') {
                cartItems.amount = cartItems.amount + 1
            }
            else {
                cartItems.amount = cartItems.amount - 1
            }
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price
            })
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state, action) => {
            console.log(action)
            state.isLoading = false
        }
    }
});

export const { clearCart, removeItem, actionItem, calculateTotal } = cartSlice.actions;

export default cartSlice.reducer;

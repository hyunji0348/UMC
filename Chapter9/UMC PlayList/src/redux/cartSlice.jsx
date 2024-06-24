import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 장바구니 아이템 초기 상태
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalPrice: 0,
  status: 'idle',
  error: null,
};

// 서버에서 장바구니 아이템을 가져오는 비동기 thunk
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  try {
    const response = await axios.get('http://localhost:8080/musics');
    return response.data;
  } catch (error) {
    throw Error('장바구니 아이템을 불러오는 중 에러가 발생했습니다.');
  }
});

// slice 생성
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    decrease: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        }
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach(item => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.totalAmount = amount;
      state.totalPrice = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;

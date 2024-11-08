import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizzaSliceState, PizzaStatus, TPizzaItem } from './types';

const initialState: IPizzaSliceState = {
  items: [],
  status: PizzaStatus.LOADING,
};

type TFetchPizzas = {
  selectedCategory: number;
  sortBy: string;
  order: string;
  searchValue: string;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk<TPizzaItem[], TFetchPizzas>(
  'pizza/fetchPizza',
  async (params) => {
    const { selectedCategory, sortBy, order, searchValue, currentPage } = params;

    const res = await axios.get<TPizzaItem[]>(
      `https://664226513d66a67b34366b37.mockapi.io/items?${
        selectedCategory > 0 ? `category=${selectedCategory}` : ''
      }&sortBy=${sortBy}&order=${order}&search=${
        searchValue ? searchValue : ''
      }&page=${currentPage}&limit=4`,
    );

    return res.data;
  },
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = PizzaStatus.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<TPizzaItem[]>) => {
        state.status = PizzaStatus.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = PizzaStatus.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilterSliceState, TSort } from './types';

const initialState: IFilterSliceState = {
  searchValue: '',
  currentPage: 1,
  selectedSort: {
    name: 'popularity (DESC)',
    sortProperty: 'rating',
  },
  selectedCategory: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategory(state, action: PayloadAction<number>) {
      state.selectedCategory = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.selectedSort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.selectedCategory = Number(action.payload.selectedCategory);
        state.selectedSort = action.payload.selectedSort;
      } else {
        state.currentPage = 1;
        state.selectedCategory = 0;
        state.selectedSort = {
          name: 'popularity (DESC)',
          sortProperty: 'rating',
        };
      }
    },
  },
});

export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;

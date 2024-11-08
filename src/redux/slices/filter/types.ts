export type TSort = {
  name: string;
  sortProperty: string;
};

export interface IFilterSliceState {
  searchValue: string;
  currentPage: number;
  selectedSort: TSort;
  selectedCategory: number;
}

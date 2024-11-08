export type TPizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  sizes: number[];
  price: number;
  types: number[];
  rating: number;
};

export const enum PizzaStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSliceState {
  items: TPizzaItem[];
  status: PizzaStatus;
}

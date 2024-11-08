import { RootState } from '../../store';

export const selectCart = (state: RootState) => {
  return state.cart;
};

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

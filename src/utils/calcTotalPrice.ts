import { TCartItem } from '../redux/slices/cart/types';

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum: number, item: TCartItem) => {
    return item.price * item.count + sum;
  }, 0);
};

export type TCartItem = {
  id: string;
  title: string;
  imageUrl: string;
  sizes: number;
  price: number;
  types: string;
  count: number;
};

export interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

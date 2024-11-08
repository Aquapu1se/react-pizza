import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../redux/slices/cart/slice';
import { TCartItem } from '../redux/slices/cart/types';

type CartItemProps = {
  id: string;
  title: string;
  imageUrl: string;
  sizes: number;
  price: number;
  types: string;
  count: number;
};

const CartItem: React.FC<CartItemProps> = ({ id, title, imageUrl, sizes, price, types, count }) => {
  const dispatch = useDispatch();

  function onClickPlus() {
    dispatch(
      addItem({
        id,
      } as TCartItem),
    );
  }

  function onClickMinus() {
    dispatch(minusItem(id));
  }

  function onClickRemove() {
    if (window.confirm('Are you sure want to remove?')) {
      dispatch(removeItem(id));
    }
  }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {types} dough, {sizes} cm.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          className="button button--outline button--circle cart__item-count-minus"
          disabled={count === 1}
          onClick={onClickMinus}>
          <svg
            height="20"
            widths="20"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            width="512px"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M417.4,224H94.6C77.7,224,64,238.3,64,256c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z" />
          </svg>
        </button>
        <b>{count}</b>
        <button
          className="button button--outline button--circle cart__item-count-plus"
          onClick={onClickPlus}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"></path>
          </svg>
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} $</b>
      </div>
      <div className="cart__item-remove">
        <button className="button button--outline button--circle" onClick={onClickRemove}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;

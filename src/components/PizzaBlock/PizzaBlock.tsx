import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItemById } from '../../redux/slices/cart/selectors';
import { TCartItem } from '../../redux/slices/cart/types';
import { addItem } from '../../redux/slices/cart/slice';

const typeNames = ['thin', 'traditional'];

type PizzaBlockProps = {
  id: string;
  title: string;
  imageUrl: string;
  sizes: number[];
  price: number;
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, imageUrl, sizes, price, types }) => {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const cartItem = useSelector(selectCartItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  function onClickAdd() {
    const item: TCartItem = {
      id,
      title,
      imageUrl,
      sizes: sizes[activeSize],
      price,
      types: typeNames[activeType],
      count: 0,
    };

    dispatch(addItem(item));
  }

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <Link to={'/pizza/' + id}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => {
              return (
                <li
                  onClick={() => setActiveType(type)}
                  className={activeType === type ? 'active' : ''}
                  key={index}>
                  {typeNames[type]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size, index) => {
              return (
                <li
                  onClick={() => setActiveSize(index)}
                  className={activeSize === index ? 'active' : ''}
                  key={index}>
                  {size} cm.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">from {price} $</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;

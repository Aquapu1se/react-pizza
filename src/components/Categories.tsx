import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedFilter } from '../redux/slices/filter/selectors';
import { setCategory } from '../redux/slices/filter/slice';

const Categories: React.FC = React.memo(() => {
  const { selectedCategory } = useSelector(selectedFilter);
  const dispatch = useDispatch();

  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => dispatch(setCategory(index))}
              className={selectedCategory === index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;

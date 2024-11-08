import React, { useRef } from 'react';
import { useEffect } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { selectedFilter } from '../redux/slices/filter/selectors';
import { selectedPizza } from '../redux/slices/pizza/selectors';
import { IFilterSliceState } from '../redux/slices/filter/types';
import { setFilters } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/slice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { selectedSort, selectedCategory, currentPage, searchValue } = useSelector(selectedFilter);
  const { items, status } = useSelector(selectedPizza);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as {
        [key: string]: string;
      };

      const filters: IFilterSliceState = {
        searchValue: params.searchValue || '',
        currentPage: params.currentPage ? Number(params.currentPage) : 1,
        selectedSort: {
          name: params.sortName || 'popularity (DESC)',
          sortProperty: params.sortProperty || 'rating',
        },
        selectedCategory: params.selectedCategory ? Number(params.selectedCategory) : 0,
      };

      dispatch(setFilters(filters));

      isSearch.current = true;
    }
  }, [dispatch]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: selectedSort.sortProperty,
        selectedCategory,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [selectedCategory, selectedSort, searchValue, currentPage, navigate]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    async function fetchPizzasData() {
      const sortBy = selectedSort.sortProperty.replace('-', '');
      const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc';

      dispatch(
        fetchPizzas({
          sortBy,
          order,
          selectedCategory,
          searchValue,
          currentPage,
        }),
      );
    }

    if (!isSearch.current) {
      fetchPizzasData();
    }
    isSearch.current = false;
  }, [selectedCategory, selectedSort, searchValue, currentPage, dispatch]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort selectedSort={selectedSort} />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      {status === 'error' ? <div className="content__error-info">Error fetching data</div> : null}
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
          : items
              // .filter((pizza) => {
              //   return pizza.title.toLowerCase().includes(searchValue.toLowerCase());
              // })
              .map((pizza: any) => {
                return <PizzaBlock key={pizza.id} {...pizza} />;
              })}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;

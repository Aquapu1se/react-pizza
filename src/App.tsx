import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

// import Cart from './pages/Cart';
// import NotFound from './pages/NotFound';
// import FullPizza from './pages/FullPizza';

import MainLayout from './layouts/MainLayout';
import React from 'react';

const Cart = React.lazy(() => import(/*webpackChankName: "Cart"*/ './pages/Cart'));
const NotFound = React.lazy(() => import(/*webpackChankName: "NotFound"*/ './pages/NotFound'));
const FullPizza = React.lazy(() => import(/*webpackChankName: "Fullpizza"*/ './pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <React.Suspense fallback={<div>Loading... Please wait</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <React.Suspense fallback={<div>Loading... Please wait</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="/*"
          element={
            <React.Suspense fallback={<div>Loading... Please wait</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

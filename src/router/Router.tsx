import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Search from '../pages/Search/Search';
import Category from '../pages/Category/Category';
import Author from '../pages/Author/Author';
import BookDetails from '../pages/BookDetails/BookDetails';


const Router = ():JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
        <Route path="/search/:value" element={<Search />} />
        <Route path="/category/:value" element={<Category />} />
        <Route path="/author/:value" element={<Author />} />
        <Route path="/book/:value" element={<BookDetails />} />
      </Route>
    </Routes>
  );
};

export default Router;

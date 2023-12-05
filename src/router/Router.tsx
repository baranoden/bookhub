import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Search from '../pages/Search/Search';


const Router = ():JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
        <Route path="/search/:value" element={<Search />} />
      </Route>
    </Routes>
  );
};

export default Router;

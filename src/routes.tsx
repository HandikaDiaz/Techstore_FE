import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import ProductDetail from './pages/productDetail';
import ProductList from './pages/productList';
import CreateProduct from './pages/createProduct';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
    );
};

export default AppRoutes;
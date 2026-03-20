import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";

export const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductsPage />} />
        </Routes>
    </BrowserRouter>
);
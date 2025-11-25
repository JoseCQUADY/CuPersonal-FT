import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';

// --- Contextos ---
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeContextProvider } from './context/ThemeContext';

// --- Componentes del Cliente ---
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import TrackingPage from './pages/TrackingPage';

// --- Componentes de Administración ---
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/admin/DashboardPage';
import ManageProductsPage from './pages/admin/ManageProductsPage';
import ManageSuppliesPage from './pages/admin/ManageSuppliesPage';

// Componente de Protección de Rutas
const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }
    
    return <Outlet />;
};

function AppRoutes() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Rutas Públicas de la Tienda */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/confirmation/:orderCode" element={<ConfirmationPage />} />
                    <Route path="/track" element={<TrackingPage />} />
                    
                    {/* Rutas de Autenticación */}
                    <Route path="/admin/login" element={<LoginPage />} />
                    <Route path="/admin/register" element={<RegisterPage />} />

                    {/* Rutas de Administración (Protegidas) */}
                    <Route path="/admin" element={<ProtectedRoute />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="products" element={<ManageProductsPage />} />
                        <Route path="supplies" element={<ManageSuppliesPage />} />
                    </Route>

                    {/* Ruta 404/Not Found */}
                    <Route path="*" element={
                        <Typography variant="h4" align="center" sx={{ mt: 5 }}>
                            404 | Página No Encontrada
                        </Typography>
                    } />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

// Componente principal que envuelve con Contextos y Tema
export function App() {
    return (
        <ThemeContextProvider>
            <AuthProvider>
                <CartProvider>
                    <AppRoutes />
                </CartProvider>
            </AuthProvider>
        </ThemeContextProvider>
    );
}

export default App;
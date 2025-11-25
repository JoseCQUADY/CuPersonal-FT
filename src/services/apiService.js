// src/services/apiService.js
import { mockApiService } from './mockApiService';

// Use mock API for development
export const apiService = {
    // Auth endpoints
    login: mockApiService.login,
    register: mockApiService.register,

    // Products endpoints (public)
    getProducts: mockApiService.getProducts,
    getProductById: mockApiService.getProductById,
    
    // Products endpoints (admin)
    getAdminProductById: mockApiService.getAdminProductById,
    createProduct: mockApiService.createProduct,
    updateProduct: mockApiService.updateProduct,
    deleteProduct: mockApiService.deleteProduct,

    // Supplies endpoints (admin)
    getSupplies: mockApiService.getSupplies,
    getSupplyById: mockApiService.getSupplyById,
    createSupply: mockApiService.createSupply,
    updateSupply: mockApiService.updateSupply,
    deleteSupply: mockApiService.deleteSupply,

    // Future endpoints can be added here
    createOrder: (orderData) => {
        // Mock order creation for now
        return Promise.resolve({
            id: `order_${Date.now()}`,
            ...orderData,
            createdAt: new Date().toISOString()
        });
    }
};
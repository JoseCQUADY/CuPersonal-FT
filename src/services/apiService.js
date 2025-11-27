// src/services/apiService.js
// ============================================================================
// API SERVICE - SWITCH BETWEEN REAL AND MOCK API
// ============================================================================
// To use mock data for development, uncomment the mockApiService import
// and comment out the realApiService import. Then change the activeService below.
// ============================================================================

// OPTION 1: Use Real API (makes actual HTTP calls to backend)
import { realApiService } from './realApiService';

// OPTION 2: Use Mock API (uses local data for development/testing)
// import { mockApiService } from './mockApiService';

// ============================================================================
// ACTIVE SERVICE SELECTION
// Change this to switch between real and mock API:
// - realApiService: Makes actual HTTP calls to /auth-api and /app-api endpoints
// - mockApiService: Uses local mock data with simulated delays
// ============================================================================
const activeService = realApiService;
// const activeService = mockApiService;

// Export the API service with all available endpoints
export const apiService = {
    // Auth endpoints
    // POST /auth-api/register - Register a new user
    // POST /auth-api/login - Login and get JWT token
    login: activeService.login,
    register: activeService.register,

    // Products endpoints (public)
    // GET /app-api/products - Get paginated list of products
    // GET /app-api/products/{id} - Get product details for public
    getProducts: activeService.getProducts,
    getProductById: activeService.getProductById,
    
    // Products endpoints (admin) - Require authentication
    // GET /app-api/products/admin/{id} - Get product with admin details (materials, timestamps)
    // POST /app-api/products - Create new product
    // PUT /app-api/products/{id} - Update product
    // DELETE /app-api/products/{id} - Delete product
    getAdminProductById: activeService.getAdminProductById,
    createProduct: activeService.createProduct,
    updateProduct: activeService.updateProduct,
    deleteProduct: activeService.deleteProduct,

    // Supplies endpoints (admin) - Require authentication
    // GET /app-api/supplies/ - Get paginated list of supplies
    // GET /app-api/supplies/{id} - Get supply details
    // POST /app-api/supplies/ - Create new supply
    // PUT /app-api/supplies/{id} - Update supply
    // DELETE /app-api/supplies/{id} - Delete supply (only if not associated with products)
    getSupplies: activeService.getSupplies,
    getSupplyById: activeService.getSupplyById,
    createSupply: activeService.createSupply,
    updateSupply: activeService.updateSupply,
    deleteSupply: activeService.deleteSupply,

    // Order endpoint - Uses mock for now (can be connected when backend is ready)
    createOrder: (orderData) => {
        // Mock order creation for now
        return Promise.resolve({
            id: `order_${Date.now()}`,
            ...orderData,
            createdAt: new Date().toISOString()
        });
    }
};
// src/services/realApiService.js
// Real API Service - Makes actual HTTP calls to the backend
import axios from 'axios';

// API Base URLs - configure these based on your environment
const AUTH_API_BASE_URL = 'http://localhost:8081/';
const APP_API_BASE_URL = 'http://localhost:8081/';

// Create axios instances with default configurations
const authApi = axios.create({
    baseURL: AUTH_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

const appApi = axios.create({
    baseURL: APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

// Add authorization interceptor to appApi
appApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error status
        const message = error.response.data?.message ||
            error.response.data?.error ||
            `Error ${error.response.status}: ${error.response.statusText}`;
        throw new Error(message);
    } else if (error.request) {
        // Request was made but no response
        throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    } else {
        // Something else went wrong
        throw new Error(error.message || 'Error desconocido');
    }
};

export const realApiService = {
    // ==================
    // Auth endpoints
    // ==================

    /**
     * POST /auth-api/register
     * Register a new user
     */
    register: async (userData) => {
        try {
            const response = await authApi.post('/register', {
                name: userData.name,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.confirmPassword
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * POST /auth-api/login
     * Login user and get token
     
    login: async (email, password) => {
        try {
            const response = await authApi.post('/login', {
                email,
                password
            });
            
            const { token, user } = response.data;
            
            // Store token and user in localStorage
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }
            
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    */
    login: async () => {
        return {
            "message": "Login successful",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "user": {
                "id": "u123456",
                "name": "Mike",
                "lastName": "Castillo",
                "email": "email@example.com"
            }
        }
    },

    // ==================
    // Products endpoints (public)
    // ==================

    /**
     * GET /app-api/products
     * Get paginated list of products
     */
    getProducts: async (page) => {// page y size por defecto en el Back
        try {
            const response = await appApi.get('/products?page=' + page);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * GET /app-api/products/{id}
     * Get product details for public view
     */
    getProductById: async (id) => {
        try {
            const response = await appApi.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // ==================
    // Products endpoints (admin)
    // ==================

    /**
     * GET /app-api/products/admin/{id}
     * Get product details with admin info (materials, timestamps)
     */
    getAdminProductById: async (id) => {
        try {
            const response = await appApi.get(`/products/admin/${id}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * POST /app-api/products
     * Create a new product
     */
    createProduct: async (productData) => {
        try {
            const response = await appApi.post('/products', {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                imageUrl: productData.imageUrl,
                supplies: productData.materials || []
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * PUT /app-api/products/{id}
     * Update an existing product
     */
    updateProduct: async (id, productData) => {
        try {
            const response = await appApi.put(`/products/${id}`, {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                imageUrl: productData.imageUrl,
                materials: productData.materials || []
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * DELETE /app-api/products/{id}
     * Delete a product
     */
    deleteProduct: async (id) => {
        try {
            await appApi.delete(`/products/${id}`);
            return null;
        } catch (error) {
            handleApiError(error);
        }
    },

    // ==================
    // Supplies endpoints
    // ==================

    /**
     * GET /app-api/supplies/
     * Get paginated list of supplies
     */
    getSupplies: async (page) => {// page y size por defecto en el Back
        try {
            const response = await appApi.get('/supplies?page=' + page);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * GET /app-api/supplies/{id}
     * Get supply details
     */
    getSupplyById: async (id) => {
        try {
            const response = await appApi.get(`/supplies/${id}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * POST /app-api/supplies/
     * Create a new supply
     */
    createSupply: async (supplyData) => {
        try {
            const response = await appApi.post('/supplies', {
                name: supplyData.name,
                unit: supplyData.unit,
                quantity: supplyData.quantity,
                minimumQuantity: supplyData.minimumQuantity
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * PUT /app-api/supplies/{id}
     * Update an existing supply
     */
    updateSupply: async (id, supplyData) => {
        try {
            const response = await appApi.put(`/supplies/${id}`, {
                name: supplyData.name,
                unit: supplyData.unit,
                quantity: supplyData.quantity,
                minimumQuantity: supplyData.minimumQuantity
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * DELETE /app-api/supplies/{id}
     * Delete a supply (only if not associated with a product)
     */
    deleteSupply: async (id) => {
        try {
            await appApi.delete(`/supplies/${id}`);
            return null;
        } catch (error) {
            handleApiError(error);
        }
    },

    // ==================
    // Orders endpoints
    // ==================


    /**
     * GET /app-api/orders/
     * Get all orders (admin)
     */
    getOrders: async (page) => {
        try {
            const response = await appApi.get('/orders?page=' + page);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * GET /app-api/orders/{code}
     * Get order tracking info by code
     */
    getOrderByCode: async (code) => {
        try {
            const response = await appApi.get(`/orders/${code}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * GET /app-api/orders/admin/{{code}}
     * Get and order details for admin
     */
    getAdminOrderByCode: async (code) => {
        try {
            const response = await appApi.get(`/orders/admin/${code}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * POST /app-api/orders
     * Create a new order
     */
    createOrder: async (orderData) => {
        try {
            const response = await appApi.post('/orders',
                {
                    products: orderData.products,
                    email: orderData.cliente.email
                }
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    /**
     * PUT /app-api/orders/{{code}}
     * Update an existing order (admin)
     */
    updateOrder: async (code, orderData) => {
        try {
            const response = await appApi.put(`/orders/${code}`, {
                status: orderData.status
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
};

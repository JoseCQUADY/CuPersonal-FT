import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../services/apiService';

const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error loading token from localStorage:', error);
            return null;
        }
    });

    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem(USER_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Error loading user from localStorage:', error);
            return null;
        }
    });

    const login = async (email, password) => {
        try {
            await apiService.login(email, password);

            // Cookie guardada, así que marcamos como logueado
            setToken("logged-in");   // No es el JWT real, sólo un flag
            localStorage.setItem(TOKEN_KEY, "logged-in");

            return { success: true };

        } catch (error) {
            console.error("Login failed:", error);
            return {
                success: false,
                error: error.message || "Credenciales incorrectas o error de conexión."
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await apiService.register(userData);
            return { success: true, data: response };
        } catch (error) {
            console.error("Registration failed:", error);
            return {
                success: false,
                error: error.message || "Error en el registro"
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        try {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        } catch (error) {
            console.error('Error removing auth data from localStorage:', error);
        }
    };

    const getAuthToken = () => token;

    const value = {
        user,
        token,
        login,
        logout,
        register,
        getAuthToken,
        isAuthenticated: !!token
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
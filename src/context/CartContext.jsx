import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'mug_shop_cart';

const getInitialCart = () => {
    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getInitialCart);
    const [showCartDrawer, setShowCartDrawer] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cartItems]);

    const addToCart = (mug) => {
        setCartItems(prev => {
            const exists = prev.find(item => item.id === mug.id);
            if (exists) {
                return prev.map(item => 
                    item.id === mug.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            }
            return [...prev, { ...mug, quantity: 1 }]; 
        });
        // Show cart drawer when item is added
        setShowCartDrawer(true);
    };

    const removeItem = (mugId) => {
        setCartItems(prev => prev.filter(item => item.id !== mugId));
    };

    const updateQuantity = (mugId, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(mugId);
            return;
        }

        setCartItems(prev => 
            prev.map(item => 
                item.id === mugId ? { ...item, quantity: newQuantity } : item
            )
        );
    };
    
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const openCartDrawer = () => {
        setShowCartDrawer(true);
    };

    const closeCartDrawer = () => {
        setShowCartDrawer(false);
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider 
            value={{ 
                cartItems, 
                addToCart, 
                removeItem,
                updateQuantity, 
                clearCart,
                calculateTotal,
                getTotalItems,
                showCartDrawer,
                openCartDrawer,
                closeCartDrawer
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
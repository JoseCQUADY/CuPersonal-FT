import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    Divider,
    List,
    ListItem,
    Avatar,
    Chip,
    Paper
} from '@mui/material';
import {
    Close as CloseIcon,
    ShoppingCart as CartIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
    ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ open, onClose }) => {
    const { cartItems, updateQuantity, removeItem, calculateTotal, getTotalItems } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate('/cart');
    };

    const handleContinueShopping = () => {
        onClose();
        navigate('/');
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100vw', sm: 400 },
                    maxWidth: '100vw'
                }
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'primary.main',
                    color: 'white'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CartIcon />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Mi Carrito
                        </Typography>
                        <Chip 
                            label={getTotalItems()} 
                            size="small" 
                            sx={{ 
                                bgcolor: 'white', 
                                color: 'primary.main',
                                fontWeight: 'bold'
                            }} 
                        />
                    </Box>
                    <IconButton 
                        onClick={onClose} 
                        sx={{ color: 'white' }}
                        size="small"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Cart Items */}
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    {cartItems.length === 0 ? (
                        <Box sx={{ 
                            p: 4, 
                            textAlign: 'center',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ShoppingBagIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Tu carrito está vacío
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                ¡Descubre nuestras increíbles tazas personalizadas!
                            </Typography>
                            <Button 
                                variant="contained" 
                                onClick={handleContinueShopping}
                                sx={{ mt: 2 }}
                            >
                                Explorar Productos
                            </Button>
                        </Box>
                    ) : (
                        <List sx={{ p: 1 }}>
                            {cartItems.map((item) => (
                                <ListItem key={item.id} sx={{ p: 0, mb: 1 }}>
                                    <Paper sx={{ 
                                        p: 2, 
                                        width: '100%',
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Avatar
                                                src={item.imageUrl}
                                                alt={item.name}
                                                variant="rounded"
                                                sx={{ width: 60, height: 60 }}
                                            />
                                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                                <Typography 
                                                    variant="subtitle2" 
                                                    sx={{ 
                                                        fontWeight: 600,
                                                        lineHeight: 1.2,
                                                        mb: 0.5,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                                
                                                <Typography 
                                                    variant="body2" 
                                                    color="primary.main"
                                                    sx={{ fontWeight: 700, mb: 1 }}
                                                >
                                                    ${item.price.toFixed(2)}
                                                </Typography>

                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center',
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        borderRadius: 1
                                                    }}>
                                                        <IconButton 
                                                            size="small"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                        <Typography 
                                                            variant="body2" 
                                                            sx={{ 
                                                                px: 2, 
                                                                fontWeight: 600,
                                                                minWidth: '2ch',
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton 
                                                            size="small"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>

                                                    <IconButton 
                                                        size="small"
                                                        color="error"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>

                {/* Footer with total and checkout */}
                {cartItems.length > 0 && (
                    <Box sx={{ 
                        p: 2, 
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'grey.50'
                    }}>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1
                            }}>
                                <Typography variant="body1">
                                    Subtotal ({getTotalItems()} items):
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                    ${calculateTotal().toFixed(2)}
                                </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                Envío e impuestos calculados al finalizar compra
                            </Typography>
                        </Box>
                        
                        <Button 
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleCheckout}
                            sx={{ mb: 1, py: 1.5 }}
                        >
                            Proceder al Checkout
                        </Button>
                        
                        <Button 
                            variant="text"
                            fullWidth
                            onClick={handleContinueShopping}
                            sx={{ textTransform: 'none' }}
                        >
                            Continuar Comprando
                        </Button>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
};

export default CartDrawer;
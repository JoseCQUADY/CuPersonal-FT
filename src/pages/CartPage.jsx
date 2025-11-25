// src/pages/CartPage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
    Typography, Container, Box, Button, Grid, Paper, 
    TextField, IconButton, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../context/CartContext'; // Asegúrate que la ruta sea correcta

const CartPage = () => {
    const { 
        cartItems, 
        updateQuantity, 
        removeItem, 
        clearCart,
        calculateTotal
    } = useCart();
    
    // Función para manejar el cambio de cantidad
    const handleQuantityChange = (id, newQuantity) => {
        const quantity = parseInt(newQuantity);
        if (quantity > 0) {
            updateQuantity(id, quantity);
        }
    };

    if (cartItems.length === 0) {
        return (
            <Container sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    🛍️ Tu Carrito está Vacío
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    ¡Parece que aún no has agregado tazas a tu pedido!
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    component={RouterLink} 
                    to="/"
                >
                    Volver a la Tienda
                </Button>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Resumen de tu Pedido
            </Typography>

            <Grid container spacing={4}>
                {/* --- Columna Izquierda: Lista de Artículos --- */}
                <Grid item xs={12} md={8}>
                    {cartItems.map((item) => (
                        <Paper key={item.id} elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                
                                {/* Detalles del Producto */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Precio unitario: ${item.price}
                                    </Typography>
                                </Box>

                                {/* Cantidad y Botones */}
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        type="number"
                                        label="Cantidad"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        inputProps={{ min: 1 }}
                                        sx={{ width: 90, mr: 2 }}
                                        size="small"
                                    />
                                    <Typography variant="subtitle1" sx={{ mr: 3, minWidth: 80, textAlign: 'right' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>

                                    <IconButton 
                                        color="error" 
                                        onClick={() => removeItem(item.id)}
                                        aria-label={`Eliminar ${item.name}`}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    ))}

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button 
                            startIcon={<ArrowBackIcon />} 
                            component={RouterLink} 
                            to="/"
                        >
                            Seguir Comprando
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="error" 
                            onClick={clearCart}
                        >
                            Vaciar Carrito
                        </Button>
                    </Box>
                </Grid>

                {/* --- Columna Derecha: Resumen y Checkout --- */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Resumen de la Orden
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="subtitle1">Subtotal:</Typography>
                            <Typography variant="subtitle1" fontWeight="bold">
                                ${calculateTotal().toFixed(2)}
                            </Typography>
                        </Box>
                        
                        {/* Aquí se pueden añadir impuestos o envío si fueran implementados */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body2">Costo de Envío (Gratis):</Typography>
                            <Typography variant="body2">$0.00</Typography>
                        </Box>

                        <Divider sx={{ mt: 1, mb: 2 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6">Total a Pagar:</Typography>
                            <Typography variant="h6" color="primary">
                                ${calculateTotal().toFixed(2)}
                            </Typography>
                        </Box>

                        <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            component={RouterLink} 
                            to="/checkout"
                        >
                            Proceder al Pago
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CartPage;
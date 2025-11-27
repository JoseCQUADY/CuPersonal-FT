import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import {
    Container, Typography, Grid, Paper, Box, TextField,
    Button, Divider, List, ListItem, ListItemText, Alert, Avatar
    // Eliminamos Select/MenuItem/FormControl y los íconos de edición del carrito
} from '@mui/material';

// 1. Estado inicial completo del cliente (alineado con la necesidad del backend)
const initialFormData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
};

const CheckoutPage = () => {
    // Usamos calculateTotal (asumimos que existe en CartContext)
    const { cartItems, clearCart, calculateTotal } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Si el carrito está vacío, redirigir
    if (cartItems.length === 0) {
        return (
            <Alert severity="warning" sx={{ mt: 4 }}>
                Tu carrito está vacío. <Button onClick={() => navigate('/')}>Ir al catálogo</Button>
            </Alert>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 2. Construir el Payload Final
        const orderPayload = {
            cliente: {
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion,
                ciudad: formData.ciudad,
                codigoPostal: formData.codigoPostal,
                // Método de pago se puede manejar en el backend o añadir aquí
                metodoPago: 'tarjeta_credito', // Asumimos un valor por defecto o de un campo de pago futuro
            },
            items: cartItems.map(item => ({
                tazaId: item.id, // Alineado con la estructura del backend
                cantidad: item.quantity,
                precioUnitario: item.price,
            })),
            total: calculateTotal(), // Enviamos el total calculado por el frontend
        };

        try {
            // 3. Llamada a la API usando axios
            const response = await axios.post(`${API_BASE_URL}/app-api/pedidos`, orderPayload);

            // Asumimos que la respuesta incluye el código de seguimiento
            //const codigoSeguimiento = "ACB_SADASDASD_ASD_ASD_" || response.data.purchaseCode;

            if (!codigoSeguimiento) {
                throw new Error("El backend no devolvió un código de seguimiento.");
            }

            // Éxito: Limpiar carrito y redirigir
            clearCart();
            navigate(`/confirmation/${codigoSeguimiento}`);

        } catch (err) {
            console.error("Error al crear el pedido:", err.response ? err.response.data : err.message);
            setError("Error al procesar el pedido. Por favor, revisa tus datos de envío y contacto.");
        } finally {
            setLoading(false);
        }
    };

    const totalAmount = calculateTotal();

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Typography variant="h3" gutterBottom align="center">
                Finalizar Compra
            </Typography>

            <Grid container spacing={4} mt={5}>
                {/* Formulario de Información del Cliente */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom>Información de Envío</Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {/* Nombre y Apellido */}
                                <Grid size={{ xs: 12 }} >
                                    <TextField required fullWidth label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField required fullWidth label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
                                </Grid>
                                {/* Email y Teléfono */}
                                <Grid size={{ xs: 12 }}>
                                    <TextField required fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField required fullWidth label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />
                                </Grid>
                                {/* Dirección */}
                                <Grid size={{ xs: 12 }}>
                                    <TextField required fullWidth label="Dirección Completa" name="direccion" value={formData.direccion} onChange={handleChange} />
                                </Grid>
                                {/* Ciudad y Código Postal */}
                                <Grid size={{ xs: 12 }}>
                                    <TextField required fullWidth label="Ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField required fullWidth label="Código Postal" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} />
                                </Grid>
                            </Grid>

                            {/* Mensaje de Error */}
                            {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}

                            {/* Botón de Pago/Confirmación */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                disabled={loading || cartItems.length === 0 || !formData.nombre || !formData.direccion}
                            >
                                {loading ? 'Procesando Pedido...' : `Pagar y Confirmar Pedido ($${totalAmount.toFixed(2)})`}
                            </Button>
                        </form>
                    </Paper>
                </Grid>

                {/* Columna de Resumen de Compra */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>Resumen de Productos</Typography>
                        <Box>
                            <List dense sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {cartItems.map((item) => (
                                    <ListItem key={item.id} disablePadding sx={{ display: 'flex', gap: 3, alignItems: 'center', flexGrow: 1 }}>
                                        <Avatar
                                            src={item.imageUrl}
                                            alt={item.name}
                                            variant="rounded"
                                            sx={{ width: 50, height: 50 }}
                                        />
                                        <ListItemText
                                            primary={`${item.name} (x${item.quantity})`}
                                            secondary={`$${item.price.toFixed(2)} c/u`}
                                        />
                                        <Typography variant="subtitle1">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6">Total Final:</Typography>
                            <Typography variant="h6">${totalAmount.toFixed(2)}</Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={() => navigate('/cart')}
                        >
                            Modificar Carrito
                        </Button>
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    );
};

export default CheckoutPage;
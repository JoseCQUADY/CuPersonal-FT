import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'; // Importar hook para leer URL
import { 
    Container, TextField, Button, Typography, Paper, Box, 
    Alert, CircularProgress, Divider 
} from '@mui/material';

const TrackingPage = () => {
    // 1. Leer el código de la URL (ej: /track?code=XYZ123)
    const [searchParams] = useSearchParams();
    const initialCode = searchParams.get('code') || '';

    // Estado para el código que se muestra en el input
    const [trackingCode, setTrackingCode] = useState(initialCode);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Función para buscar el pedido en el backend
    const fetchOrder = async (code) => {
        if (!code) return; // No buscar si el código está vacío

        setLoading(true);
        setOrder(null);
        setError(null);
        
        try {
            // El endpoint que asumes para el seguimiento
            const url = `${API_BASE_URL}/app-api/pedidos/seguimiento/${code.trim()}`;
            // Usamos axios para la llamada
            const response = await axios.get(url); 
            
            // Asumimos que la respuesta tiene una estructura como { codigo_seguimiento: '...', estado: '...', items: [...] }
            setOrder(response.data); 

        } catch (err) {
            console.error("Tracking Error:", err.response || err.message);
            setError("No se encontró ningún pedido con ese código de seguimiento. Verifica el código e intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    // 2. Efecto para buscar automáticamente si hay un código en la URL al cargar
    useEffect(() => {
        if (initialCode) {
            fetchOrder(initialCode);
        }
    }, [initialCode]); // Se ejecuta solo cuando el componente carga con un código en la URL

    // 3. Manejador para el envío manual del formulario
    const handleTrackOrder = (e) => {
        e.preventDefault();
        fetchOrder(trackingCode);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Seguimiento de tu Pedido
            </Typography>
            <Paper component={Box} p={4} elevation={3}>
                <form onSubmit={handleTrackOrder}>
                    <TextField
                        fullWidth
                        label="Número de Seguimiento"
                        variant="outlined"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        margin="normal"
                        required
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading || !trackingCode.trim()}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Rastrear Pedido'}
                    </Button>
                </form>

                {/* Área de Resultados */}
                <Box sx={{ mt: 3 }}>
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
                
                {order && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #eee' }}>
                        <Typography variant="h5" gutterBottom>Detalles del Pedido</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">
                                    **Código:** {order.codigo_seguimiento}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">
                                    **Estado:** <span style={{ fontWeight: 'bold', color: order.estado === 'Entregado' ? 'green' : 'orange' }}>{order.estado || 'Pendiente'}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    **Fecha del Pedido:** {new Date(order.fecha_pedido).toLocaleDateString()}
                                </Typography>
                            </Grid>
                        </Grid>
                        
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>Artículos:</Typography>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    {item.nombre || item.tazaNombre} - Cantidad: **{item.cantidad}**
                                </li>
                            ))}
                        </ul>
                        
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Total Pagado: **${order.total.toFixed(2)}**
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default TrackingPage;
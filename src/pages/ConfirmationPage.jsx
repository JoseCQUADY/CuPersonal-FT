import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Paper, Button, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ConfirmationPage = () => {
    const { orderCode } = useParams(); // Obtenemos el orderCode de la URL

    return (
        // 1. Añadimos Container para consistencia de márgenes
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}> 
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom>
                    ¡Gracias por tu compra!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Tu orden ha sido recibida y está siendo procesada. Nuestro equipo está preparando tus tazas perfectas.
                    <br />**Los insumos necesarios para tu pedido han sido descontados automáticamente en el sistema.**
                </Typography>
                
                <Divider sx={{ mb: 3 }} />
                
                {/* Código de Compra Destacado */}
                <Box sx={{ my: 4, p: 3, border: '2px dashed', borderColor: 'primary.light', borderRadius: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="h6" color="text.secondary">Tu número de seguimiento es:</Typography>
                    <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', letterSpacing: 1.5, color: 'primary.dark' }}>
                        {orderCode || "No disponible"}
                    </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Guarda este código para cualquier consulta futura sobre tu pedido.
                </Typography>
                
                {/* 2. Botones de Acción (Rastrear y Volver a Comprar) */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Button 
                        component={RouterLink} 
                        // Enlace directo a la página de seguimiento, pasando el código en el query param 'code'
                        to={`/track?code=${orderCode}`} 
                        variant="contained" 
                        color="primary"
                        size="large"
                    >
                        Rastrear Mi Pedido
                    </Button>
                    <Button 
                        component={RouterLink} 
                        to="/" 
                        variant="outlined" 
                        size="large"
                    >
                        Explorar más tazas
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ConfirmationPage;
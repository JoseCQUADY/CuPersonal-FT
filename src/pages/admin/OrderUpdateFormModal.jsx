// src/pages/admin/ProductFormModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem, DialogContent, Grid, DialogActions, Paper, Avatar, Alert, List, ListItem, ListItemText, Divider } from '@mui/material';
import { apiService } from '../../services/apiService';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4, maxHeight: '90vh', overflowY: 'auto' };

const OrderUpdateFormModal = ({ open, onClose, order, onSave }) => {
    const [orderStatus, setOrderStatus] = useState('');

    // Estado para el modal de Crear/Editar
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalError, setModalError] = useState(null);

    useEffect(() => {
    }, [order, open]);

    // --- Manejo del Modal ---

    // Manejar la edición de una orden
    const handleSaveOrder = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setModalError(null);

        try {
            //await apiService.updateOrder(order.code, orderStatus);
            await onSave({ ...order, status: orderStatus });
            //await onSave(order.code, orderStatus);

        } catch (err) {
            const msg = err.message || `Error al ${order.id ? 'editar' : 'crear'} el insumo.`;
            setModalError(msg);
            console.error("Error saving order:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style} component="form" onSubmit={handleSaveOrder}>

                {order && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #eee' }}>
                        <Typography variant="h4" gutterBottom mb={3}>Detalles del Pedido</Typography>
                        <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="body">
                                    Código: {order.code}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="body1">
                                    Estado: <span style={{ fontWeight: 'bold', color: order.status === 'Entregado' ? 'green' : 'orange' }}>{order.status || 'Pendiente'}</span>
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h5" gutterBottom>Artículos:</Typography>
                        {order.orderProducts.map((product, index) => (
                            <Paper key={product.productName} elevation={1} sx={{ p: 2, mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {/* Detalles del Producto */}
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Avatar
                                            src={product.productImageUrl}
                                            alt={product.productName}
                                            variant="rounded"
                                            sx={{ width: 60, height: 60 }}
                                        />
                                    </Box>
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography variant="h6">{product.productName}</Typography>
                                        <Typography variant="h6">{"Cantidad: " + product.quantity}</Typography>
                                    </Box>
                                </Box>
                            </Paper>

                        ))}

                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Total Pagado: ${order.total.toFixed(2)}
                        </Typography>
                    </Box>
                )}

                <DialogContent dividers sx={{ p: 3 }}>
                    {modalError && <Alert severity="error" sx={{ mb: 2 }}>{modalError}</Alert>}
                    <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                        <Grid >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <FormControl fullWidth>
                                    <InputLabel>Estado</InputLabel>
                                    <Select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                                        <MenuItem value="PENDING">PENDIENTE</MenuItem>
                                        <MenuItem value="CREATING">CREANDO</MenuItem>
                                        <MenuItem value="FINISHED">TERMINADO</MenuItem>
                                        <MenuItem value="DELIVERED">ENTREGADO</MenuItem>
                                        <MenuItem value="CANCELLED">CANCELADO</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        onClick={onClose}
                        disabled={isSubmitting}
                        sx={{ borderRadius: 2 }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        sx={{ borderRadius: 2, px: 3 }}
                    >
                        Guardar cambios
                    </Button>
                </DialogActions>
            </Box>
        </Modal>
    );
};

export default OrderUpdateFormModal;
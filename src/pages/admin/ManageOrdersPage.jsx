import React, { useState, useEffect, useCallback } from 'react';
import { apiService } from '../../services/apiService';
import {
    Typography, Box, Button, CircularProgress, Alert,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid,
    Tooltip, Pagination, Chip, Stack, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OrderUpdateFormModal from './OrderUpdateFormModal';

const ManageOrdersPage = () => {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderToView, setOrderToView] = useState(null);
    const [error, setError] = useState(null);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    // Estado para el modal de Crear/Editar
    const [isModalOpen, setIsModalOpen] = useState(false);
    //const [isSubmitting, setIsSubmitting] = useState(false);
    //const [modalError, setModalError] = useState(null);

    // Manejar la creación o edición de un producto
    const handleOpenEditModal = (order) => {
        setOrderToView(order);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handleSaveOrder = async (orderData) => {
        try {
            const updatedOrder = await apiService.updateOrder(orderData.code, orderData);
            setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
        } catch (error) {
            console.error("Error al actualizar la orden:", error);
            alert("Error al actualizar la orden: " + error.message);
        }

        // Recargar la lista y cerrar el modal
        handleCloseModal();
        fetchOrders();
    };

    // --- Funciones de Fetch y CRUD ---

    const fetchOrders = useCallback(async (pageNum = 0) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiService.getOrders(pageNum);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
            setPage(data.number);

            setOrders(data.content);
        } catch (err) {
            console.warn("API Get orders failed, using mock data.", err);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handlePageChange = (event, value) => {
        fetchOrders(value - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: '50px auto' }} />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box>
            <Paper sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4
                }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 600,
                            color: 'primary.main'
                        }}
                    >
                        Gestión de Ordenes
                    </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    {totalElements > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                                label={`${totalElements} Insumos totales`}
                                variant="outlined"
                                color="primary"
                            />
                            <Typography variant="body2" color="text.secondary">
                                Página {page + 1} de {totalPages}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Paper sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    <TableContainer
                        sx={{
                            borderRadius: 2,
                            maxHeight: '70vh',
                            overflow: 'auto'
                        }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600, minWidth: 80 }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 600, minWidth: 80 }}>Total</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, minWidth: 100 }}>Código de Orden</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, minWidth: 100 }}>Fecha de Creación</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, minWidth: 150 }}>Correo</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, minWidth: 80 }}>Estado</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, minWidth: 140 }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders && orders.length > 0 ? orders.map((order) => {
                                    return (
                                        <TableRow
                                            key={order.id}
                                        >
                                            <TableCell sx={{ fontFamily: 'monospace' }}>{order.id}</TableCell>
                                            <TableCell sx={{ fontWeight: 500 }}> ${order.total}</TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        bgcolor: 'primary.light',
                                                        color: 'black',
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {order.code}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {new Date(order.createdAt).toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {order.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {order.status}
                                                </Typography>

                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                    <IconButton
                                                        onClick={() => handleOpenEditModal(order)}
                                                        size="small"
                                                        sx={{
                                                            color: 'primary.main',
                                                            '&:hover': {
                                                                bgcolor: 'blue',
                                                                color: 'white'
                                                            }
                                                        }}
                                                    >
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                            <Typography color="text.secondary">No hay Ordenes generadas</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* Paginación */}
                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 3 }}>
                            <Pagination
                                count={totalPages}
                                page={page + 1}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                                sx={{
                                    '& .MuiPagination-ul': {
                                        backgroundColor: 'primary.main',
                                        borderRadius: 2,
                                        p: 1,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }
                                }}
                            />
                        </Box>
                    )}
                </Paper>
            </Paper>

            <OrderUpdateFormModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveOrder}
                order={orderToView}
            />

        </Box>
    );
};

export default ManageOrdersPage;
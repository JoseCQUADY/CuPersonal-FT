import React, { useState, useEffect, useCallback } from 'react';
import { apiService } from '../../services/apiService';
import {
    Typography, Box, Button, CircularProgress, Alert,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid,
    Tooltip, Pagination, Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useLocation } from "react-router-dom";

// Estado inicial para el formulario de Insumo (Crear/Editar)
const initialSupplyForm = {
    id: null,
    name: '',
    unit: 'MILLILITER', // Valor por defecto
    quantity: 0,
    minimumQuantity: 1,
};

const ManageSuppliesPage = () => {
    const [supplies, setSupplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    // Estado para el modal de Crear/Editar
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialSupplyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalError, setModalError] = useState(null);

    // Manejo de apertura del modal desde la navegación
    const location = useLocation();
    const openCreateFromNavigation = location.state?.openCreate || false;
    useEffect(() => {
        if (openCreateFromNavigation) {
            handleOpenCreate();
        }
    }, [openCreateFromNavigation]);

    // --- Funciones de Fetch y CRUD ---

    const fetchSupplies = useCallback(async (pageNum = 0) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiService.getSupplies(pageNum);
            setTotalElements(data.totalElements);
            console.log("Total Elements:", data.totalElements);
            setTotalPages(data.totalPages);
            console.log("Total Pages:", data.totalPages);
            setPage(data.number);
            console.log("Current Page:", data.number);

            setSupplies(data.content);
        } catch (err) {
            console.warn("API Get Supplies failed, using mock data.", err);
            setSupplies(mockSuppliesResponse.content);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSupplies();
    }, [fetchSupplies]);
    
    const handlePageChange = (event, value) => {
        fetchSupplies(value - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    // Manejar la creación o edición de un insumo
    const handleSaveSupply = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setModalError(null);

        // Asegurar que las cantidades son números
        const payload = {
            name: formData.name,
            unit: formData.unit,
            quantity: parseFloat(formData.quantity) || 0,
            minimumQuantity: parseFloat(formData.minimumQuantity) || 1
        };

        try {
            if (formData.id) {
                await apiService.updateSupply(formData.id, payload);
            } else {
                await apiService.createSupply(payload);
            }

            // Recargar la lista y cerrar el modal
            setIsModalOpen(false);
            setFormData(initialSupplyForm);
            fetchSupplies();

        } catch (err) {
            const msg = err.message || `Error al ${formData.id ? 'editar' : 'crear'} el insumo.`;
            setModalError(msg);
            console.error("Error saving supply:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Manejar la eliminación de un insumo
    const handleDeleteSupply = async (supplyId) => {
        if (window.confirm('¿Seguro que quieres eliminar este insumo? Solo se puede eliminar si no está asociado a ningún producto.')) {
            try {
                await apiService.deleteSupply(supplyId);
                setSupplies(supplies.filter(s => s.id !== supplyId));
            } catch (err) {
                console.error("Error al eliminar insumo:", err);
                alert("No se pudo eliminar el insumo: " + err.message);
            }
        }
    };

    // --- Manejo del Modal ---

    const handleOpenCreate = () => {
        setFormData(initialSupplyForm);
        setModalError(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (supply) => {
        // Llenar el formulario con los datos del insumo
        setFormData({
            id: supply.id,
            name: supply.name,
            unit: supply.unit,
            quantity: supply.quantity,
            minimumQuantity: supply.minimumQuantity,
        });
        setModalError(null);
        setIsModalOpen(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                        Gestión de Insumos
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenCreate}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        Nuevo Insumo
                    </Button>
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
                                    <TableCell sx={{ fontWeight: 600, minWidth: 200 }}>Insumo</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, minWidth: 100 }}>Unidad</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, minWidth: 150 }}>Cantidad Actual</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, minWidth: 150 }}>Mínimo Requerido</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, minWidth: 120 }}>Estado</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, minWidth: 140 }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {supplies && supplies.length > 0 ? supplies.map((supply) => {
                                    const isLowStock = supply.quantity < supply.minimumQuantity;
                                    return (
                                        <TableRow
                                            key={supply.id}
                                            sx={{
                                                bgcolor: isLowStock ? 'error.light' : 'inherit',
                                                '&:hover': {
                                                    bgcolor: isLowStock ? 'error.light' : 'action.hover'
                                                }
                                            }}
                                        >
                                            <TableCell sx={{ fontFamily: 'monospace' }}>{supply.id}</TableCell>
                                            <TableCell sx={{ fontWeight: 500 }}>{supply.name}</TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        bgcolor: 'primary.light',
                                                        color: 'white',
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {supply.unit}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: isLowStock ? 'error.main' : 'success.main'
                                                    }}
                                                >
                                                    {supply.quantity}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {supply.minimumQuantity}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                {isLowStock ? (
                                                    <Tooltip title="Inventario Bajo - ¡Reabastecer ahora!">
                                                        <Box sx={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            bgcolor: 'error.main',
                                                            color: 'white',
                                                            borderRadius: 1,
                                                            px: 1,
                                                            py: 0.5
                                                        }}>
                                                            <LowPriorityIcon sx={{ fontSize: 16 }} />
                                                        </Box>
                                                    </Tooltip>
                                                ) : (
                                                    <Tooltip title="Inventario Suficiente">
                                                        <Box sx={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            bgcolor: 'success.main',
                                                            color: 'white',
                                                            borderRadius: 1,
                                                            px: 1,
                                                            py: 0.5
                                                        }}>
                                                            <InventoryIcon sx={{ fontSize: 16 }} />
                                                        </Box>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleOpenEdit(supply)}
                                                        size="small"
                                                        sx={{
                                                            '&:hover': {
                                                                bgcolor: 'primary.light',
                                                                color: 'white'
                                                            }
                                                        }}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDeleteSupply(supply.id)}
                                                        size="small"
                                                        sx={{
                                                            color: 'error.main',
                                                            '&:hover': {
                                                                bgcolor: 'error.main',
                                                                color: 'white'
                                                            }
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                            <Typography color="text.secondary">No hay insumos disponibles</Typography>
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

            {/* Modal de Crear/Editar Insumo */}
            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: { borderRadius: 2 }
                }}
            >
                <DialogTitle sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 600
                }}>
                    {formData.id ? 'Editar/Reabastecer Insumo' : 'Crear Nuevo Insumo'}
                </DialogTitle>
                <Box component="form" onSubmit={handleSaveSupply}>
                    <DialogContent dividers sx={{ p: 3 }}>
                        {modalError && <Alert severity="error" sx={{ mb: 2 }}>{modalError}</Alert>}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Nombre del Insumo"
                                    name="name"
                                    fullWidth
                                    required
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    disabled={!!formData.id}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Unidad"
                                    name="unit"
                                    fullWidth
                                    required
                                    value={formData.unit}
                                    onChange={handleFormChange}
                                    disabled={!!formData.id}
                                    placeholder="ml, pza, kg"
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Cantidad Actual"
                                    name="quantity"
                                    type="number"
                                    fullWidth
                                    required
                                    value={formData.quantity}
                                    onChange={handleFormChange}
                                    inputProps={{ min: "0", step: "0.01" }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Cantidad Mínima Requerida"
                                    name="minimumQuantity"
                                    type="number"
                                    fullWidth
                                    required
                                    value={formData.minimumQuantity}
                                    onChange={handleFormChange}
                                    inputProps={{ min: "0" }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, gap: 1 }}>
                        <Button
                            onClick={() => setIsModalOpen(false)}
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
                            {isSubmitting ? <CircularProgress size={24} /> : (formData.id ? 'Guardar Cambios' : 'Crear Insumo')}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default ManageSuppliesPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {
    Typography, Box, Button, CircularProgress, Alert,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid,
    Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import InventoryIcon from '@mui/icons-material/Inventory';

const mockSuppliesResponse = {
  content: [
    {
      id: 501,
      name: "Taza blanca base",
      unit: "pza",
      quantity: 120,
      minimumQuantity: 20
    },
    {
      id: 505,
      name: "Pintura negra para cerámica",
      unit: "ml",
      quantity: 1500,
      minimumQuantity: 300
    },
    {
      id: 504,
      name: "Caja de cartón",
      unit: "pza",
      quantity: 50,
      minimumQuantity: 50
    }
  ],
  page: 0,
  size: 10,
  totalElements: 3,
  totalPages: 1
};

// Estado inicial para el formulario de Insumo (Crear/Editar)
const initialSupplyForm = {
    id: null,
    name: '',
    unit: 'pza', // Valor por defecto
    quantity: 0,
    minimumQuantity: 1,
};

const ManageSuppliesPage = () => {
    const { getAuthToken } = useAuth();
    const [supplies, setSupplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para el modal de Crear/Editar
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialSupplyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalError, setModalError] = useState(null);

    // --- Funciones de Fetch y CRUD ---

    const fetchSupplies = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = getAuthToken();
            // GET /app-api/supplies
            // const response = await axios.get(`${API_BASE_URL}/app-api/supplies?page=0&size=50`, {
            //     headers: { Authorization: `Bearer ${token}` }
            // });
            // La respuesta contiene 'content' que es el array de insumos
            setSupplies(mockSuppliesResponse.content); 
        } catch (err) {
            setError("Error al cargar los insumos. Verifica la conexión o tu token de autenticación.");
            console.error("Error fetching supplies:", err.response || err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSupplies();
    }, []);

    // Manejar la creación o edición de un insumo
    const handleSaveSupply = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setModalError(null);

        // Asegurar que las cantidades son números
        const payload = {
            ...formData,
            quantity: parseFloat(formData.quantity) || 0,
            minimumQuantity: parseFloat(formData.minimumQuantity) || 1
        };

        try {
            const token = getAuthToken();
            let response;
            
            if (formData.id) {
                // LÓGICA DE EDICIÓN (incluyendo reabastecimiento): PUT /app-api/supplies/{id}
                response = await axios.put(`${API_BASE_URL}/app-api/supplies/${formData.id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                // LÓGICA DE CREACIÓN: POST /app-api/supplies
                response = await axios.post(`${API_BASE_URL}/app-api/supplies`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            // Recargar la lista y cerrar el modal
            setIsModalOpen(false);
            setFormData(initialSupplyForm);
            fetchSupplies(); 

        } catch (err) {
            const msg = err.response?.data?.message || `Error al ${formData.id ? 'editar' : 'crear'} el insumo.`;
            setModalError(msg);
            console.error("Error saving supply:", err.response || err);
        } finally {
            setIsSubmitting(false);
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
                            {supplies.map((supply) => {
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
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
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
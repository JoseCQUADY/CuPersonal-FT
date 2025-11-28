// src/pages/admin/ProductFormModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../services/apiService';
import { mockSuppliesResponse, mockAdminProductDetail } from '../../mockData';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4, maxHeight: '90vh', overflowY: 'auto' };

const ProductFormModal = ({ open, onClose, product, onSave }) => {
    const [formData, setFormData] = useState({});
    const [price, setPrice] = useState('');
    const [availableSupplies, setAvailableSupplies] = useState([]);

    useEffect(() => {

        // Cargar insumos disponibles
        const fetchSupplies = async () => {
            try {
                const data = await apiService.getSupplies();
                setAvailableSupplies(data.content);
            } catch (error) {
                console.warn("API Get Supplies for modal failed, using mock data.", error);
                setAvailableSupplies(mockSuppliesResponse.content);
            }
        };

        // Cargar datos detallados del producto al editar
        const fetchProductDetails = async (productId) => {
            try {
                const data = await apiService.getAdminProductById(productId);
                setFormData(data);
            } catch (error) {
                console.warn("API Get Admin Product failed, using mock data.", error);
                setFormData(mockAdminProductDetail);
            }
        };

        if (open) {
            fetchSupplies();
            if (product) {
                fetchProductDetails(product.id);
            } else {
                setFormData({ name: '', description: '', price: '', imageUrl: '', materials: [] });
            }
        }
    }, [product, open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        var priceValue = parseFloat(price);
        if (isNaN(priceValue) || priceValue <= 0) {
            alert("Por favor, ingrese un precio válido.");
            return;
        }
        onSave({ ...formData, price: priceValue });
    };

    const getSupplyName = (id) => availableSupplies.find(s => s.id === id)?.name || 'Desconocido';

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography variant="h5" marginBottom={2}>{'Editar Producto'}</Typography>
                <Typography variant="h6" marginBottom={1}>Nombre: {formData.name || ''}</Typography>
                <Typography variant="h6" marginBottom={1}>Descripción: {formData.description || ''}</Typography>
                <Typography variant="h6" marginBottom={1}>Url de la Imagen: {formData.imageUrl || ''}</Typography>

                <TextField name="price" label="Precio" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="normal" required />

                <Divider sx={{ my: 2 }}>Materiales Requeridos</Divider>
                <List dense>
                    {formData.productSupplies?.map(supplie => (
                        <ListItem key={supplie.id.supplyId}>
                            <ListItemText primary={getSupplyName(supplie.id.supplyId)} secondary={`Cantidad: ${supplie.quantityPerUnit}`} />
                        </ListItem>
                    ))}
                </List>

                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button type="submit" variant="contained">Guardar</Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ProductFormModal;
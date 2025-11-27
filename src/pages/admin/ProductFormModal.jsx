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
    const [availableSupplies, setAvailableSupplies] = useState([]);
    const [selectedSupply, setSelectedSupply] = useState('');
    const [supplyQuantity, setSupplyQuantity] = useState(1);
    const [price, setPrice] = useState('');

    useEffect(() => {
        // Cargar insumos disponibles para el selector
        const fetchSupplies = async () => {
            try {
                const data = await apiService.getSupplies();
                setAvailableSupplies(data.content);
            } catch (error) {
                console.warn("API Get Supplies for modal failed, using mock data.", error);
                setAvailableSupplies(mockSuppliesResponse.content);
            }
        };

        if (open) {
            fetchSupplies();
            setFormData({ name: '', description: '', price: '', imageUrl: '', materials: [] });
        }

    }, [product, open]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAddMaterial = () => {
        if (!selectedSupply || supplyQuantity <= 0) return;
        const newMaterial = { id: selectedSupply, quantityPerUnit: parseInt(supplyQuantity, 10) };
        // Evitar duplicados
        if (formData.materials.some(m => m.id === newMaterial.id)) return;

        setFormData({ ...formData, materials: [...formData.materials, newMaterial] });
        setSelectedSupply('');
        setSupplyQuantity(1);
    };

    const handleRemoveMaterial = (id) => {
        setFormData({ ...formData, materials: formData.materials.filter(m => m.id !== id) });
    };

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
                <Typography variant="h6">{product ? 'Editar Producto' : 'Crear Producto'}</Typography>
                <TextField name="name" label="Nombre" value={formData.name || ''} onChange={handleChange} fullWidth margin="normal" required />
                <TextField name="description" label="Descripción" value={formData.description || ''} onChange={handleChange} fullWidth margin="normal" required />
                <TextField name="price" label="Precio" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="normal" required />
                <TextField name="imageUrl" label="URL de la Imagen" value={formData.imageUrl || ''} onChange={handleChange} fullWidth margin="normal" required />

                <Divider sx={{ my: 2 }}>Materiales Requeridos</Divider>
                <Stack direction="row" spacing={1} alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel>Insmuo</InputLabel>
                        <Select value={selectedSupply} onChange={(e) => setSelectedSupply(e.target.value)} label="Insumo">
                            {availableSupplies && availableSupplies.length > 0 ? availableSupplies.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>) :
                                <MenuItem disabled>No hay insumos disponibles</MenuItem>}
                        </Select>
                    </FormControl>
                    <TextField label="Cantidad" type="number" value={supplyQuantity} onChange={(e) => setSupplyQuantity(e.target.value)} sx={{ width: '100px' }} />
                    <IconButton color="primary" onClick={handleAddMaterial}><AddCircleIcon /></IconButton>
                </Stack>
                <List dense>
                    {formData.materials?.map(material => (
                        <ListItem key={material.id} secondaryAction={<IconButton edge="end" onClick={() => handleRemoveMaterial(material.id)}><DeleteIcon /></IconButton>}>
                            <ListItemText primary={getSupplyName(material.id)} secondary={`Cantidad: ${material.quantityPerUnit}`} />
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
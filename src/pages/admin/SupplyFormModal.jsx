// src/pages/admin/SupplyFormModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack } from '@mui/material';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 };
const initialState = { name: '', unit: '', quantity: '', minimumQuantity: '' };

const SupplyFormModal = ({ open, onClose, supply, onSave }) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        setFormData(supply ? { name: supply.name, unit: supply.unit, quantity: supply.quantity, minimumQuantity: supply.minimumQuantity } : initialState);
    }, [supply, open]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ 
            ...supply, 
            ...formData,
            quantity: parseInt(formData.quantity, 10),
            minimumQuantity: parseInt(formData.minimumQuantity, 10),
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography variant="h6">{supply ? 'Editar Insumo' : 'Crear Insumo'}</Typography>
                <TextField name="name" label="Nombre" value={formData.name} onChange={handleChange} fullWidth margin="normal" required />
                <TextField name="unit" label="Unidad (pza, ml, etc.)" value={formData.unit} onChange={handleChange} fullWidth margin="normal" required />
                <TextField name="quantity" label="Cantidad Actual" type="number" value={formData.quantity} onChange={handleChange} fullWidth margin="normal" required />
                <TextField name="minimumQuantity" label="Cantidad Mínima" type="number" value={formData.minimumQuantity} onChange={handleChange} fullWidth margin="normal" required />
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained">Guardar</Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default SupplyFormModal;
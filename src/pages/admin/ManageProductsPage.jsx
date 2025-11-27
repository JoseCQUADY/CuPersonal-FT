// src/pages/admin/ManageProductsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, CircularProgress, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Pagination, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../services/apiService';
import { mockProductsResponse } from '../../mockData';
import ProductFormModal from './ProductFormModal';
import ProductUpdateFormModal from './ProductUpdateFormModal';
import { useLocation } from "react-router-dom";

const ManageProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    // Estado para el modal de Crear/Editar
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // Manejo de apertura del modal desde la navegación
    const location = useLocation();
    const openCreateFromNavigation = location.state?.openCreate || false;
    useEffect(() => {
        if (openCreateFromNavigation) {
            handleOpenCreateModal();
        }
    }, [openCreateFromNavigation]);

    // --- Funciones de Fetch y CRUD ---

    const fetchProducts = useCallback(async (pageNum = 0) => {
        setLoading(true);
        try {
            const data = await apiService.getProducts(pageNum);

            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
            setPage(data.number);

            setProducts(data.content);
        } catch (error) {
            console.warn("API Get Products failed, using mock data.", error);
            setProducts(mockProductsResponse.content);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handlePageChange = (event, value) => {
        fetchProducts(value - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Manejar la creación o edición de un producto
    const handleOpenCreateModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setEditingProduct(product);
        setIsUpdateModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsUpdateModalOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = async (productData) => {
        if (productData.id) { // Actualizar producto existente
            try {
                const updatedProduct = await apiService.updateProduct(productData.id, productData);
                setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
            } catch (error) {
                console.error("Error al actualizar producto:", error);
                alert("Error al actualizar el producto: " + error.message);
            }
        } else { // Crear nuevo producto
            try {
                const newProduct = await apiService.createProduct(productData);
                setProducts([...products, newProduct]);
            } catch (error) {
                console.error("Error al crear producto:", error);
                alert("Error al crear el producto: " + error.message);
            }
        }

        // Recargar la lista y cerrar el modal
        handleCloseModal();
        fetchProducts();
    };

    // Manejar la eliminación de un producto
    const handleDelete = async (productId) => {
        if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
            try {
                await apiService.deleteProduct(productId);
                setProducts(products.filter(p => p.id !== productId));
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                alert("No se pudo eliminar el producto: " + error.message);
            }
        }
    };

    if (loading) return <CircularProgress />;

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
                        Gestión de Productos
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenCreateModal}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        Nuevo Producto
                    </Button>
                </Box>
                <Box sx={{ mb: 2 }}>
                    {totalElements > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                                label={`${totalElements} Productos totales`}
                                variant="outlined"
                                color="primary"
                            />
                            <Typography variant="body2" color="text.secondary">
                                Página {page + 1} de {totalPages}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <TableContainer
                    sx={{
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        maxHeight: '70vh',
                        overflow: 'auto'
                    }}
                >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, minWidth: 80 }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 600, minWidth: 200 }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 600, minWidth: 300 }}>Descripción</TableCell>
                                <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>Precio</TableCell>
                                <TableCell sx={{ fontWeight: 600, minWidth: 150 }}>Imagen</TableCell>
                                <TableCell sx={{ fontWeight: 600, minWidth: 140, textAlign: 'center' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products && products.length > 0 ? products.map((product) => {
                                return (
                                    <TableRow
                                        key={product.id}
                                        sx={{
                                            '&:hover': {
                                                bgcolor: 'action.hover'
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ fontFamily: 'monospace' }}>{product.id}</TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{product.name}</TableCell>
                                        <TableCell
                                            sx={{
                                                maxWidth: 300,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {product.description}
                                        </TableCell>
                                        <TableCell sx={{
                                            fontWeight: 600,
                                            color: 'primary.main'
                                        }}>
                                            ${product.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {product.imageUrl && (
                                                <Box
                                                    component="img"
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    sx={{
                                                        width: 50,
                                                        height: 50,
                                                        objectFit: 'cover',
                                                        borderRadius: 1,
                                                        border: '1px solid',
                                                        borderColor: 'divider'
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                <IconButton
                                                    onClick={() => handleOpenEditModal(product)}
                                                    size="small"
                                                    sx={{
                                                        color: 'primary.main',
                                                        '&:hover': {
                                                            bgcolor: 'primary.light',
                                                            color: 'white'
                                                        }
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleDelete(product.id)}
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
                                        <Typography color="text.secondary">No hay Productos disponibles</Typography>
                                    </TableCell>
                                </TableRow>
                            )
                            }
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

            <ProductFormModal
                open={isModalOpen}
                onClose={handleCloseModal}
                product={editingProduct}
                onSave={handleSaveProduct}
            />
            <ProductUpdateFormModal
                open={isUpdateModalOpen}
                onClose={handleCloseModal}
                product={editingProduct}
                onSave={handleSaveProduct}
            />
        </Box>
    );
};

export default ManageProductsPage;
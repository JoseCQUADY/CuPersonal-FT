import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/apiService';
import {
    Container, Typography, Box, Grid, Card, CardContent, Button,
    CircularProgress, Alert, Chip, Avatar, Paper, Stack, Divider,
    LinearProgress
} from '@mui/material';
import {
    Inventory as InventoryIcon,
    ShoppingBag as ShoppingBagIcon,
    Warning as WarningIcon,
    Edit as EditIcon,
    Add as AddIcon,
    TrendingUp as TrendingUpIcon,
    Store as StoreIcon,
    ExitToApp as LogoutIcon,
    Dashboard as DashboardIcon,
    Analytics as AnalyticsIcon,
    Assignment as AssignmentIcon
} from '@mui/icons-material';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const [supplies, setSupplies] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [suppliesData, productsData] = await Promise.all([
                apiService.getSupplies(0, 50),
                apiService.getProducts(0, 50)
            ]);
            
            setSupplies(suppliesData.content || []);
            setProducts(productsData.content || []);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Error al cargar los datos del dashboard');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const lowStockSupplies = supplies.filter(supply => supply.quantity <= supply.minimumQuantity);
    const totalProducts = products.length;
    const totalSupplies = supplies.length;
    const averagePrice = products.length > 0 
        ? (products.reduce((sum, product) => sum + product.price, 0) / products.length).toFixed(2)
        : 0;

    const userName = user?.name || 'Administrador';

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Header moderno estilo Ánfora */}
            <Paper 
                sx={{ 
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 4,
                    mb: 4,
                    borderRadius: 0
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 64, height: 64 }}>
                                <DashboardIcon sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                    ¡Bienvenido, {userName}!
                                </Typography>
                                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                    Panel de Control - CuPersonal Admin
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<LogoutIcon />}
                            onClick={logout}
                            sx={{ 
                                px: 3,
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: 'uppercase'
                            }}
                        >
                            Cerrar Sesión
                        </Button>
                    </Box>
                </Container>
            </Paper>

            <Container maxWidth="lg">
                {/* Métricas principales */}
                <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ 
                            textAlign: 'center', 
                            p: 3,
                            background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 100%)',
                            color: 'white'
                        }}>
                            <StoreIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                {totalProducts}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 500, opacity: 0.9 }}>
                                Productos Activos
                            </Typography>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ 
                            textAlign: 'center', 
                            p: 3,
                            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F65 100%)',
                            color: 'white'
                        }}>
                            <InventoryIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                {totalSupplies}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 500, opacity: 0.9 }}>
                                Insumos Registrados
                            </Typography>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ 
                            textAlign: 'center', 
                            p: 3,
                            background: lowStockSupplies.length > 0 
                                ? 'linear-gradient(135deg, #E74C3C 0%, #F39C12 100%)'
                                : 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)',
                            color: 'white'
                        }}>
                            <WarningIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                {lowStockSupplies.length}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 500, opacity: 0.9 }}>
                                {lowStockSupplies.length > 0 ? 'Stock Bajo' : 'Stock OK'}
                            </Typography>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ 
                            textAlign: 'center', 
                            p: 3,
                            background: 'linear-gradient(135deg, #3498DB 0%, #5DADE2 100%)',
                            color: 'white'
                        }}>
                            <TrendingUpIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                ${averagePrice}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 500, opacity: 0.9 }}>
                                Precio Promedio
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>

                {/* Alertas de inventario */}
                {loading ? (
                    <Box sx={{ mb: 4 }}>
                        <LinearProgress color="primary" />
                        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                            Cargando datos del inventario...
                        </Typography>
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        {error}
                    </Alert>
                ) : lowStockSupplies.length > 0 ? (
                    <Alert 
                        severity="warning" 
                        icon={<WarningIcon />} 
                        sx={{ mb: 4 }}
                        action={
                            <Button 
                                component={RouterLink} 
                                to="/admin/supplies" 
                                color="inherit" 
                                variant="outlined"
                                size="small"
                            >
                                Gestionar Inventario
                            </Button>
                        }
                    >
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                            ⚠️ Alerta de Inventario Crítico
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {lowStockSupplies.length} insumo(s) requieren reabastecimiento inmediato
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {lowStockSupplies.slice(0, 3).map(supply => (
                                <Chip 
                                    key={supply.id}
                                    label={`${supply.name} (${supply.quantity}/${supply.minimumQuantity})`}
                                    size="small"
                                    color="warning"
                                    variant="outlined"
                                />
                            ))}
                            {lowStockSupplies.length > 3 && (
                                <Chip 
                                    label={`+${lowStockSupplies.length - 3} más`}
                                    size="small"
                                    variant="outlined"
                                />
                            )}
                        </Stack>
                    </Alert>
                ) : (
                    <Alert severity="success" sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                ✅ Estado del Inventario: Óptimo
                            </Typography>
                        </Box>
                        <Typography variant="body2">
                            Todos los insumos están por encima de sus niveles mínimos establecidos.
                        </Typography>
                    </Alert>
                )}

                {/* Tarjetas de gestión */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {/* Gestión de Productos */}
                    <Grid item xs={12} md={6}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(51, 153, 255, 0.05) 100%)',
                                border: '2px solid rgba(0, 102, 204, 0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    border: '2px solid rgba(0, 102, 204, 0.3)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Avatar sx={{ bgcolor: 'primary.main', mr: 3, width: 56, height: 56 }}>
                                        <StoreIcon sx={{ fontSize: 28 }} />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            Catálogo de Productos
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Administra tu inventario de tazas
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, color: 'text.secondary' }}>
                                    Crea nuevos productos, actualiza precios y descripciones, 
                                    gestiona imágenes y configura materiales necesarios para cada taza.
                                </Typography>
                                
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        component={RouterLink}
                                        to="/admin/products"
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        sx={{ flexGrow: 1, py: 1.5 }}
                                    >
                                        Gestionar Productos
                                    </Button>
                                    <Button
                                        component={RouterLink}
                                        to="/admin/products/new"
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        sx={{ py: 1.5 }}
                                    >
                                        Nuevo
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Gestión de Insumos */}
                    <Grid item xs={12} md={6}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 143, 101, 0.05) 100%)',
                                border: '2px solid rgba(255, 107, 53, 0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    border: '2px solid rgba(255, 107, 53, 0.3)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 3, width: 56, height: 56 }}>
                                        <InventoryIcon sx={{ fontSize: 28 }} />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            Control de Inventario
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Administra materiales y suministros
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, color: 'text.secondary' }}>
                                    Controla el stock de materiales, establece niveles mínimos, 
                                    recibe alertas automáticas y gestiona proveedores de insumos.
                                </Typography>
                                
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        component={RouterLink}
                                        to="/admin/supplies"
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<ShoppingBagIcon />}
                                        sx={{ flexGrow: 1, py: 1.5 }}
                                    >
                                        Gestionar Insumos
                                    </Button>
                                    <Button
                                        component={RouterLink}
                                        to="/admin/supplies/new"
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<AddIcon />}
                                        sx={{ py: 1.5 }}
                                    >
                                        Nuevo
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Sección de reportes y análisis */}
                <Card sx={{ mb: 4 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AnalyticsIcon sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                        Centro de Análisis
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Reportes y métricas de desempeño
                                    </Typography>
                                </Box>
                            </Box>
                            <Chip 
                                label="Próximamente" 
                                color="info"
                                variant="outlined"
                                icon={<AssignmentIcon />}
                            />
                        </Box>
                        
                        <Divider sx={{ my: 3 }} />
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>Ventas del Mes</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Análisis de productos más vendidos
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>Tendencias de Stock</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Predicción de reabastecimiento
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>Rentabilidad</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Análisis de márgenes por producto
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
                            Las funcionalidades de análisis avanzado, reportes de ventas y gestión de pedidos 
                            estarán disponibles en la próxima actualización del sistema.
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default DashboardPage;
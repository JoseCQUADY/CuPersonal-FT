import React, { useState, useEffect } from 'react';
import { 
    Grid, 
    CircularProgress, 
    Box, 
    Typography, 
    Alert, 
    Container,
    Button,
    Paper,
    Chip,
    Pagination,
    TextField,
    InputAdornment,
    Breadcrumbs,
    Link
} from '@mui/material';
import { 
    Search as SearchIcon,
    Store as StoreIcon,
    LocalShipping as ShippingIcon,
    Security as SecurityIcon,
    Support as SupportIcon,
    Star as StarIcon,
    TrendingUp as TrendingIcon
} from '@mui/icons-material';
import MugCard from '../components/ProductCard';
import { apiService } from '../services/apiService';

const HomePage = () => {
    const [mugs, setMugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchMugs = async (pageNum = 0) => {
        try {
            setLoading(true);
            const data = await apiService.getProducts(pageNum, 8);
            setMugs(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            setPage(data.page);
        } catch (err) {
            console.error("Error fetching mugs:", err);
            setError("No se pudieron cargar los productos. Por favor, intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMugs();
    }, []);

    const handlePageChange = (event, value) => {
        fetchMugs(value - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMugs = mugs.filter(mug =>
        mug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mug.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && page === 0) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    minHeight: '60vh' 
                }}
            >
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    return (
        <>
            {/* Hero Banner - Estilo Ánfora */}
            <Box sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                py: { xs: 4, md: 6 },
                mb: 4
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography 
                                variant="h2" 
                                component="h1" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 700,
                                    fontSize: { xs: '2rem', md: '3rem' }
                                }}
                            >
                                Tazas Personalizadas Premium
                            </Typography>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    mb: 3, 
                                    opacity: 0.9,
                                    fontWeight: 400,
                                    lineHeight: 1.4
                                }}
                            >
                                Diseños únicos, calidad garantizada y entrega rápida. 
                                Más de 10,000 clientes satisfechos.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button 
                                    variant="contained" 
                                    color="secondary"
                                    size="large"
                                    sx={{ px: 4, py: 1.5 }}
                                >
                                    Ver Catálogo
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="inherit"
                                    size="large"
                                    sx={{ 
                                        px: 4, 
                                        py: 1.5,
                                        borderColor: 'white',
                                        '&:hover': {
                                            borderColor: 'white',
                                            bgcolor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    Personalizar
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                            <Box sx={{ 
                                bgcolor: 'rgba(255,255,255,0.1)',
                                borderRadius: 2,
                                p: 3,
                                backdropFilter: 'blur(10px)'
                            }}>
                                <StoreIcon sx={{ fontSize: 80, mb: 2, opacity: 0.8 }} />
                                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                    {totalElements}+
                                </Typography>
                                <Typography variant="body1">
                                    Productos Disponibles
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Características - Estilo Ánfora */}
            <Container maxWidth="lg" sx={{ mb: 6 }}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                            <ShippingIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Envío Gratis
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                En compras mayores a $500
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                            <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Compra Segura
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Pagos 100% protegidos
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                            <SupportIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Soporte 24/7
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Atención personalizada
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                            <StarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Calidad Premium
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Materiales de primera
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="lg">
                {/* Breadcrumbs y filtros */}
                <Box sx={{ mb: 4 }}>
                    <Breadcrumbs sx={{ mb: 2 }}>
                        <Link underline="hover" color="inherit" href="/">
                            Inicio
                        </Link>
                        <Typography color="text.primary">Productos</Typography>
                    </Breadcrumbs>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography 
                            variant="h4" 
                            component="h2" 
                            sx={{ 
                                fontWeight: 600,
                                color: 'text.primary',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <TrendingIcon color="primary" />
                            Productos Destacados
                        </Typography>
                        
                        <TextField
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            size="small"
                            sx={{ width: { xs: '100%', sm: 300 } }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    
                    {totalElements > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip 
                                label={`${totalElements} productos encontrados`}
                                variant="outlined"
                                color="primary"
                            />
                            <Typography variant="body2" color="text.secondary">
                                Página {page + 1} de {totalPages}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {error && (
                    <Alert 
                        severity="warning" 
                        sx={{ mb: 3, borderRadius: 2 }}
                        action={
                            <Button 
                                color="inherit" 
                                size="small" 
                                onClick={() => fetchMugs(page)}
                            >
                                Reintentar
                            </Button>
                        }
                    >
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress size={50} />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={3} sx={{ mb: 6 }} justifyContent="center">
                            {(searchTerm ? filteredMugs : mugs).map((mug) => (
                                <Grid item key={mug.id} xs={12} sm={6} md={4} lg={3}>
                                    <MugCard product={mug} />
                                </Grid>
                            ))}
                        </Grid>

                        {(searchTerm ? filteredMugs : mugs).length === 0 && (
                            <Paper 
                                sx={{ 
                                    p: 8, 
                                    textAlign: 'center',
                                    backgroundColor: 'grey.50'
                                }}
                            >
                                <StoreIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                                <Typography variant="h5" gutterBottom color="text.secondary">
                                    {searchTerm ? 'No se encontraron productos' : 'No hay productos disponibles'}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                    {searchTerm 
                                        ? `No hay resultados para "${searchTerm}"`
                                        : 'Estamos trabajando para traerte nuevos diseños increíbles.'
                                    }
                                </Typography>
                                {searchTerm && (
                                    <Button 
                                        variant="outlined" 
                                        onClick={() => setSearchTerm('')}
                                    >
                                        Ver todos los productos
                                    </Button>
                                )}
                            </Paper>
                        )}

                        {/* Paginación */}
                        {totalPages > 1 && !searchTerm && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
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
                                            backgroundColor: 'white',
                                            borderRadius: 2,
                                            p: 1,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }
                                    }}
                                />
                            </Box>
                        )}
                    </>
                )}

                {/* Call to Action */}
                <Paper sx={{ 
                    mt: 8, 
                    p: 6, 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                        ¿No encuentras lo que buscas?
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                        Contáctanos para crear un diseño personalizado único para ti
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary"
                        size="large"
                        sx={{ px: 4, py: 1.5 }}
                    >
                        Solicitar Cotización
                    </Button>
                </Paper>
            </Container>
        </>
    );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Chip,
    Rating,
    Divider,
    IconButton,
    Paper,
    Breadcrumbs,
    Link,
    Alert,
    CircularProgress,
    ButtonGroup,
    Card,
    CardContent,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    ShoppingCart as CartIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Share as ShareIcon,
    LocalOffer as OfferIcon,
    Verified as VerifiedIcon,
    LocalShipping as ShippingIcon,
    Security as SecurityIcon,
    Assignment as AssignmentIcon,
    Star as StarIcon
} from '@mui/icons-material';
import { apiService } from '../services/apiService';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    // Mock additional data (in real app, this would come from API)
    const mockReviews = [
        {
            id: 1,
            user: 'María García',
            avatar: 'https://i.pravatar.cc/40?img=1',
            rating: 5,
            comment: 'Excelente calidad, la impresión quedó perfecta. ¡Muy recomendado!',
            date: '2024-11-15'
        },
        {
            id: 2,
            user: 'Carlos López',
            avatar: 'https://i.pravatar.cc/40?img=2',
            rating: 4,
            comment: 'Muy buena taza, el diseño es tal como se ve en la imagen.',
            date: '2024-11-10'
        }
    ];

    const mockImages = [
        'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop'
    ];

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await apiService.getProductById(id);
            setProduct(data);
        } catch (err) {
            setError('Error al cargar el producto');
            console.error('Error fetching product:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addToCart({
                    ...product,
                    stock: Math.floor(Math.random() * 15) + 5 // Mock stock
                });
            }
        }
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress size={60} />
                </Box>
            </Container>
        );
    }

    if (error || !product) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error || 'Producto no encontrado'}
                </Alert>
                <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
                    Volver
                </Button>
            </Container>
        );
    }

    const mockStock = Math.floor(Math.random() * 15) + 5;
    const isOutOfStock = mockStock <= 0;
    const isLowStock = mockStock <= 5;
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 100) + 10;
    const hasDiscount = Math.random() > 0.6;
    const discountPercentage = 15;
    const originalPrice = hasDiscount ? product.price * 1.15 : product.price;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                    Inicio
                </Link>
                <Link underline="hover" color="inherit" onClick={() => navigate('/products')} sx={{ cursor: 'pointer' }}>
                    Productos
                </Link>
                <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>

            {/* Back Button */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={{ mb: 3 }}
            >
                Volver
            </Button>

            <Grid container spacing={4} sx={{ flexWrap: 'nowrap' }}>
                {/* Product Images */}
                <Grid item xs={12} md={6} sx={{ minWidth: 0 }}>
                    <Box sx={{ position: 'sticky', top: 100 }}>
                        {/* Main Image */}
                        <Paper sx={{ p: 2, mb: 2, position: 'relative', maxWidth: 550 }}>
                            {hasDiscount && (
                                <Chip
                                    icon={<OfferIcon />}
                                    label={`-${discountPercentage}%`}
                                    color="secondary"
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        left: 16,
                                        zIndex: 2,
                                        fontWeight: 'bold'
                                    }}
                                />
                            )}
                            <Box
                                component="img"
                                src={product.imageUrl || mockImages[selectedImage]}
                                alt={product.name}
                                sx={{
                                    width: '100%',
                                    height: 400,
                                    objectFit: 'cover',
                                    borderRadius: 1
                                }}
                            />
                        </Paper>
                    </Box>
                </Grid>

                {/* Product Info */}
                <Grid item xs={12} md={6} sx={{ minWidth: 0 }}>
                    <Box>
                        {/* Product Title and Rating */}
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                            {product.name}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Rating value={parseFloat(rating)} precision={0.1} readOnly />
                            <Typography variant="body2" color="text.secondary">
                                ({reviewCount} reseñas)
                            </Typography>
                            <Chip label="Bestseller" size="small" color="success" variant="outlined" />
                        </Box>

                        {/* Price */}
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                                    ${product.price.toFixed(2)}
                                </Typography>
                                {hasDiscount && (
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            textDecoration: 'line-through',
                                            color: 'text.secondary'
                                        }}
                                    >
                                        ${originalPrice.toFixed(2)}
                                    </Typography>
                                )}
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                Impuestos incluidos • Envío calculado al finalizar compra
                            </Typography>
                        </Box>

                        {/* Stock Status */}
                        <Box sx={{ mb: 3 }}>
                            {!isOutOfStock ? (
                                <Chip
                                    label={isLowStock ? `¡Solo quedan ${mockStock}!` : 'En stock'}
                                    color={isLowStock ? 'warning' : 'success'}
                                    icon={<VerifiedIcon />}
                                />
                            ) : (
                                <Chip label="Agotado" color="error" />
                            )}
                        </Box>

                        {/* Description */}
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                            {product.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {/* Quantity and Add to Cart */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                                Cantidad:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <ButtonGroup variant="outlined">
                                    <Button onClick={() => handleQuantityChange(quantity - 1)}>-</Button>
                                    <Button disabled>{quantity}</Button>
                                    <Button onClick={() => handleQuantityChange(quantity + 1)}>+</Button>
                                </ButtonGroup>
                                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                                    Máximo 10 unidades por pedido
                                </Typography>
                            </Box>
                        </Box>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<CartIcon />}
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                sx={{ flexGrow: 1, py: 1.5 }}
                            >
                                {isOutOfStock ? 'Sin Stock' : 'Agregar al Carrito'}
                            </Button>
                            <IconButton
                                color={isFavorite ? 'error' : 'default'}
                                onClick={() => setIsFavorite(!isFavorite)}
                                size="large"
                                sx={{ border: '1px solid', borderColor: 'divider' }}
                            >
                                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                            <IconButton size="large" sx={{ border: '1px solid', borderColor: 'divider' }}>
                                <ShareIcon />
                            </IconButton>
                        </Box>

                        {/* Product Features */}
                        <Card variant="outlined" sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    Incluye:
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: 'success.light', width: 32, height: 32 }}>
                                                <ShippingIcon fontSize="small" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Envío gratis"
                                            secondary="En compras mayores a $500"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: 'info.light', width: 32, height: 32 }}>
                                                <SecurityIcon fontSize="small" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Garantía de calidad"
                                            secondary="30 días de garantía"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: 'warning.light', width: 32, height: 32 }}>
                                                <AssignmentIcon fontSize="small" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Personalización incluida"
                                            secondary="Sin costo adicional"
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>

                        {/* Reviews Section */}
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Reseñas de clientes
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Rating value={parseFloat(rating)} precision={0.1} readOnly size="small" />
                                <Typography variant="body2">
                                    {rating} de 5 estrellas ({reviewCount} reseñas)
                                </Typography>
                            </Box>
                        </Box>

                        {/* Individual Reviews */}
                        <Box>
                            {mockReviews.map((review) => (
                                <Paper key={review.id} sx={{ p: 2, mb: 2 }} variant="outlined">
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Avatar
                                            src={review.avatar}
                                            alt={review.user}
                                            sx={{ width: 32, height: 32, mr: 1 }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                {review.user}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Rating value={review.rating} size="small" readOnly />
                                                <Typography variant="caption" color="text.secondary">
                                                    {review.date}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2">
                                        {review.comment}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetailPage;
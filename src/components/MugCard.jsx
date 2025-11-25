import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Button, 
    Box, 
    Chip,
    IconButton,
    Rating
} from '@mui/material';
import { 
    ShoppingCart as ShoppingCartIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    LocalOffer as OfferIcon,
    Visibility as ViewIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const MugCard = ({ mug }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart({
            ...mug,
            stock: Math.floor(Math.random() * 15) + 5 // Mock stock
        });
    };

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const handleViewDetails = () => {
        navigate(`/products/${mug.id}`);
    };

    const handleCardClick = () => {
        navigate(`/products/${mug.id}`);
    };

    const stock = Math.floor(Math.random() * 15) + 5;
    const isOutOfStock = stock <= 0;
    const isLowStock = stock <= 5 && stock > 0;
    const discountPercentage = Math.floor(Math.random() * 25) + 5;
    const originalPrice = mug.price * (1 + discountPercentage / 100);
    const hasDiscount = Math.random() > 0.7;
    const rating = (Math.random() * 2 + 3).toFixed(1);

    return (
        <Card 
            sx={{ 
                height: '420px', // Fixed height for uniformity
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,102,204,0.15)',
                }
            }}
            onClick={handleCardClick}
        >
            <Box sx={{ position: 'relative', height: '200px' }}>
                {/* Badges */}
                <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
                    {hasDiscount && (
                        <Chip
                            icon={<OfferIcon />}
                            label={`-${discountPercentage}%`}
                            color="secondary"
                            size="small"
                            sx={{ 
                                fontWeight: 'bold',
                                fontSize: '0.7rem',
                                height: '24px'
                            }}
                        />
                    )}
                </Box>

                {/* Action buttons */}
                <Box sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8, 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                    zIndex: 2
                }}>
                    <IconButton
                        size="small"
                        onClick={handleToggleFavorite}
                        sx={{
                            bgcolor: 'white',
                            color: isFavorite ? 'error.main' : 'grey.600',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            width: 32,
                            height: 32,
                            '&:hover': {
                                bgcolor: 'white',
                                transform: 'scale(1.1)'
                            }
                        }}
                    >
                        {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    </IconButton>
                    
                    <IconButton
                        size="small"
                        onClick={handleViewDetails}
                        sx={{
                            bgcolor: 'white',
                            color: 'grey.600',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            width: 32,
                            height: 32,
                            '&:hover': {
                                bgcolor: 'white',
                                color: 'primary.main',
                                transform: 'scale(1.1)'
                            }
                        }}
                    >
                        <ViewIcon fontSize="small" />
                    </IconButton>
                </Box>

                <CardMedia
                    component="img"
                    height="200"
                    image={mug.imageUrl || 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=200&fit=crop'}
                    alt={mug.name}
                    sx={{ 
                        objectFit: 'cover',
                        filter: isOutOfStock ? 'grayscale(50%)' : 'none'
                    }}
                />
            </Box>

            <CardContent sx={{ 
                flexGrow: 1, 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box>
                    {/* Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating 
                            value={parseFloat(rating)} 
                            precision={0.1} 
                            size="small" 
                            readOnly 
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            ({rating})
                        </Typography>
                    </Box>

                    {/* Product name - Fixed height to prevent size variations */}
                    <Typography 
                        variant="h6" 
                        component="h3"
                        sx={{ 
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            lineHeight: 1.3,
                            mb: 1,
                            height: '2.6em',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {mug.name}
                    </Typography>
                    
                    {/* Description - Fixed height */}
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            mb: 2,
                            height: '3em',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontSize: '0.85rem',
                            lineHeight: 1.5
                        }}
                    >
                        {mug.description}
                    </Typography>
                </Box>

                {/* Price and actions section */}
                <Box>
                    {/* Price section */}
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography 
                                variant="h6" 
                                component="span"
                                sx={{ 
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    fontSize: '1.1rem'
                                }}
                            >
                                ${mug.price.toFixed(2)}
                            </Typography>
                            {hasDiscount && (
                                <Typography 
                                    variant="caption" 
                                    component="span"
                                    sx={{ 
                                        textDecoration: 'line-through',
                                        color: 'text.secondary',
                                        fontSize: '0.7rem'
                                    }}
                                >
                                    ${originalPrice.toFixed(2)}
                                </Typography>
                            )}
                        </Box>
                        
                        {/* Stock indicator */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {!isOutOfStock ? (
                                <Chip 
                                    label={isLowStock ? 'Últimas unidades' : 'Disponible'}
                                    size="small"
                                    color={isLowStock ? 'warning' : 'success'}
                                    variant="outlined"
                                    sx={{ fontSize: '0.65rem', height: '20px' }}
                                />
                            ) : (
                                <Chip 
                                    label="Agotado"
                                    size="small"
                                    color="error"
                                    variant="outlined"
                                    sx={{ fontSize: '0.65rem', height: '20px' }}
                                />
                            )}
                        </Box>
                    </Box>

                    {/* Action button */}
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        size="small"
                        sx={{
                            py: 1,
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            borderRadius: 1,
                            '&:disabled': {
                                backgroundColor: 'grey.300',
                                color: 'grey.500'
                            }
                        }}
                    >
                        {isOutOfStock ? 'Sin Stock' : 'Agregar'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MugCard;
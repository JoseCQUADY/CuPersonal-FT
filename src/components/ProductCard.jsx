// src/components/ProductCard.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card 
      sx={{ 
        height: 450, // Altura fija para uniformidad
        width: 350, // Ancho fijo para uniformidad
        display: 'flex', 
        flexDirection: 'column', 
        transition: 'all 0.3s ease-in-out',
        '&:hover': { 
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,102,204,0.15)'
        },
        borderRadius: 3,
        overflow: 'hidden'
      }}
    >
      <Box 
        component={RouterLink} 
        to={`/products/${product.id}`}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardMedia
          component="img"
          height="220" // Altura fija para las imágenes
          image={product.imageUrl}
          alt={product.name}
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
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
          <Typography 
            variant="h6" 
            component="h3"
            sx={{ 
              fontWeight: 600,
              mb: 1,
              fontSize: '1.1rem',
              lineHeight: 1.3,
              height: '2.6em', // Altura fija para 2 líneas
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {product.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: '0.875rem',
              lineHeight: 1.4,
              height: '2.8em', // Altura fija para 2 líneas
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {product.description}
          </Typography>
        </Box>
        
        <Typography 
          variant="h6" 
          color="primary.main" 
          sx={{ 
            fontWeight: 700,
            fontSize: '1.25rem'
          }}
        >
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained" 
          fullWidth
          onClick={() => addToCart(product)}
          sx={{
            py: 1,
            borderRadius: 2,
            fontWeight: 500,
            textTransform: 'none'
          }}
        >
          Agregar al Carrito
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
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
        height: 420,
        display: 'flex', 
        flexDirection: 'column', 
        transition: 'transform 0.12s ease, box-shadow 0.12s ease',
        '&:hover': { 
          transform: 'translateY(-2px)',
          boxShadow: (theme) => theme.palette.mode === 'dark' 
            ? '0 8px 20px rgba(2,6,23,0.6)' 
            : '0 8px 20px rgba(15,23,42,0.08)'
        },
        borderRadius: 2.5,
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
          height="220"
          image={product.imageUrl}
          alt={product.name}
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.03)'
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
              fontSize: '1rem',
              lineHeight: 1.3,
              height: '2.6em',
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
              fontSize: '0.85rem',
              lineHeight: 1.4,
              height: '2.8em',
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
            fontSize: '1.2rem'
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
            py: 0.8,
            borderRadius: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '0.9rem'
          }}
        >
          Agregar al Carrito
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
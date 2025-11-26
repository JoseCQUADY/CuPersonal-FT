import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Box, 
    Button, 
    Badge, 
    Container, 
    IconButton,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme as useMuiTheme
} from '@mui/material';
import {
    ShoppingCart as ShoppingCartIcon,
    AdminPanelSettings as AdminIcon,
    Menu as MenuIcon,
    Store as StoreIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    LocalCafe as CoffeeIcon,
    Category as CategoryIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import CartDrawer from './CartDrawer';

const Layout = ({ children }) => {
    const { getTotalItems, showCartDrawer, openCartDrawer, closeCartDrawer } = useCart();
    const { isAuthenticated } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();
    const theme = useMuiTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [categoriesMenu, setCategoriesMenu] = useState(null);
    
    const totalItems = getTotalItems();
    const isAdminRoute = location.pathname.startsWith('/admin');

    const categories = [
        { name: 'Tazas Personalizadas', path: '/products?category=personalized' },
        { name: 'Tazas Térmicas', path: '/products?category=thermal' },
        { name: 'Tazas de Café', path: '/products?category=coffee' },
        { name: 'Sets de Tazas', path: '/products?category=sets' },
    ];

    const handleCategoriesClick = (event) => {
        setCategoriesMenu(event.currentTarget);
    };

    const handleCategoriesClose = () => {
        setCategoriesMenu(null);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleCartClick = () => {
        openCartDrawer();
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: 'background.default' 
        }}>
            {/* Top Bar - Información de contacto */}
            {!isAdminRoute && (
                <Box sx={{ 
                    bgcolor: '#0f1a2e',
                    color: '#E6EEF8', 
                    py: 1,
                    display: { xs: 'none', md: 'block' },
                    borderBottom: '1px solid rgba(11,83,148,0.1)'
                }}>
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <PhoneIcon sx={{ fontSize: 16 }} />
                                    <Typography variant="body2">+1 (555) 123-4567</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <EmailIcon sx={{ fontSize: 16 }} />
                                    <Typography variant="body2">info@cupersonal.com</Typography>
                                </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton size="small" sx={{ color: 'white' }}>
                                    <FacebookIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                                <IconButton size="small" sx={{ color: 'white' }}>
                                    <InstagramIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                                <IconButton size="small" sx={{ color: 'white' }}>
                                    <TwitterIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            )}

            {/* Main Navigation */}
            <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid' }}>
                <Container maxWidth="lg">
                    <Toolbar sx={{ py: 1 }}>
                        {/* Logo */}
                        <Box 
                            component={RouterLink} 
                            to="/"
                            sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: 'inherit',
                                mr: 4,
                                '&:hover': { opacity: 0.8 }
                            }}
                        >
                            <StoreIcon sx={{ mr: 1.5, fontSize: 28, color: 'primary.main' }} />
                            <Box>
                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        lineHeight: 1,
                                        fontSize: '1.3rem'
                                    }}
                                >
                                    CuPersonal
                                </Typography>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        color: 'text.secondary',
                                        fontSize: '0.65rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                    }}
                                >
                                    Tazas Premium
                                </Typography>
                            </Box>
                        </Box>

                        {/* Desktop Navigation */}
                        {!isAdminRoute && !isMobile && (
                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                <Button
                                    color="inherit"
                                    component={RouterLink}
                                    to="/"
                                    sx={{ mx: 1, fontWeight: 600, fontSize: '0.95rem', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
                                >
                                    Inicio
                                </Button>
                                
                                <Button
                                    color="inherit"
                                    onClick={handleCategoriesClick}
                                    endIcon={<CategoryIcon />}
                                    sx={{ mx: 1, fontWeight: 600, fontSize: '0.95rem', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
                                >
                                    Categorías
                                </Button>
                                
                                <Menu
                                    anchorEl={categoriesMenu}
                                    open={Boolean(categoriesMenu)}
                                    onClose={handleCategoriesClose}
                                >
                                    {categories.map((category) => (
                                        <MenuItem 
                                            key={category.name}
                                            component={RouterLink}
                                            to={category.path}
                                            onClick={handleCategoriesClose}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Menu>

                                <Button
                                    color="inherit"
                                    component={RouterLink}
                                    to="/about"
                                    sx={{ mx: 1, fontWeight: 600, fontSize: '0.95rem', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
                                >
                                    Nosotros
                                </Button>
                                
                                <Button
                                    color="inherit"
                                    component={RouterLink}
                                    to="/contact"
                                    sx={{ mx: 1, fontWeight: 600, fontSize: '0.95rem', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
                                >
                                    Contacto
                                </Button>
                            </Box>
                        )}

                        {/* Spacer for mobile */}
                        <Box sx={{ flexGrow: 1 }} />

                        {/* Actions */}
                        {!isAdminRoute && (
                            <IconButton 
                                color="inherit" 
                                onClick={handleCartClick}
                                sx={{ 
                                    mr: 2,
                                    bgcolor: 'rgba(11,83,148,0.08)',
                                    '&:hover': {
                                        bgcolor: 'rgba(11,83,148,0.15)',
                                    }
                                }}
                            >
                                <Badge 
                                    badgeContent={totalItems} 
                                    color="secondary"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            right: -3,
                                            top: 3,
                                            fontSize: '0.7rem',
                                            height: 18,
                                            minWidth: 18
                                        }
                                    }}
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        )}
                        
                        {/* Theme Toggle */}
                        <IconButton 
                            color="inherit" 
                            onClick={toggleTheme}
                            sx={{ 
                                mr: 2,
                                bgcolor: 'rgba(11,83,148,0.08)',
                                '&:hover': {
                                    bgcolor: 'rgba(11,83,148,0.15)',
                                }
                            }}
                        >
                            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        
                        {/* Admin Button */}
                        <Button 
                            color="primary"
                            variant="outlined" 
                            component={RouterLink} 
                            to={isAuthenticated ? "/admin" : "/admin/login"}
                            startIcon={<AdminIcon />}
                            size="small"
                            sx={{ 
                                display: { xs: 'none', md: 'flex' }
                            }}
                        >
                            {isAuthenticated ? "Panel" : "Admin"}
                        </Button>

                        {/* Mobile Menu Button */}
                        {!isAdminRoute && isMobile && (
                            <IconButton
                                color="inherit"
                                onClick={toggleMobileMenu}
                                sx={{ ml: 1 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={toggleMobileMenu}
            >
                <Box sx={{ width: 250, pt: 2 }}>
                    <List>
                        <ListItem button component={RouterLink} to="/" onClick={toggleMobileMenu}>
                            <ListItemText primary="Inicio" />
                        </ListItem>
                        {categories.map((category) => (
                            <ListItem 
                                button 
                                key={category.name}
                                component={RouterLink} 
                                to={category.path}
                                onClick={toggleMobileMenu}
                            >
                                <ListItemIcon>
                                    <CoffeeIcon />
                                </ListItemIcon>
                                <ListItemText primary={category.name} />
                            </ListItem>
                        ))}
                        <ListItem button component={RouterLink} to="/about" onClick={toggleMobileMenu}>
                            <ListItemText primary="Nosotros" />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/contact" onClick={toggleMobileMenu}>
                            <ListItemText primary="Contacto" />
                        </ListItem>
                        <ListItem button component={RouterLink} to={isAuthenticated ? "/admin" : "/admin/login"} onClick={toggleMobileMenu}>
                            <ListItemIcon>
                                <AdminIcon />
                            </ListItemIcon>
                            <ListItemText primary={isAuthenticated ? "Panel Admin" : "Login Admin"} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            
            {/* Cart Drawer */}
            <CartDrawer open={showCartDrawer} onClose={closeCartDrawer} />
            
            {/* Contenido Principal */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                {isAdminRoute ? (
                    <Container maxWidth="xl" sx={{ py: 3 }}>
                        {children}
                    </Container>
                ) : (
                    children
                )}
            </Box>
            
            {/* Footer corporativo */}
            {!isAdminRoute && (
                <Box 
                    component="footer" 
                    sx={{ 
                        bgcolor: '#0f1a2e',
                        color: '#E6EEF8',
                        py: 4,
                        mt: 'auto',
                        borderTop: '1px solid rgba(11,83,148,0.1)'
                    }}
                >
                    <Container maxWidth="lg">
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' },
                            gap: 4,
                            mb: 3
                        }}>
                            {/* Company Info */}
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <StoreIcon sx={{ mr: 1 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        CuPersonal
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                                    Tu tienda de confianza para tazas personalizadas y productos únicos. 
                                    Calidad garantizada y atención personalizada desde 2024.
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton size="small" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                                        <FacebookIcon />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                                        <InstagramIcon />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                                        <TwitterIcon />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* Categories */}
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Productos
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {categories.map((category) => (
                                        <Button
                                            key={category.name}
                                            component={RouterLink}
                                            to={category.path}
                                            color="inherit"
                                            size="small"
                                            sx={{ justifyContent: 'flex-start', p: 0 }}
                                        >
                                            {category.name}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>

                            {/* Customer Service */}
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Atención al Cliente
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Button color="inherit" size="small" sx={{ justifyContent: 'flex-start', p: 0 }}>
                                        Centro de Ayuda
                                    </Button>
                                    <Button color="inherit" size="small" sx={{ justifyContent: 'flex-start', p: 0 }}>
                                        Políticas de Envío
                                    </Button>
                                    <Button color="inherit" size="small" sx={{ justifyContent: 'flex-start', p: 0 }}>
                                        Devoluciones
                                    </Button>
                                    <Button color="inherit" size="small" sx={{ justifyContent: 'flex-start', p: 0 }}>
                                        Términos y Condiciones
                                    </Button>
                                </Box>
                            </Box>

                            {/* Contact */}
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Contacto
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PhoneIcon sx={{ fontSize: 16 }} />
                                        <Typography variant="body2">+1 (555) 123-4567</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <EmailIcon sx={{ fontSize: 16 }} />
                                        <Typography variant="body2">info@cupersonal.com</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LocationIcon sx={{ fontSize: 16 }} />
                                        <Typography variant="body2">123 Coffee Street, NY</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ 
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            pt: 3,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: 2
                        }}>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                © {new Date().getFullYear()} CuPersonal. Todos los derechos reservados.
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                Hecho con ❤️ para amantes del café
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            )}
        </Box>
    );
};

export default Layout;
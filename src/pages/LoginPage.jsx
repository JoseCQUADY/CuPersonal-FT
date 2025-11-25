import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Paper, 
    Alert, 
    Container,
    Avatar,
    InputAdornment,
    IconButton,
    Divider,
    Chip
} from '@mui/material';
import {
    AdminPanelSettings as AdminIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Store as StoreIcon,
    ArrowBack as ArrowBackIcon,
    Business as BusinessIcon
} from '@mui/icons-material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        
        try {
            const result = await login(email, password);
            if (result.success) {
                navigate(from, { replace: true });
            } else {
                setError(result.error || 'Error de inicio de sesión');
            }
        } catch (err) {
            setError('Error de conexión. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDemoLogin = () => {
        setEmail('admin@cupersonal.com');
        setPassword('SuperPassword123!');
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 50%, #66B2FF 100%)',
            display: 'flex',
            alignItems: 'center',
            py: 4
        }}>
            <Container maxWidth="sm">
                <Paper 
                    sx={{ 
                        p: 6, 
                        borderRadius: 2,
                        background: 'white',
                        boxShadow: '0 8px 32px rgba(0,102,204,0.2)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    {/* Header corporativo */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Avatar 
                            sx={{ 
                                bgcolor: 'primary.main', 
                                width: 64, 
                                height: 64, 
                                mx: 'auto', 
                                mb: 2,
                                boxShadow: '0 4px 12px rgba(0,102,204,0.3)'
                            }}
                        >
                            <BusinessIcon sx={{ fontSize: 32 }} />
                        </Avatar>
                        
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            gutterBottom 
                            sx={{ fontWeight: 700, color: 'primary.main' }}
                        >
                            Panel Administrativo
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <StoreIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                CuPersonal
                            </Typography>
                        </Box>
                        
                        <Typography variant="body1" color="text.secondary">
                            Accede al sistema de gestión empresarial
                        </Typography>
                    </Box>

                    {/* Credenciales de demostración */}
                    <Paper 
                        sx={{ 
                            p: 3, 
                            mb: 3, 
                            bgcolor: 'primary.50',
                            border: '1px solid rgba(0,102,204,0.2)',
                            borderRadius: 2
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                Acceso de Demostración
                            </Typography>
                            <Button 
                                size="small" 
                                variant="outlined" 
                                onClick={handleDemoLogin}
                                sx={{ textTransform: 'none' }}
                            >
                                Usar credenciales
                            </Button>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                    admin@cupersonal.com
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LockIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                    SuperPassword123!
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Formulario de login */}
                    <Box component="form" onSubmit={handleSubmit}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <TextField
                            label="Correo Electrónico Corporativo"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 3 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Contraseña de Acceso"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 4 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            fullWidth 
                            disabled={loading}
                            size="large"
                            sx={{ 
                                py: 1.5, 
                                mb: 3,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                textTransform: 'uppercase'
                            }}
                        >
                            {loading ? 'Autenticando...' : 'Iniciar Sesión'}
                        </Button>

                        <Divider sx={{ my: 3 }}>
                            <Chip label="O" size="small" />
                        </Divider>

                        <Button
                            component={RouterLink}
                            to="/"
                            startIcon={<ArrowBackIcon />}
                            fullWidth
                            variant="text"
                            color="primary"
                            sx={{ 
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem'
                            }}
                        >
                            Volver a la Tienda Principal
                        </Button>
                    </Box>

                    {/* Footer informativo */}
                    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
                            Sistema de Gestión Empresarial v2.0
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                            Para soporte técnico contacte: soporte@cupersonal.com
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
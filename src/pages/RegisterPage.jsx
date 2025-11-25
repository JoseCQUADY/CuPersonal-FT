import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    IconButton,
    InputAdornment,
    Link,
    Divider,
    Chip
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Store as StoreIcon,
    PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        const { name, lastName, email, password, confirmPassword } = formData;
        
        if (!name || !lastName || !email || !password || !confirmPassword) {
            setError('Todos los campos son obligatorios');
            return;
        }
        
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        
        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        setLoading(true);
        
        try {
            const result = await register(formData);
            if (result.success) {
                navigate('/admin/login', { 
                    state: { 
                        message: 'Registro exitoso. Ahora puedes iniciar sesión.' 
                    }
                });
            } else {
                setError(result.error || 'Error en el registro');
            }
        } catch (err) {
            setError('Error de conexión. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper 
                elevation={8} 
                sx={{ 
                    p: 4, 
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                }}
            >
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        mb: 2
                    }}>
                        <StoreIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            CuPersonal
                        </Typography>
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        Crear Cuenta Admin
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Registro para administradores del sistema
                    </Typography>
                </Box>

                <Divider sx={{ mb: 3 }}>
                    <Chip 
                        label="Registro" 
                        color="primary" 
                        icon={<PersonAddIcon />}
                        variant="outlined"
                    />
                </Divider>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Registration Form */}
                <Box component="form" onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <TextField
                            name="name"
                            label="Nombre"
                            fullWidth
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <TextField
                            name="lastName"
                            label="Apellido"
                            fullWidth
                            variant="outlined"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Box>

                    <TextField
                        name="email"
                        label="Correo Electrónico"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{ mb: 3 }}
                        placeholder="admin@cupersonal.com"
                    />

                    <TextField
                        name="password"
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        sx={{ mb: 3 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        helperText="Mínimo 8 caracteres"
                    />

                    <TextField
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        type={showConfirmPassword ? 'text' : 'password'}
                        fullWidth
                        variant="outlined"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        sx={{ mb: 4 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={loading}
                        sx={{ 
                            py: 1.5, 
                            mb: 3,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: 1
                        }}
                    >
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </Button>
                </Box>

                {/* Login Link */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        ¿Ya tienes una cuenta?{' '}
                        <Link 
                            component={RouterLink} 
                            to="/admin/login" 
                            sx={{ fontWeight: 600 }}
                        >
                            Iniciar Sesión
                        </Link>
                    </Typography>
                </Box>

                {/* Back to Store */}
                <Divider sx={{ my: 3 }} />
                <Box sx={{ textAlign: 'center' }}>
                    <Link 
                        component={RouterLink} 
                        to="/" 
                        variant="body2"
                        sx={{ 
                            textDecoration: 'none',
                            color: 'primary.main',
                            fontWeight: 500
                        }}
                    >
                        ← Volver a la tienda
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;
import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
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
    Link,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider
} from '@mui/material';
import {
    Email as EmailIcon,
    ExpandMore as ExpandMoreIcon,
    Phone as PhoneIcon,
    LocationOn as LocationOnIcon
} from '@mui/icons-material';

const HomePage = () => {
    const cupersonalEmail = "info@cupersonal.com";
    const cupersonalPhone = "+1 (555) 123-4567";

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get("section");

        if (section) {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            {/* Título principal */}
            <Typography variant="h3" fontWeight={700} gutterBottom>
                Sobre CuPersonal
            </Typography>

            <Typography variant="body1" sx={{ mb: 4 }}>
                Conoce más sobre nosotros, nuestros servicios y cómo podemos ayudarte.
            </Typography>

            {/* NOSOTROS */}
            <Paper id="nosotros" style={{ scrollMarginTop: "10px" }} sx={{ p: 3, mb: 4}}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Nosotros
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    En CuPersonal nos especializamos en la creación de tazas personalizadas y productos únicos
                    hechos especialmente para ti. Nuestra misión es ofrecer artículos de calidad con un toque personal,
                    cuidando cada detalle desde la producción hasta la entrega.
                    <br /><br />
                    Desde 2024 hemos trabajado para brindar una experiencia agradable, segura y confiable a nuestros
                    clientes, enfocándonos en un servicio rápido y confiable.
                </Typography>
            </Paper>

            {/* CONTACTO */}
            <Paper id="contacto" style={{ scrollMarginTop: "10px" }} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Contacto
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <EmailIcon />
                            <Typography>{cupersonalEmail}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <PhoneIcon />
                            <Typography>{cupersonalPhone}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LocationOnIcon />
                            <Typography>Ciudad de México, México</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* ATENCIÓN AL CLIENTE */}
            <Paper id="atencion" style={{ scrollMarginTop: "10px" }} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Atención al Cliente
                </Typography>

                <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
                    Centro de ayuda
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Encuentra respuestas rápidas y asistencia personalizada para cualquier problema o duda a través de correo electrónico o por el teléfono.
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" fontWeight={600}>
                    Políticas de envío
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Enviamos a todo México. El tiempo de entrega estimado es de 3 a 7 días hábiles.
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" fontWeight={600}>
                    Devoluciones
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Si tu producto llegó dañado o no cumple con lo solicitado, puedes solicitar una reposición o reembolso.
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" fontWeight={600}>
                    Términos y Condiciones
                </Typography>
                <Typography variant="body2">
                    Consulta las reglas y condiciones de compra, uso de la tienda y políticas de servicio.
                </Typography>
            </Paper>

            {/* SECCIÓN: PREGUNTAS FRECUENTES */}
            <Paper id="preguntas" style={{ scrollMarginTop: "10px" }} sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Preguntas Frecuentes (FAQ)
                </Typography>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>¿Cuánto tarda mi pedido?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            El tiempo estimado es de 3 a 7 días hábiles. Durante temporadas altas puede variar.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>¿Puedo personalizar cualquier taza?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Sí, puedes subir tu diseño o elegir entre nuestras plantillas.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>¿Aceptan devoluciones?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Sí, siempre que el producto llegue dañado o no coincida con tu pedido.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>¿Cómo puedo contactarlos?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Puedes enviarnos un correo a contacto@cupersonal.com o vía WhatsApp.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Container>
    );
};

export default HomePage;
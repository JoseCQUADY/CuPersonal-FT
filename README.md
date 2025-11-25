# CuPersonal - E-commerce de Tazas Personalizadas

Una aplicación moderna de e-commerce especializada en tazas personalizadas, construida con React, Material-UI y Vite.

## 🚀 Características

### **Tienda Online**
- Catálogo de productos con diseño profesional estilo Almacenes Ánfora
- Tarjetas de productos uniformes y responsivas
- Carrito de compras con drawer lateral
- Páginas de detalle de productos completas
- Sistema de búsqueda y filtrado
- Diseño responsivo para móviles y desktop

### **Panel de Administración**
- Dashboard completo para administradores
- Gestión de productos (CRUD completo)
- Gestión de inventario/insumos
- Sistema de autenticación seguro
- Vistas protegidas con rutas privadas

### **Arquitectura de Services**
- API Services completamente implementados
- Mock Data para desarrollo y pruebas
- Preparado para cambiar a APIs reales fácilmente
- Todos los endpoints documentados y funcionales

## 📋 Endpoints Implementados

### **Autenticación**
- `POST /auth-api/register` - Registro de usuarios
- `POST /auth-api/login` - Inicio de sesión

### **Productos (Público)**
- `GET /app-api/products` - Obtener productos paginados
- `GET /app-api/products/{id}` - Detalle de producto público

### **Productos (Administrador)**
- `GET /app-api/products/admin/{id}` - Detalle completo de producto
- `POST /app-api/products` - Crear nuevo producto
- `PUT /app-api/products/{id}` - Actualizar producto
- `DELETE /app-api/products/{id}` - Eliminar producto

### **Insumos/Inventario (Administrador)**
- `GET /app-api/supplies` - Listar insumos paginados
- `GET /app-api/supplies/{id}` - Detalle de insumo
- `POST /app-api/supplies` - Crear nuevo insumo
- `PUT /app-api/supplies/{id}` - Actualizar insumo
- `DELETE /app-api/supplies/{id}` - Eliminar insumo

## 🛠️ Instalación y Uso

### **Requisitos Previos**
- Node.js (v16 o superior)
- npm o yarn

### **Instalación**
```bash
# Clonar e instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

### **Datos de Prueba**
```javascript
// Usuario administrador por defecto
Email: admin@cupersonal.com
Password: SuperPassword123!

// También puedes registrar nuevos usuarios desde /admin/register
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout.jsx      # Layout principal con navegación
│   ├── MugCard.jsx     # Tarjeta de producto optimizada
│   ├── CartDrawer.jsx  # Drawer del carrito de compras
│   └── ...
├── pages/              # Páginas de la aplicación
│   ├── HomePage.jsx    # Página principal de la tienda
│   ├── ProductDetailPage.jsx # Detalle de productos
│   ├── CartPage.jsx    # Página del carrito
│   ├── LoginPage.jsx   # Login de administradores
│   ├── admin/          # Páginas de administración
│   └── ...
├── context/            # Context providers
│   ├── CartContext.jsx # Manejo del carrito de compras
│   ├── AuthContext.jsx # Autenticación y usuarios
│   └── ...
├── services/           # Servicios de API
│   ├── apiService.js   # Servicio principal de API
│   ├── mockApiService.js # Mock data para desarrollo
│   └── ...
├── theme.js           # Configuración del tema Material-UI
└── App.jsx           # Componente principal
```

## 🎨 Diseño y UX

### **Inspirado en Almacenes Ánfora**
- Colores corporativos: Azul (#0066CC) y Naranja (#FF6B35)
- Diseño limpio y profesional
- Navegación intuitiva y responsiva
- Cards uniformes con altura fija
- Hover effects y animaciones suaves

### **Características Responsivas**
- Breakpoints optimizados para móviles, tablets y desktop
- Navigation drawer para dispositivos móviles
- Grid system adaptable
- Tipografía escalable

## 🔧 Migración a APIs Reales

El proyecto está preparado para migrar fácilmente de Mock Data a APIs reales:

### **Paso 1: Actualizar apiService.js**
```javascript
// Cambiar de mockApiService a implementaciones reales
export const apiService = {
    // Reemplazar con llamadas HTTP reales
    login: async (email, password) => {
        const response = await fetch('/auth-api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    },
    // ... resto de endpoints
};
```

### **Paso 2: Configurar Variables de Entorno**
```javascript
// .env
VITE_API_BASE_URL=https://tu-api.com
VITE_API_TIMEOUT=10000
```

### **Paso 3: Actualizar Context Providers**
Los contexts ya manejan errores y estados de carga, solo necesitas ajustar los mensajes de error específicos de tu API.

## 📱 Funcionalidades Implementadas

### **Carrito de Compras**
- ✅ Agregar productos al carrito
- ✅ Drawer lateral automático al agregar items
- ✅ Incrementar/decrementar cantidades
- ✅ Eliminar productos del carrito
- ✅ Persistencia en localStorage
- ✅ Cálculo automático de totales

### **Navegación**
- ✅ Rutas públicas y privadas
- ✅ Breadcrumbs informativos
- ✅ Navegación responsive
- ✅ Links de categorías y footer
- ✅ Protección de rutas administrativas

### **Productos**
- ✅ Catálogo paginado
- ✅ Búsqueda en tiempo real
- ✅ Cards uniformes y responsive
- ✅ Páginas de detalle completas
- ✅ Imágenes placeholder optimizadas
- ✅ Estados de stock simulados

### **Administración**
- ✅ Dashboard con métricas
- ✅ CRUD completo de productos
- ✅ CRUD completo de insumos
- ✅ Validaciones de negocio
- ✅ Manejo de errores

## 🎯 Próximos Pasos

Para completar la funcionalidad de e-commerce:

1. **Implementar checkout y pagos**
2. **Agregar sistema de órdenes**
3. **Conectar con APIs reales**
4. **Agregar más filtros de productos**
5. **Implementar sistema de reviews**
6. **Agregar notificaciones push**

## 📞 Soporte

Para preguntas o problemas:
- Revisar el código de `mockApiService.js` para entender la estructura de datos
- Verificar los contexts en `src/context/` para el manejo de estado
- Consultar `theme.js` para personalización de estilos

---

**Desarrollado con ❤️ para CuPersonal - Tu tienda de tazas personalizadas**

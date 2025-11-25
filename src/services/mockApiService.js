// Mock API Service with all required endpoints
let mockProducts = [
  {
    id: 101,
    name: "Taza personalizada con nombre",
    description: "Taza blanca de cerámica con tu nombre impreso en alta calidad.",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop"
  },
  {
    id: 102,
    name: "Taza personalizada arcoíris",
    description: "Taza con diseño multicolor hecho a mano con pinturas especiales.",
    price: 249.99,
    imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop"
  },
  {
    id: 103,
    name: "Taza personalizada galaxia",
    description: "Taza con diseño de galaxia en pintura metálica brillante.",
    price: 279.99,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
  },
  {
    id: 104,
    name: "Taza vintage café premium",
    description: "Taza de estilo vintage perfecta para los amantes del café tradicional.",
    price: 189.99,
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop"
  },
  {
    id: 105,
    name: "Taza minimalista moderna",
    description: "Diseño elegante y minimalista para el hogar moderno contemporáneo.",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&h=400&fit=crop"
  },
  {
    id: 106,
    name: "Taza térmica deportiva pro",
    description: "Taza térmica de doble pared ideal para deportistas y actividades outdoor.",
    price: 329.99,
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
  },
  {
    id: 107,
    name: "Taza cerámica artesanal",
    description: "Taza hecha a mano por artesanos locales con técnicas tradicionales.",
    price: 219.99,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop"
  },
  {
    id: 108,
    name: "Set tazas familiares 4 piezas",
    description: "Set de 4 tazas personalizadas perfectas para toda la familia.",
    price: 399.99,
    imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop"
  },
  {
    id: 109,
    name: "Taza mágica cambio color",
    description: "Taza que cambia de color con líquidos calientes revelando diseños ocultos.",
    price: 159.99,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
  },
  {
    id: 110,
    name: "Taza oficina ejecutiva negra",
    description: "Elegante taza negra mate perfecta para el ambiente profesional.",
    price: 179.99,
    imageUrl: "https://images.unsplash.com/photo-1545163611-0a6efb244e5c?w=400&h=400&fit=crop"
  },
  {
    id: 111,
    name: "Taza amor San Valentín",
    description: "Diseño romántico perfecto para regalar en ocasiones especiales.",
    price: 169.99,
    imageUrl: "https://images.unsplash.com/photo-1518832159436-d0d4dc733bce?w=400&h=400&fit=crop"
  },
  {
    id: 112,
    name: "Taza geométrica moderna azul",
    description: "Patrones geométricos contemporáneos en tonos azules elegantes.",
    price: 209.99,
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop"
  },
  {
    id: 113,
    name: "Taza navideña temporal",
    description: "Diseño festivo con motivos navideños tradicionales y modernos.",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=400&fit=crop"
  },
  {
    id: 114,
    name: "Taza grande XXL 500ml",
    description: "Taza de gran capacidad ideal para amantes del café y té intenso.",
    price: 229.99,
    imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop"
  },
  {
    id: 115,
    name: "Taza cristal borosilicato",
    description: "Taza transparente de cristal resistente al calor con asa ergonómica.",
    price: 259.99,
    imageUrl: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400&h=400&fit=crop"
  },
  {
    id: 116,
    name: "Taza bambú ecológica",
    description: "Fabricada con fibra de bambú natural, 100% biodegradable y sostenible.",
    price: 189.99,
    imageUrl: "https://images.unsplash.com/photo-1565083267138-1ff89e20f13b?w=400&h=400&fit=crop"
  }
];

let mockSupplies = [
  {
    id: 501,
    name: "Taza blanca base",
    unit: "pza",
    quantity: 120,
    minimumQuantity: 20,
    createdAt: "2025-10-13T18:00:00Z",
    updatedAt: "2025-10-13T18:00:00Z"
  },
  {
    id: 502,
    name: "Pintura acrílica roja",
    unit: "ml",
    quantity: 500,
    minimumQuantity: 100,
    createdAt: "2025-10-13T18:05:00Z",
    updatedAt: "2025-10-13T18:05:00Z"
  },
  {
    id: 503,
    name: "Pintura acrílica azul",
    unit: "ml",
    quantity: 750,
    minimumQuantity: 100,
    createdAt: "2025-10-13T18:06:00Z",
    updatedAt: "2025-10-13T18:06:00Z"
  },
  {
    id: 504,
    name: "Caja de cartón premium",
    unit: "pza",
    quantity: 200,
    minimumQuantity: 50,
    createdAt: "2025-10-13T18:07:00Z",
    updatedAt: "2025-10-13T18:07:00Z"
  },
  {
    id: 505,
    name: "Etiquetas adhesivas personalizadas",
    unit: "pza",
    quantity: 1000,
    minimumQuantity: 200,
    createdAt: "2025-10-13T18:08:00Z",
    updatedAt: "2025-10-13T18:08:00Z"
  },
  {
    id: 506,
    name: "Pintura metálica violeta",
    unit: "ml",
    quantity: 1800,
    minimumQuantity: 500,
    createdAt: "2025-10-13T18:10:00Z",
    updatedAt: "2025-10-13T18:10:00Z"
  },
  {
    id: 507,
    name: "Pintura metálica dorada brillante",
    unit: "ml",
    quantity: 450,
    minimumQuantity: 100,
    createdAt: "2025-10-13T18:12:00Z",
    updatedAt: "2025-10-13T18:12:00Z"
  },
  {
    id: 508,
    name: "Caja de lujo premium",
    unit: "pza",
    quantity: 80,
    minimumQuantity: 25,
    createdAt: "2025-10-13T18:15:00Z",
    updatedAt: "2025-10-13T18:15:00Z"
  }
];

let mockUsers = [
  {
    id: "u123456",
    name: "Mike",
    lastName: "Castillo",
    email: "admin@cupersonal.com",
    password: "SuperPassword123!"
  },
  {
    id: "u789012",
    name: "Ana",
    lastName: "García", 
    email: "ana@example.com",
    password: "MyPassword456!"
  }
];

let nextProductId = 117;
let nextSupplyId = 509;
let nextUserId = Date.now();

// Utility functions
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const simulateNetworkDelay = async () => {
  await delay(Math.random() * 300 + 200); // 200-500ms delay
};

const generateToken = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
    sub: "u123456",
    name: "Mike Castillo", 
    iat: timestamp,
    exp: timestamp + (24 * 60 * 60 * 1000) // 24 hours
  }))}.${random}`;
};

const paginate = (array, page, size) => {
  const totalElements = array.length;
  const totalPages = Math.ceil(totalElements / size);
  const startIndex = page * size;
  const endIndex = startIndex + size;
  const content = array.slice(startIndex, endIndex);
  
  return {
    content,
    page,
    size,
    totalElements,
    totalPages
  };
};

const validateAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token de autorización requerido');
  }
  return token;
};

export const mockApiService = {
  // Auth endpoints
  register: async (userData) => {
    await simulateNetworkDelay();
    
    // Validate required fields
    const { name, lastName, email, password, confirmPassword } = userData;
    if (!name || !lastName || !email || !password || !confirmPassword) {
      throw new Error('Todos los campos son requeridos');
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('El formato del email no es válido');
    }
    
    // Validate password strength
    if (password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }
    
    if (password !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
    
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      throw new Error('Ya existe un usuario registrado con este email');
    }
    
    const newUser = {
      id: `u${nextUserId++}`,
      name,
      lastName,
      email,
      password,
      createdAt: new Date().toISOString()
    };
    mockUsers.push(newUser);
    
    return {
      message: "Register successful"
    };
  },

  login: async (email, password) => {
    await simulateNetworkDelay();
    
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    
    const token = generateToken();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email
    }));
    
    return {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email
      }
    };
  },

  // Products endpoints (public)
  getProducts: async (page = 0, size = 10) => {
    await simulateNetworkDelay();
    
    // Simulate filtering and sorting
    const sortedProducts = [...mockProducts].sort((a, b) => a.name.localeCompare(b.name));
    return paginate(sortedProducts, page, size);
  },

  getProductById: async (id) => {
    await simulateNetworkDelay();
    
    const productId = parseInt(id);
    if (isNaN(productId)) {
      throw new Error('ID de producto inválido');
    }
    
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    return product;
  },

  // Products endpoints (admin)
  getAdminProductById: async (id) => {
    await simulateNetworkDelay();
    validateAuth();
    
    const productId = parseInt(id);
    if (isNaN(productId)) {
      throw new Error('ID de producto inválido');
    }
    
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    // Return admin version with additional fields
    return {
      ...product,
      materials: [
        { supplyId: 501, quantityPerUnit: 1 },
        { supplyId: 502, quantityPerUnit: 15 },
        { supplyId: 503, quantityPerUnit: 15 },
        { supplyId: 504, quantityPerUnit: 1 }
      ],
      createdAt: "2025-10-13T18:00:00Z",
      updatedAt: "2025-10-13T19:00:00Z"
    };
  },

  createProduct: async (productData) => {
    await simulateNetworkDelay();
    validateAuth();
    
    const { name, description, price, imageUrl, materials } = productData;
    
    // Validate required fields
    if (!name || !description || !price) {
      throw new Error('Nombre, descripción y precio son requeridos');
    }
    
    if (price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    
    // Validate materials if provided
    if (materials && Array.isArray(materials)) {
      for (const material of materials) {
        const supply = mockSupplies.find(s => s.id === material.supplyId);
        if (!supply) {
          throw new Error(`Insumo con ID ${material.supplyId} no encontrado`);
        }
        if (material.quantityPerUnit <= 0) {
          throw new Error('La cantidad por unidad debe ser mayor a 0');
        }
      }
    }
    
    const newProduct = {
      id: nextProductId++,
      name,
      description,
      price: parseFloat(price),
      imageUrl: imageUrl || `https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop`,
      materials: materials || [],
      createdAt: new Date().toISOString()
    };
    
    mockProducts.push(newProduct);
    return newProduct;
  },

  updateProduct: async (id, productData) => {
    await simulateNetworkDelay();
    validateAuth();
    
    const productId = parseInt(id);
    if (isNaN(productId)) {
      throw new Error('ID de producto inválido');
    }
    
    const productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }
    
    const { name, description, price, imageUrl, materials } = productData;
    
    // Validate fields if provided
    if (price && price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    
    // Validate materials if provided
    if (materials && Array.isArray(materials)) {
      for (const material of materials) {
        const supply = mockSupplies.find(s => s.id === material.supplyId);
        if (!supply) {
          throw new Error(`Insumo con ID ${material.supplyId} no encontrado`);
        }
        if (material.quantityPerUnit <= 0) {
          throw new Error('La cantidad por unidad debe ser mayor a 0');
        }
      }
    }
    
    const updatedProduct = {
      ...mockProducts[productIndex],
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(imageUrl && { imageUrl }),
      ...(materials && { materials }),
      updatedAt: new Date().toISOString()
    };
    
    mockProducts[productIndex] = updatedProduct;
    return updatedProduct;
  },

  deleteProduct: async (id) => {
    await simulateNetworkDelay();
    validateAuth();
    
    const productId = parseInt(id);
    if (isNaN(productId)) {
      throw new Error('ID de producto inválido');
    }
    
    const productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }
    
    mockProducts.splice(productIndex, 1);
    return null;
  },

  // Supplies endpoints
  getSupplies: async (page = 0, size = 10) => {
    await simulateNetworkDelay();
    validateAuth();
    
    const sortedSupplies = [...mockSupplies].sort((a, b) => a.name.localeCompare(b.name));
    return paginate(sortedSupplies, page, size);
  },

  getSupplyById: async (id) => {
    await simulateNetworkDelay();
    validateAuth();
    
    const supplyId = parseInt(id);
    if (isNaN(supplyId)) {
      throw new Error('ID de insumo inválido');
    }
    
    const supply = mockSupplies.find(s => s.id === supplyId);
    if (!supply) {
      throw new Error('Insumo no encontrado');
    }
    return supply;
  },

  createSupply: async (supplyData) => {
    await simulateNetworkDelay();
    validateAuth();
    
    const { name, unit, quantity, minimumQuantity } = supplyData;
    
    // Validate required fields
    if (!name || !unit || quantity === undefined || minimumQuantity === undefined) {
      throw new Error('Todos los campos son requeridos');
    }
    
    if (quantity < 0 || minimumQuantity < 0) {
      throw new Error('Las cantidades no pueden ser negativas');
    }
    
    if (minimumQuantity > quantity) {
      throw new Error('La cantidad mínima no puede ser mayor a la cantidad actual');
    }
    
    // Check if supply name already exists
    const existingSupply = mockSupplies.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (existingSupply) {
      throw new Error('Ya existe un insumo con este nombre');
    }
    
    const newSupply = {
      id: nextSupplyId++,
      name,
      unit,
      quantity: parseInt(quantity),
      minimumQuantity: parseInt(minimumQuantity),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockSupplies.push(newSupply);
    return newSupply;
  },

  updateSupply: async (id, supplyData) => {
    await simulateNetworkDelay();
    validateAuth();
    
    const supplyId = parseInt(id);
    if (isNaN(supplyId)) {
      throw new Error('ID de insumo inválido');
    }
    
    const supplyIndex = mockSupplies.findIndex(s => s.id === supplyId);
    if (supplyIndex === -1) {
      throw new Error('Insumo no encontrado');
    }
    
    const { name, unit, quantity, minimumQuantity } = supplyData;
    
    // Validate fields if provided
    if (quantity !== undefined && quantity < 0) {
      throw new Error('La cantidad no puede ser negativa');
    }
    
    if (minimumQuantity !== undefined && minimumQuantity < 0) {
      throw new Error('La cantidad mínima no puede ser negativa');
    }
    
    const currentSupply = mockSupplies[supplyIndex];
    const updatedQuantity = quantity !== undefined ? parseInt(quantity) : currentSupply.quantity;
    const updatedMinQuantity = minimumQuantity !== undefined ? parseInt(minimumQuantity) : currentSupply.minimumQuantity;
    
    if (updatedMinQuantity > updatedQuantity) {
      throw new Error('La cantidad mínima no puede ser mayor a la cantidad actual');
    }
    
    // Check name uniqueness if name is being updated
    if (name && name !== currentSupply.name) {
      const existingSupply = mockSupplies.find(s => s.name.toLowerCase() === name.toLowerCase() && s.id !== supplyId);
      if (existingSupply) {
        throw new Error('Ya existe un insumo con este nombre');
      }
    }
    
    const updatedSupply = {
      ...currentSupply,
      ...(name && { name }),
      ...(unit && { unit }),
      ...(quantity !== undefined && { quantity: parseInt(quantity) }),
      ...(minimumQuantity !== undefined && { minimumQuantity: parseInt(minimumQuantity) }),
      updatedAt: new Date().toISOString()
    };
    
    mockSupplies[supplyIndex] = updatedSupply;
    return updatedSupply;
  },

  deleteSupply: async (id) => {
    await simulateNetworkDelay();
    validateAuth();
    
    const supplyId = parseInt(id);
    if (isNaN(supplyId)) {
      throw new Error('ID de insumo inválido');
    }
    
    const supplyIndex = mockSupplies.findIndex(s => s.id === supplyId);
    if (supplyIndex === -1) {
      throw new Error('Insumo no encontrado');
    }
    
    // Check if supply is used in any product (mock validation)
    const isUsedInProduct = mockProducts.some(product => 
      product.materials && product.materials.some(material => material.supplyId === supplyId)
    );
    
    if (isUsedInProduct) {
      throw new Error('No se puede eliminar el insumo porque está asociado a uno o más productos');
    }
    
    mockSupplies.splice(supplyIndex, 1);
    return null;
  }
};
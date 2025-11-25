// src/mockData.js

// Simula la respuesta de /auth-api/login
export const mockLoginResponse = {
  message: "Login successful",
  token: "fake-jwt-token-for-development-12345",
  user: {
    id: "u123456",
    name: "Admin",
    lastName: "User",
    email: "admin@example.com"
  }
};

// Simula la respuesta de /app-api/products
export const mockProductsResponse = {
  content: [
    {
      id: 101,
      name: "Taza de Gato Místico",
      description: "Una taza que cambia de color con el calor y revela un diseño de gato.",
      price: 249.99,
      imageUrl: "https://via.placeholder.com/300x200.png?text=Gato+Místico"
    },
    {
      id: 102,
      name: "Taza de Programador",
      description: "Con el clásico 'Hello World' en binario. Ideal para largas noches de código.",
      price: 199.50,
      imageUrl: "https://via.placeholder.com/300x200.png?text=Hello+World"
    },
    {
      id: 103,
      name: "Taza Minimalista Blanca",
      description: "Elegancia y simplicidad en una taza de cerámica pura.",
      price: 150.00,
      imageUrl: "https://via.placeholder.com/300x200.png?text=Taza+Blanca"
    }
  ],
  page: 0,
  size: 10,
  totalElements: 3,
  totalPages: 1
};

// Simula la respuesta de /app-api/products/admin/{id}
export const mockAdminProductDetail = {
  id: 102,
  name: "Taza de Programador",
  description: "Con el clásico 'Hello World' en binario. Ideal para largas noches de código.",
  price: 199.50,
  imageUrl: "https://via.placeholder.com/300x200.png?text=Hello+World",
  materials: [
    { supplyId: 501, quantityPerUnit: 1 },
    { supplyId: 505, quantityPerUnit: 20 }
  ]
};

// Simula la respuesta de /app-api/supplies/
export const mockSuppliesResponse = {
  content: [
    {
      id: 501,
      name: "Taza blanca base",
      unit: "pza",
      quantity: 120,
      minimumQuantity: 20
    },
    {
      id: 505,
      name: "Pintura negra para cerámica",
      unit: "ml",
      quantity: 1500,
      minimumQuantity: 300
    },
    {
      id: 504,
      name: "Caja de cartón",
      unit: "pza",
      quantity: 200,
      minimumQuantity: 50
    }
  ],
  page: 0,
  size: 10,
  totalElements: 3,
  totalPages: 1
};

export const mockOrderResponse = {
  message: "Order created successfully",
  purchaseCode: "MOCK-ORDER-123XYZ",
  orderId: "o-mock-456"
};
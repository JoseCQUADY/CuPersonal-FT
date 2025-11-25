// src/pages/admin/AdminLayout.jsx
import React from 'react';
import { Outlet, NavLink as RouterLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

const AdminLayout = () => {
  const { user } = useAuth();
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Productos', icon: <CategoryIcon />, path: '/admin/products' },
    { text: 'Insumos', icon: <InventoryIcon />, path: '/admin/supplies' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar>
            <Typography variant="h6" noWrap>Panel de Admin</Typography>
        </Toolbar>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={RouterLink} to={item.path} end={item.path === '/admin'}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Espacio para que el contenido no quede debajo del AppBar principal */}
        <Typography variant="h5" sx={{mb: 2}}>Bienvenido, {user?.name || 'Admin'}</Typography>
        <Outlet /> {/* Aquí se renderizarán las páginas anidadas */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
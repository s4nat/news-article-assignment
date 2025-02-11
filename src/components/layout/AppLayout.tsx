// src/components/layout/AppLayout.tsx
import { 
    Box, 
    Drawer, 
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Typography, 
    IconButton, 
    useTheme, 
    AppBar, 
    Toolbar,
    Tooltip
  } from '@mui/material';
  import { CreateOutlined, ArticleOutlined, DarkMode, LightMode } from '@mui/icons-material';
  import { useNavigate, useLocation, Outlet } from 'react-router-dom';
  import { useColorMode } from '@/theme/ThemeProvider';
  
  const DRAWER_WIDTH = 240;
  
  export const AppLayout = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { toggleColorMode, mode } = useColorMode();
  
    const menuItems = [
      { text: 'Upload', icon: <CreateOutlined />, path: '/upload' },
      { text: 'Articles', icon: <ArticleOutlined />, path: '/articles' },
    ];
  
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              bgcolor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <Box 
            sx={{ 
              p: 2, 
              borderBottom: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              NewsNexus
            </Typography>
          </Box>
          <List sx={{ mt: 1, px: 1 }}>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: '3px',
                  mb: 0.5,
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 32,
                    color: location.pathname === item.path 
                      ? theme.palette.text.primary 
                      : theme.palette.text.secondary
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '0.875rem',
                      fontWeight: location.pathname === item.path ? 500 : 400,
                      color: location.pathname === item.path 
                        ? theme.palette.text.primary 
                        : theme.palette.text.secondary
                    }
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
  
        {/* Main content */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AppBar 
            position="static" 
            elevation={0}
            sx={{ 
              borderBottom: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Toolbar variant="dense">
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  flexGrow: 1, 
                  fontWeight: 500,
                  color: theme.palette.text.primary
                }}
              >
                NewsNexus
              </Typography>
              <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
                <IconButton 
                  onClick={toggleColorMode} 
                  size="small"
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.text.primary,
                    }
                  }}
                >
                  {mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Box 
            sx={{ 
              p: 3, 
              flexGrow: 1,
              bgcolor: theme.palette.background.default
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    );
  };
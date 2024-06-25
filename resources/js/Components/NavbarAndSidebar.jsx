import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, Collapse, Divider, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';

// sidebar icons
import GroupIcon from '@mui/icons-material/Group';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DescriptionIcon from '@mui/icons-material/Description';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

const drawerWidth = 255;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NavbarAndSidebar({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [openUsers, setOpenUsers] = React.useState(false);
  const [openConfig, setOpenConfig] = React.useState(false);
  const [openCommunity, setOpenCommunity] = React.useState(false);
  const [openSeo, setOpenSeo] = React.useState(false);
  const [openStatistics, setOpenStatistics] = React.useState(false);

  const handleClick = (relation) => {
    switch (relation) {
      case 'users':
        setOpenUsers(!openUsers)
      break;
      case 'config':
        setOpenConfig(!openConfig)
      break;
      case 'community':
        setOpenCommunity(!openCommunity)
      break;
      case 'seo':
        setOpenSeo(!openSeo)
      break;
      case 'statistics':
        setOpenStatistics(!openStatistics)
      break;
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerList = (
    // <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    <Box sx={{ width: 250 }} role="presentation">
      <List
          subheader={
            <ListSubheader component="div" id="modules-list">
              Principal
            </ListSubheader>
          }
      >
        
        {/* ultilizadores */}
        <ListItemButton onClick={() => handleClick('users')}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Ultilizadores" />
          {openUsers ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Admin" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Pro" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Público" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton><ListItemIcon><AnalyticsIcon /></ListItemIcon><ListItemText primary="Estatísticas" /></ListItemButton>

      </List>

        <Divider />

        {/* modulos */}
        <List
          subheader={
            <ListSubheader component="div" id="modules-list">
              Módulos
            </ListSubheader>
          }
        >

          {/* paginas */}
          <ListItemButton>
            <ListItemIcon>
              <DescriptionIcon />        
            </ListItemIcon>
            <ListItemText primary="Páginas" />
          </ListItemButton>

          {/* SEO */}
          <ListItemButton onClick={() => handleClick('seo')}>
            <ListItemIcon><ManageSearchIcon /></ListItemIcon>
            <ListItemText primary="Seo" />
            {openSeo ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSeo} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton> <ListItemText primary="Metadados" /> </ListItemButton>
              <ListItemButton> <ListItemText primary="Integração" /> </ListItemButton>
              <ListItemButton> <ListItemText primary="Sitemap" /> </ListItemButton>
            </List>
          </Collapse>

          {/* componentes */}
          <ListItemButton onClick={() => handleClick('config')}>
            <ListItemIcon>
              <DisplaySettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Componentes" />
            {openConfig ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openConfig} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}> <ListItemText primary="Rodapé" /> </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}> <ListItemText primary="Navegação" /> </ListItemButton>
            </List>
          </Collapse>

        </List>

    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* navbar */}
      <AppBar 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        elevation={1}
        position="fixed"
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <img src='./main-logo-inverse.svg' height={35} />
          </Typography>
          
          <Avatar>H</Avatar>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {DrawerList}
          </List>
        </Box>
      </Drawer>

      <Main open={open}>
          <DrawerHeader />
          {children}
      </Main>
    </Box>
  );
}

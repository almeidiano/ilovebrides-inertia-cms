import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { useState } from 'react';
import { Link } from '@inertiajs/react'

// icons
import { ExpandLess, ExpandMore, InsertChart, ManageSearch, Description, Public} from '@mui/icons-material';

export default function ListItems() {
  const [openUsers, setOpenUsers] = React.useState(false);
  const [openComponents, setOpenComponents] = React.useState(false);
  const [openCommunity, setOpenCommunity] = React.useState(false);
  const [openSeo, setOpenSeo] = React.useState(false);
  const [openStatistics, setOpenStatistics] = React.useState(false);

  const handleClick = (relation) => {
    switch (relation) {
      case 'users':
        setOpenUsers(!openUsers)
      break;
      case 'components':
        setOpenComponents(!openComponents)
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

  return (
    <React.Fragment>

    {/* dashboard */}
    <Link href='/' underline="none">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    {/* usuarios */}
    <ListItemButton onClick={() => handleClick('users')}>
      <ListItemIcon>
        <PeopleIcon />
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

    {/* estatísticas */}
    <ListItemButton>
      <ListItemIcon>
        <InsertChart />
      </ListItemIcon>
      <ListItemText primary="Estatísticas" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <Description />
      </ListItemIcon>
      <ListItemText primary="Páginas" />
    </ListItemButton>

    {/* seo */}
    <ListItemButton onClick={() => handleClick('seo')}>
      <ListItemIcon>
        <ManageSearch />
      </ListItemIcon>
      <ListItemText primary="SEO" />
      {openSeo ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openSeo} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}> <ListItemText primary="Metadados" /> </ListItemButton>
        <ListItemButton sx={{ pl: 4 }}> <ListItemText primary="Integração" /> </ListItemButton>
        <ListItemButton sx={{ pl: 4 }}> <ListItemText primary="Sitemap" /> </ListItemButton>
      </List>
    </Collapse>

    {/* componentes */}
    <ListItemButton onClick={() => handleClick('components')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Componentes" />
      {openComponents ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openComponents} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <Link href='/resources/js/Pages/components/footer/Footer' target='_blank'>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Rodapé" />
          </ListItemButton>
        </Link>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="Navegação" />
        </ListItemButton>
      </List>
    </Collapse>

    {/* comunidade */}
    <ListItemButton onClick={() => handleClick('community')}>
      <ListItemIcon>
        <Public />
      </ListItemIcon>
      <ListItemText primary="Comunidade" />
      {openCommunity ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openCommunity} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="Rodapé" />
        </ListItemButton>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="Navegação" />
        </ListItemButton>
      </List>
    </Collapse>

  </React.Fragment>
  )
}

// export const mainListItems = (
//   <React.Fragment>

//     {/* dashboard */}
//     <ListItemButton>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItemButton>

//     {/* usuarios */}
//     {/* <ListItemButton>
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Ultilizadores" />
//     </ListItemButton> */}
//     <ListItemButton>
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Ultilizadores" />
//       {openUsers ? <ExpandLess /> : <ExpandMore />}
//     </ListItemButton>
//     <Collapse in={openUsers} timeout="auto" unmountOnExit>
//       <List component="div" disablePadding>
//         <ListItemButton sx={{ pl: 4 }}>
//           <ListItemText primary="Admin" />
//         </ListItemButton>
//         <ListItemButton sx={{ pl: 4 }}>
//           <ListItemText primary="Pro" />
//         </ListItemButton>
//         <ListItemButton sx={{ pl: 4 }}>
//           <ListItemText primary="Público" />
//         </ListItemButton>
//       </List>
//     </Collapse>

//     <ListItemButton>
//       <ListItemIcon>
//         <BarChartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Reports" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Integrations" />
//     </ListItemButton>
//   </React.Fragment>
// );

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );

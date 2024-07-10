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
import {useState} from 'react';
import {Link} from '@inertiajs/react'

// icons
import {ExpandLess, ExpandMore, InsertChart, ManageSearch, Description, Public} from '@mui/icons-material';

export default function ListItems() {
    const [selectedIndex, setSelectedIndex] = useState("");

    const handleCollapse = index => {
        setSelectedIndex(selectedIndex === index ? "" : index);
    };

    const allItems = [
        {
            url: "/",
            icon: <DashboardIcon />,
            text: 'Dashboard',
        },
        {
            url: "#",
            icon: <PeopleIcon />,
            text: 'Utilizadores',
            children: [
                {
                    url: "users/admin",
                    text: "Admin"
                },
                {
                    url: "users/professionals",
                    text: "Profissionais"
                },
                {
                    url: "users/public",
                    text: "Público"
                },
            ]
        },
        {
            url: "statistics",
            icon: <InsertChart />,
            text: "Estatísticas"
        },
        {
            url: "pages",
            icon: <Description/>,
            text: "Páginas"
        },
        {
            url: "#",
            icon: <ManageSearch/>,
            text: "SEO",
            children: [
                {
                    url: "metadata",
                    text: "Metadados"
                },
                {
                    url: "integration",
                    text: "Integração"
                },
                {
                    url: "sitemap",
                    text: "Sitemap"
                },
            ]
        },
        {
            url: "#",
            icon: <LayersIcon/>,
            text: "Componentes",
            children: [
                {
                    url: "components/footer",
                    text: "Rodapé"
                },
                {
                    url: "components/navigation",
                    text: "Navegação"
                },
            ]
        }
    ];

    const Item = ({ url, icon, text, children }) => {
        const [selectedIndex, setSelectedIndex] = useState(-1);

        const handleCollapse = (index) => {
            setSelectedIndex(selectedIndex === index ? -1 : index);
        };

        return (
            children ? (
                <div>
                    <ListItemButton onClick={() => handleCollapse(children)}>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {selectedIndex === children ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={selectedIndex === children} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {children.map((item, index) => (
                                <ListItemButton key={index} component="a" href={`https://ilovebrides.almeidiano.dev/${item.url}`} sx={{ pl: 4 }}>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </div>
            ) : (
                <Link href={url} underline="none">
                    <ListItemButton>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </Link>
            )
        );
    };

    return (
        <React.Fragment>
            {allItems.map((item, index) => (
                <Item key={index} url={item.url} icon={item.icon} text={item.text} children={item.children} index={index} />
            ))}

        </React.Fragment>
    )
}

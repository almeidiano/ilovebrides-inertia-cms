import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import {Container} from '@mui/material';
import ListItems from '@/Components/ListItems'
import mainLogo from './images/main-logo.svg';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import inverseLogo from "@/Components/images/main-logo-inverse.svg";
import Version from '@/Components/Version';
import ListSubheader from '@mui/material/ListSubheader';

// icons
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const drawerWidth = 275;

export default function ComponentsDashboard({setNavigationData, data, children, type}) {
    const [open, setOpen] = React.useState(false);

    // const updateNavigationData = () => {
    //     setNavigationData((prevData) => ({
    //         ...prevData,
    //         navigation: {
    //             ...prevData.navigation,
    //             items: [
    //                 ...prevData.navigation.items,
    //                 {
    //                     id: 'new_id', // Adicione um id único aqui
    //                     url: '#',
    //                     text: 'Novo Item'
    //                 }
    //             ]
    //         }
    //     }));
    // };

    const updateNavigationData = () => {
        setNavigationData((prevData) => ({
            ...prevData,
            navigation: {
                ...prevData.navigation,
                items: [
                    ...prevData.navigation.items,
                    {
                        id: 'new_id', // Adicione um id único aqui
                        url: '#',
                        text: 'Novo Item'
                    }
                ]
            }
        }));
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (<Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <AppBar position="fixed" sx={{zIndex: 998}}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                >
                    <MenuIcon/>
                </IconButton>
                <Box sx={{flexGrow: 1}}>
                    <Link href='/'><img src={inverseLogo} height={150} width={150} /></Link>
                </Box>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                zIndex: 997
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                {/*<List>*/}
                {/*    /!*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*!/*/}
                {/*        <ListItem key={text} disablePadding>*/}
                {/*            <ListItemButton>*/}
                {/*                <ListItemIcon>*/}
                {/*                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
                {/*                </ListItemIcon>*/}
                {/*                <ListItemText primary={text}/>*/}
                {/*            </ListItemButton>*/}
                {/*        </ListItem>))}*/}
                {/*    {*/}
                {/*        type === 'footer' &&*/}
                {/*        // <ListSubheader component="div" id="nested-list-subheader">*/}
                {/*        //     Navegação Geral*/}
                {/*        // </ListSubheader>*/}

                {/*        // data.legal.forEach(legalItem => {*/}
                {/*        //     <div>{legalItem}<div/>*/}
                {/*        // })*/}

                {/*        */}
                {/*    }*/}
                {/*</List>*/}

                <List>
                    {
                        type === 'navigation' &&
                        <ListSubheader component="div" id="nested-list-subheader">
                            Navegação Geral
                        </ListSubheader>
                    }

                    <div className='flex justify-center'>
                        <IconButton onClick={updateNavigationData} aria-label="add">
                            <AddIcon />
                        </IconButton>
                    </div>

                    {
                        data.navigation.items.map(item => (
                            <ListItem
                                key={item.text}
                                disablePadding
                                secondaryAction={
                                    <>
                                        <IconButton edge="end" aria-label="add">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="add">
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemButton>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Box>
        </Drawer>

        <Drawer
            anchor='right'
            open={open}
            onClose={toggleDrawer}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: [1],
                    overflowY: 'auto',
                    width: '240px'
                }}
            >
                {/* <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', position: 'absolute' }}>
              <img src={mainLogo} height={35} />
            </Typography> */}
                <Link href='/'><img src={mainLogo} height={150} width={150} /></Link>

            </Toolbar>
            <Divider/>
            <List>
                <ListItems/>
            </List>
        </Drawer>

        {/* main */}
        <Box
            component="main"
            sx={{
                // backgroundColor: (theme) =>
                //   theme.palette.mode === 'light'
                //     ? theme.palette.grey[100]
                //     : theme.palette.grey[900],
                flexGrow: 1, height: '100vh', overflow: 'auto',
            }}
        >
            <Toolbar/>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>

                {children}
                <Version />

                {/* put the version here */}
                {/* <Copyright sx={{ pt: 4 }} /> */}
            </Container>
        </Box>
    </Box>);
}

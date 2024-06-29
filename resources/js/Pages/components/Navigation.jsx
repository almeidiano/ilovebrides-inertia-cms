import React, { useState, useRef, useEffect, useCallback } from 'react';
import ComponentsDashboard from '@/Components/ComponentsDashboard.jsx';
import PageInfo from "@/Components/PageInfo.jsx";
import {CircularProgress, Button} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItems from "@/Components/ListItems.jsx";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add.js";

const NavigationChild = ({ navigationData, setNavigationData }) => {
    const iframeRef = useRef(null);
    const [loading, setLoading] = useState(true);

    const [bottomDrawerOpen, setBottomDrawerOpen] = React.useState(false);

    const toggleBottomDrawer = () => {
        setBottomDrawerOpen(!bottomDrawerOpen);
    };

    // Enviar dados de navegação para o iframe quando a navegação mudar
    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: navigationData }, '*');
        }
    }, [navigationData]);

    // // Lidar com mensagens do iframe
    // useEffect(() => {
    //     const receiveMessage = (event) => {
    //         if (event.data.type === 'NAVIGATION_UPDATED') {
    //             setNavigationData(event.data.payload);
    //         }
    //     };
    //
    //     window.addEventListener('message', receiveMessage);
    //
    //     return () => {
    //         window.removeEventListener('message', receiveMessage);
    //     };
    // }, [setNavigationData]);

    const handleLoad = useCallback(() => {
        setLoading(false);
        iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: navigationData }, '*');
    }, [navigationData]);

    return (
        <div style={{position: 'relative', width: '100%', height: '400px'}}>
            <PageInfo title='Navegação (header)' description='Gerencie o menu de navegação que aparecerá em todas as páginas e módulos.' />

            {loading && (
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <CircularProgress/>
                </div>
            )}

            <iframe
                ref={iframeRef}
                onLoad={handleLoad}
                src="http://localhost:8000/iframes/navigation"
                title="iframe"
                style={{
                    width: '100%',
                    height: '100%',
                    border: '1px solid #CCC',
                    display: loading ? 'none' : 'block',
                }}
            />
        </div>
    );
};

export default function Navigation({data}) {
    const [navigationData, setNavigationData] = useState(data);
    const iframeRef = useRef(null);
    const [loading, setLoading] = useState(true);

    const [bottomDrawerOpen, setBottomDrawerOpen] = React.useState(false);

    const toggleBottomDrawer = () => {
        setBottomDrawerOpen(!bottomDrawerOpen);
    };

    // Enviar dados de navegação para o iframe quando a navegação mudar
    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: navigationData }, '*');
        }
    }, [navigationData]);

    // // Lidar com mensagens do iframe
    // useEffect(() => {
    //     const receiveMessage = (event) => {
    //         if (event.data.type === 'NAVIGATION_UPDATED') {
    //             setNavigationData(event.data.payload);
    //         }
    //     };
    //
    //     window.addEventListener('message', receiveMessage);
    //
    //     return () => {
    //         window.removeEventListener('message', receiveMessage);
    //     };
    // }, [setNavigationData]);

    const handleLoad = useCallback(() => {
        setLoading(false);
        iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: navigationData }, '*');
    }, [navigationData]);

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

    return (
        <div>
            <PageInfo title='Navegação (header)' description='Gerencie o menu de navegação que aparecerá em todas as páginas e módulos.'/>

            <div className='my-2'>
                <Button onClick={toggleBottomDrawer} variant='outlined'>Abrir Menu</Button>
            </div>

            <div style={{position: 'relative', width: '100%', height: '400px'}}>

                {loading && (
                    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                        <CircularProgress/>
                    </div>
                )}

                <iframe
                    ref={iframeRef}
                    onLoad={handleLoad}
                    src="http://localhost:8000/iframes/navigation"
                    title="iframe"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: '1px solid #CCC',
                        display: loading ? 'none' : 'block',
                    }}
                />
            </div>

            <Drawer
                anchor="bottom"
                open={bottomDrawerOpen}
                onClose={toggleBottomDrawer}
            >
                <Box
                    sx={{
                        width: 'auto',
                        height: 350,
                        padding: 2,
                        zIndex: 999
                    }}
                    role="presentation"
                    // onClick={toggleBottomDrawer}
                    // onKeyDown={toggleBottomDrawer}
                >
                    <Typography variant="h6" component="div">
                        Items da navegação
                    </Typography>
                    <Divider/>
                    <List>
                        <div className='flex justify-center'>
                            <IconButton onClick={updateNavigationData} aria-label="add">
                                <AddIcon/>
                            </IconButton>
                        </div>
                        {
                            navigationData.navigation.items.map(item => (
                                <ListItem
                                    key={item.text}
                                    disablePadding
                                    secondaryAction={
                                        <>
                                            <IconButton edge="end" aria-label="add">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton edge="end" aria-label="add">
                                                <DeleteIcon/>
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
        </div>

        // <ComponentsDashboard setNavigationData={setNavigationData} data={navigationData} children={<NavigationChild navigationData={navigationData} setNavigationData={setNavigationData} />} type='navigation' />
    );
}

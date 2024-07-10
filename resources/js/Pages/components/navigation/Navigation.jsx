import React, { useState, useRef, useEffect, useCallback } from 'react';
import PageInfo from "@/Components/PageInfo.jsx";
import {CircularProgress, Button, Snackbar, RadioGroup, Radio} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import uniqid from 'uniqid';
import NavigationItem from './NavigationItem.jsx';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import ListItemButton from "@mui/material/ListItemButton";
import Alert from "@mui/material/Alert";
import { useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import Backdrop from '@mui/material/Backdrop';
import toast, { Toaster } from 'react-hot-toast';
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Navigation({ dataState }) {
    const [navigationData, setNavigationData] = useState(dataState);
    const iframeRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingNavigation, setLoadingNavigation] = useState(false);
    const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState("");

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: navigationData }, '*');
        }
    }, [navigationData]);

    const handleLoad = useCallback(() => {
        setLoading(false);
        iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: navigationData }, '*');
    }, [navigationData]);

    const toggleBottomDrawer = () => {
        setBottomDrawerOpen(!bottomDrawerOpen);
    };

    const updateNavigationData = () => {
        setNavigationData((prevData) => ({
            ...prevData,
            navigation: {
                ...prevData.navigation,
                items: [
                    {
                        id: uniqid(),
                        url: '#',
                        text: 'Novo Item',
                        children: []
                    },
                    ...prevData.navigation.items,
                ]
            }
        }));
    };

    const createNavigationDataChildren = (parentId) => {
        setNavigationData((prevData) => {
            const newItem = prevData.navigation.items.map((item) => {
                if (item.id === parentId) {
                    return {
                        ...item,
                        children: [
                            {
                                id: uniqid(),
                                url: '#',
                                text: 'Novo Item'
                            },
                            ...item.children
                        ],
                    };
                }
                return item;
            });
            return {
                ...prevData,
                navigation: {
                    ...prevData.navigation,
                    items: newItem,
                },
            };
        });
    };

    const handleCollapse = index => {
        setSelectedIndex(selectedIndex === index ? "" : index);
    };

    const deleteNavigationItem = (id) => {
        let filteredNavigationItems = navigationData.navigation.items.filter((item) => item.id !== id);

        setNavigationData((prevData) => ({
            ...prevData,
            navigation: {
                ...prevData.navigation,
                items: filteredNavigationItems
            }
        }));
    };

    const deleteNavigationChild = (parentId, childId) => {
        setNavigationData((prevData) => {
            const newItems = prevData.navigation.items.map((item) => {
                if (item.id === parentId && item.children) {
                    return {
                        ...item,
                        children: item.children.filter((child) => child.id !== childId),
                    };
                }
                return item;
            });
            return {
                ...prevData,
                navigation: {
                    ...prevData.navigation,
                    items: newItems,
                },
            };
        });
    };

    const updateItem = (id, text, url) => {
        setNavigationData((prevData) => {
            const updatedItems = prevData.navigation.items.map((item) => {
                if (item.id === id) {
                    return { ...item, text, url };
                }
                return item;
            });
            return {
                ...prevData,
                navigation: {
                    ...prevData.navigation,
                    items: updatedItems,
                },
            };
        });
    };

    const updateChildItem = (parentId, childId, text, url) => {
        setNavigationData((prevData) => {
            const updatedItems = prevData.navigation.items.map((item) => {
                if (item.id === parentId) {
                    const updatedChildren = item.children.map((child) => {
                        if (child.id === childId) {
                            return { ...child, text, url };
                        }
                        return child;
                    });
                    return { ...item, children: updatedChildren };
                }
                return item;
            });
            return {
                ...prevData,
                navigation: {
                    ...prevData.navigation,
                    items: updatedItems,
                },
            };
        });
    };

    function reoder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const items = reoder(navigationData.navigation.items, result.source.index, result.destination.index);

        setNavigationData((prevData) => ({
            ...prevData,
            navigation: {
                ...prevData.navigation,
                items: items
            }
        }));
    }

    const { post, processing, errors, reset } = useForm(null);

    function handleSubmit() {
        setLoadingNavigation(true)

        router.put('navigation', navigationData, {
            onSuccess: (page) => {
                toast.success('Navegação atualizada com sucesso')
                setLoadingNavigation(false)
            },
            onError: (errors) => {
                console.log(errors)
                toast.error('Ocorreu um erro ao atualizar a navegação')
                setLoadingNavigation(false)
            }
        })
    }

    function handleFileUpload(file) {
        setLoadingImage(true)

        const formData = new FormData();
        formData.append('file', file);

        router.post('/components/navigation', formData, {
            onSuccess: (page) => {
                // Acessa os dados retornados do Laravel
                const response = page.props;

                setNavigationData({
                    ...navigationData,
                    logo: response.message
                })

                toast.success('Logo atualizada com sucesso')
                setLoadingImage(false)
            },
            onError: (errors) => {
                console.log(errors)
                toast.error('Ocorreu um erro ao atualizar a logo')
                setLoadingImage(false)
            }
        });
    }

    return (
        <div>
            <Toaster position="bottom-left" reverseOrder={false} />

            {
                loadingImage || loadingNavigation &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }

            <PageInfo title='Navegação (header)' description='Gerencie o menu de navegação que aparecerá em todas as páginas e módulos.' />

            <div className='my-2'>
                <Button onClick={toggleBottomDrawer} variant='outlined'>Abrir Menu</Button>
            </div>

            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                {loading && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <CircularProgress />
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

            <div className='flex justify-end py-2'><Button onClick={handleSubmit} variant="contained">Salvar Atualizações</Button></div>

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
                >
                    <Typography variant="h6" component="div">Posição do menu</Typography>
                    <RadioGroup
                        defaultValue={navigationData.navigation.position}
                        row
                    >
                        <FormControlLabel onChange={() =>     setNavigationData((prevData) => ({
                            ...prevData,
                            navigation: {
                                ...prevData.navigation,
                                position: 'left'
                            }
                        }))} value="left" control={<Radio />} label="Esquerdo" />
                        <FormControlLabel onChange={() =>     setNavigationData((prevData) => ({
                            ...prevData,
                            navigation: {
                                ...prevData.navigation,
                                position: 'right'
                            }
                        }))} value="right" control={<Radio />} label="Direito" />
                    </RadioGroup>

                    <Typography variant="h6" component="div">Logo</Typography>

                    <List>
                        <ListItem
                            secondaryAction={
                                <>
                                    <IconButton component="label" edge="end" aria-label="upload">
                                        <input type="file" hidden onChange={event => handleFileUpload(event.target.files[0])} />
                                        <EditIcon />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemButton>
                                <img src={navigationData.logo} height='150' width='150' />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    {/*<Divider />*/}

                    <Typography variant="h6" component="div">
                        Items da navegação
                    </Typography>

                    <List>
                        <div className='flex justify-center'>
                            <IconButton onClick={updateNavigationData} aria-label="add">
                                <AddIcon />
                            </IconButton>
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="items" type='list' direction='vertical'>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {navigationData.navigation.items.map((item, index) => (
                                            <NavigationItem
                                                key={item.id}
                                                item={item}
                                                index={index}
                                                handleCollapse={handleCollapse}
                                                selectedIndex={selectedIndex}
                                                deleteNavigationItem={deleteNavigationItem}
                                                deleteNavigationChild={deleteNavigationChild}
                                                createNavigationDataChildren={createNavigationDataChildren}
                                                updateItem={updateItem}
                                                updateChildItem={updateChildItem}
                                                navigationData={navigationData}
                                                setNavigationData={setNavigationData}
                                            />
                                        ))}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

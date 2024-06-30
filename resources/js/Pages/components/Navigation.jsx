import React, { useState, useRef, useEffect, useCallback } from 'react';
import PageInfo from "@/Components/PageInfo.jsx";
import { CircularProgress, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// icons
import AddIcon from "@mui/icons-material/Add";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import uniqid from 'uniqid';
import Collapse from "@mui/material/Collapse";

export default function Navigation({ data }) {
    const [navigationData, setNavigationData] = useState(data);
    const iframeRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [bottomDrawerOpen, setBottomDrawerOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState("");

    const toggleBottomDrawer = () => {
        setBottomDrawerOpen(!bottomDrawerOpen);
    };

    // Enviar dados de navegação para o iframe quando a navegação mudar
    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: navigationData }, '*');
        }
    }, [navigationData]);

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
                    {
                        id: uniqid(),
                        url: '#',
                        text: 'Novo Item'
                    },
                    ...prevData.navigation.items,
                ]
            }
        }));
    };

    const handleCollapse = index => {
        if (selectedIndex === index) {
            setSelectedIndex("")
        } else {
            setSelectedIndex(index)
        }
    };

    const deleteNavigationItem = (id) => {
        let navigationDataUpdated = [...navigationData.navigation.items];
        let filteredNavigationItems = navigationDataUpdated.filter((item) => item.id !== id);

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

    const NavigationItem = ({ item, index }) => {
        return (
            <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided, snapshot) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ backgroundColor: snapshot.isDragging ? '#CCC' : '' }}
                    >
                        <ListItem
                            onClick={() => handleCollapse(index)}
                            key={item.text}
                            disablePadding
                            secondaryAction={
                                <>
                                    {item.children && (
                                        <IconButton edge="end" aria-label="expand">
                                            {selectedIndex === index ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                    )}
                                    <IconButton edge="end" aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteNavigationItem(item.id)} edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemButton>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>

                        {item.children && (
                            <Collapse in={selectedIndex === index} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <div className='flex justify-center'>
                                        <IconButton aria-label="add">
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                    {item.children.map((childItem, childIndex) => (
                                        <ListItem
                                            key={childItem.id}
                                            disablePadding
                                            sx={{ pl: 4, pr: 2 }}
                                            secondaryAction={
                                                <div className='mx-4'>
                                                    <IconButton edge="end" aria-label="edit">
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteNavigationChild(item.id, childItem.id)} edge="end" aria-label="delete">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            }
                                        >
                                            <ListItemButton>
                                                <ListItemText primary={childItem.text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </Box>
                )}
            </Draggable>
        );
    };

    return (
        <div>
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
                    <Typography variant="h6" component="div">
                        Items da navegação
                    </Typography>
                    <Divider />
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
                                            <NavigationItem key={item.id} item={item} index={index} />
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

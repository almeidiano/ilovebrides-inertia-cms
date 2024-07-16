import React, { useState, useRef, useEffect, useCallback } from 'react';
import PageInfo from "@/Components/PageInfo.jsx";
import { CircularProgress, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import uniqid from 'uniqid';
import NavigationItem from "@/Pages/components/footer/NavigationItem.jsx";
import ListItem from "@mui/material/ListItem";
import EditIcon from "@mui/icons-material/Edit.js";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import WeddingDistrictiesItem from "./WeddingDistrictiesItem.jsx";
import {router} from "@inertiajs/react";
import toast, {Toaster} from "react-hot-toast";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/Done.js";

export default function Footer({ dataState, appUrl }) {
    const [footerData, setFooterData] = useState(dataState);
    const iframeRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState("");
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingFooter, setLoadingFooter] = useState(false);

    // edição de items secundários
    const [editRights, setEditRights] = useState(false)

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: footerData }, '*');
        }
    }, [footerData]);

    const handleLoad = useCallback(() => {
        setLoading(false);
        iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: footerData }, '*');
    }, [footerData]);

    const toggleBottomDrawer = () => {
        setBottomDrawerOpen(!bottomDrawerOpen);
    };

    const updateFooterData = () => {
        setFooterData((prevData) => ({
            ...prevData,
            navigation: [
                {
                    id: uniqid(),
                    text: 'Novo Item',
                    children: []
                },
                ...prevData.navigation
            ]
        }));
    };

    const createNavigationDataChildren = (parentId) => {
        setFooterData((prevData) => {
            const newItem = prevData.navigation.map((item) => {
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
                navigation: newItem
            };
        });
    };

    const createWeddingDataChildren = () => {
        setFooterData((prevData) => {
            return {
                ...prevData,
                weddingDistricties: {
                    ...prevData.weddingDistricties,
                    children: [
                        {
                            id: uniqid(),
                            url: "#",
                            text: "Novo Item"
                        },
                        ...prevData.weddingDistricties.children
                    ]
                }
            };
        });
    };

    const handleCollapse = index => {
        setSelectedIndex(selectedIndex === index ? "" : index);
    };

    const deleteNavigationItem = (id) => {
        let filteredNavigationItems = footerData.navigation.filter((item) => item.id !== id);

        setFooterData((prevData) => ({
            ...prevData,
            navigation: filteredNavigationItems
        }));
    };

    const deleteNavigationChild = (parentId, childId) => {
        setFooterData((prevData) => {
            const newItems = prevData.navigation.map((item) => {
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
                navigation: newItems
            };
        });
    };

    const deleteWeddingChild = (childId) => {
        setFooterData((prevData) => {
            const updatedChildren = prevData.weddingDistricties.children.filter(child => child.id !== childId);

            return {
                ...prevData,
                weddingDistricties: {
                    ...prevData.weddingDistricties,
                    children: updatedChildren
                }
            };
        });
    };

    const updateItem = (id, text, url) => {
        setFooterData((prevData) => {
            const updatedItems = prevData.navigation.map((item) => {
                if (item.id === id) {
                    return { ...item, text, url };
                }
                return item;
            });
            return {
                ...prevData,
                navigation: updatedItems
            };
        });
    };

    const updateWeddingDistrictiesText = (text) => {
        setFooterData((prevData) => {
            return {
                ...prevData,
                weddingDistricties: {
                    ...prevData.weddingDistricties,
                    text: text
                }
            };
        });
    }

    const updateChildItem = (parentId, childId, text, url) => {
        setFooterData((prevData) => {
            const updatedItems = prevData.navigation.map((item) => {
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
                navigation: updatedItems,
            };
        });
    };

    const updateWeddingChildItem = (childId, text, url) => {
        setFooterData((prevData) => {
            // Map over weddingDistricties array to find and update the correct child item
            const updatedChildren = prevData.weddingDistricties.children.map((item) => {
                if (item.id === childId) {
                    // If the item's id matches childId, update it with new text and url
                    return { ...item, text, url };
                } else {
                    return item; // Return unchanged item if id doesn't match
                }
            });

            // Return updated footer data with modified children array
            return {
                ...prevData,
                weddingDistricties: {
                    ...prevData.weddingDistricties,
                    children: updatedChildren
                }
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

        const items = reoder(footerData.navigation, result.source.index, result.destination.index);

        setFooterData((prevData) => ({
            ...prevData,
            navigation: items
        }));
    }

    function handleFileUpload(file) {
        setLoadingImage(true)

        const formData = new FormData();
        formData.append('file', file);

        router.post('/components/footer', formData, {
            onSuccess: (page) => {
                // Acessa os dados retornados do Laravel
                const response = page.props;

                setFooterData({
                    ...footerData,
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

    function handleSubmit() {
        setLoadingFooter(true)

        router.put('footer', footerData, {
            onSuccess: (page) => {
                toast.success('Rodapé atualizado com sucesso')
                setLoadingFooter(false)
            },
            onError: (errors) => {
                console.log(errors)
                toast.error('Ocorreu um erro ao atualizar o rodapé')
                setLoadingFooter(false)
            }
        })
    }

    const DefaultItem = ({ item, index }) => {
        const [edit, setEdit] = useState(false);
        const [url, setUrl] = useState(item.url);
        const [text, setText] = useState(item.text);

        const handleSave = () => {
            setFooterData((prevData) => {
                const updatedLegal = [...prevData.legal];
                updatedLegal[index] = { url, text };

                return {
                    ...prevData,
                    legal: updatedLegal
                };
            });
            setEdit(false);
        };

        return (
            <div>
                {
                    edit ?
                        <div className='flex justify-center my-4'>
                            <TextField
                                label='Url'
                                value={url}
                                sx={{ mr: 1 }}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <TextField
                                label='Texto'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <IconButton onClick={handleSave}><DoneIcon /></IconButton>
                        </div>
                        :
                        <ListItem
                            key={index}
                            secondaryAction={
                                <>
                                    <IconButton onClick={() => setEdit(true)} component="label" edge="end"
                                                aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemButton>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                }
            </div>
        );
    };

    return (
        <div>
            <Toaster position="bottom-left" reverseOrder={false}/>

            {
                (loadingImage || loadingFooter) &&
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={open}
                    // onClick={handleClose}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }

            <PageInfo title='Rodapé (footer)'
                      description='Gerencie informações importantes do rodapé que aparecerá em todas as páginas e módulos.'/>

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
                    src={`${appUrl}/iframes/footer`}
                    // src="http://localhost:8000/iframes/footer"
                    title="iframe"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: '1px solid #CCC',
                        display: loading ? 'none' : 'block',
                    }}
                />
            </div>

            <div className='flex justify-end py-2'>
                <Button onClick={handleSubmit} variant="contained">Salvar Atualizações</Button>
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

                    {/*logo*/}
                    <Typography variant="h6" component="div">Logo</Typography>

                    <List>
                        <ListItem
                            secondaryAction={
                                <>
                                    <IconButton component="label" edge="end" aria-label="upload">
                                        <input type="file" hidden
                                               onChange={event => handleFileUpload(event.target.files[0])}/>
                                        <EditIcon/>
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemButton>
                                <img src={footerData.logo} height='150' width='150'/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                    {/*navegação geral*/}
                    <Typography variant="h6" component="div">
                        Items da navegação
                    </Typography>

                    <List>
                        <div className='flex justify-center'>
                            <IconButton onClick={updateFooterData} aria-label="add">
                                <AddIcon/>
                            </IconButton>
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="items" type='list' direction='vertical'>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {footerData.navigation.map((item, index) => (
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
                                                footerData={footerData}
                                                setFooterData={setFooterData}
                                            />
                                        ))}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                    </List>

                    {/*navegação de casamentos*/}
                    <Typography variant="h6" component="div">
                        Navegação de casamentos
                    </Typography>

                    <List>
                        <WeddingDistrictiesItem
                            item={footerData.weddingDistricties}
                            index={99}
                            key={99}
                            selectedIndex={selectedIndex}
                            handleCollapse={handleCollapse}
                            footerData={footerData}
                            setFooterData={setFooterData}
                            updateWeddingDistrictiesText={updateWeddingDistrictiesText}
                            createWeddingDataChildren={createWeddingDataChildren}
                            deleteWeddingChild={deleteWeddingChild}
                            updateWeddingChildItem={updateWeddingChildItem}
                        />
                    </List>

                    {/*outros*/}
                    <Typography variant="h6" component="div">
                        Items secundários
                    </Typography>

                    <List>
                        {/* rights */}
                        {
                            editRights ?
                                <div className='flex justify-center my-4'>
                                    <TextField
                                        // onChange={(e) => item.text = e.target.value}
                                        label='Url'
                                        defaultValue={footerData.rights.url}
                                        sx={{ mr: 1 }}
                                        onChange={
                                            (e) =>
                                                setFooterData((prevData) => ({
                                                    ...prevData,
                                                    rights: {
                                                        ...prevData.rights,
                                                        url: e.target.value
                                                    }
                                                }))
                                        }
                                    />
                                    <TextField
                                        // onChange={(e) => item.text = e.target.value}
                                        onChange={
                                            (e) =>
                                            setFooterData((prevData) => ({
                                                ...prevData,
                                                rights: {
                                                    ...prevData.rights,
                                                    text: e.target.value
                                                }
                                            }))
                                        }
                                        label='Texto'
                                        defaultValue={footerData.rights.text}
                                    />
                                    <IconButton onClick={() => setEditRights(false)}><DoneIcon /></IconButton>
                                </div>
                                :
                                <ListItem
                                    secondaryAction={
                                        <>
                                            <IconButton onClick={() => setEditRights(true)} component="label" edge="end" aria-label="upload">
                                                <EditIcon/>
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemButton>
                                        <ListItemText primary={footerData.rights.text}/>
                                    </ListItemButton>
                                </ListItem>
                        }

                        {/* legal */}
                        {footerData && footerData.legal.map((item, index) => (
                            <DefaultItem item={item} index={index} />
                        ))}

                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

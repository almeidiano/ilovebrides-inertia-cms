import React, { useState } from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import NavigationItemChild from './NavigationItemChild';
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const NavigationItem = ({
                            item, index, handleCollapse, selectedIndex, deleteNavigationItem,
                            deleteNavigationChild, createNavigationDataChildren, updateItem,
                            updateChildItem, navigationData, setNavigationData
                        }) => {
    const [editMode, setEditMode] = useState(false);

    const handleSave = () => {
        updateItem(item.id, item.text, item.url);
        setEditMode(false);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        if (result.type === 'child') {
            const items = navigationData.navigation.items.map((navItem) => {
                if (navItem.id === item.id) {
                    const reorderedChildren = reorder(navItem.children, result.source.index, result.destination.index);
                    return {
                        ...navItem,
                        children: reorderedChildren
                    };
                }
                return navItem;
            });

            setNavigationData((prevData) => ({
                ...prevData,
                navigation: {
                    ...prevData.navigation,
                    items: items
                }
            }));
        }
    };

    return (
        <div>
            {editMode ? (
                <div className='flex justify-center my-4'>
                    <TextField
                        onChange={(e) => item.url = e.target.value}
                        label='Url'
                        defaultValue={item.url}
                        sx={{ mr: 1 }}
                    />
                    <TextField
                        onChange={(e) => item.text = e.target.value}
                        label='Texto'
                        defaultValue={item.text}
                    />
                    <IconButton onClick={handleSave}><DoneIcon /></IconButton>
                </div>
            ) : (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided, snapshot) => (
                        <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            sx={{ backgroundColor: snapshot.isDragging ? '#CCC' : '' }}
                        >
                            <ListItem
                                onClick={() => handleCollapse(index)}
                                key={item.text}
                                disablePadding
                                secondaryAction={
                                    <>
                                        {item.children.length > 0 ? (
                                            <IconButton edge="end" aria-label="expand">
                                                {selectedIndex === index ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={() => createNavigationDataChildren(item.id)} edge="end" aria-label="add">
                                                <AddIcon />
                                            </IconButton>
                                        )}
                                        <IconButton onClick={() => setEditMode(true)} edge="end" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteNavigationItem(item.id)} edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemButton {...provided.dragHandleProps}>
                                    <ListItemText primary={`${item.text} ${item.children.length > 0 ? `(${item.children.length})` : ''}`} />
                                </ListItemButton>
                            </ListItem>

                            {item.children && item.children.length > 0 && (
                                <Collapse in={selectedIndex === index} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <div className='flex justify-center'>
                                            <IconButton onClick={() => createNavigationDataChildren(item.id)} aria-label="add">
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                        <DragDropContext onDragEnd={onDragEnd}>
                                            <Droppable droppableId={`${item.id}-children`} type='child'>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                        {item.children.map((childItem, childIndex) => (
                                                            <NavigationItemChild
                                                                key={childItem.id}
                                                                parentId={item.id}
                                                                childItem={childItem}
                                                                childIndex={childIndex}
                                                                deleteNavigationChild={deleteNavigationChild}
                                                                updateChildItem={updateChildItem}
                                                            />
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </List>
                                </Collapse>
                            )}
                        </Box>
                    )}
                </Draggable>
            )}
        </div>
    );
};

export default NavigationItem;

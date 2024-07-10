import React, { useState } from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import TextField from "@mui/material/TextField";
import { Draggable } from "@hello-pangea/dnd";

const NavigationItemChild = ({ parentId, childItem, childIndex, deleteNavigationChild, updateChildItem }) => {
    const [editMode, setEditMode] = useState(false);

    const handleSave = () => {
        updateChildItem(parentId, childItem.id, childItem.text, childItem.url);
        setEditMode(false);
    };

    return (
        <Draggable draggableId={childItem.id} index={childIndex} key={childItem.id}>
            {(provided, snapshot) => (
                <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    disablePadding
                    sx={{ pl: 4, pr: 2, backgroundColor: snapshot.isDragging ? '#CCC' : '' }}
                >
                    {editMode ? (
                        <div className='flex justify-center my-4'>
                            <TextField
                                onChange={(e) => childItem.url = e.target.value}
                                label='Url'
                                defaultValue={childItem.url}
                                sx={{ mr: 1 }}
                            />
                            <TextField
                                onChange={(e) => childItem.text = e.target.value}
                                label='Texto'
                                defaultValue={childItem.text}
                            />
                            <IconButton onClick={handleSave}><DoneIcon /></IconButton>
                        </div>
                    ) : (
                        <>
                            <ListItemButton>
                                <ListItemText primary={childItem.text} />
                            </ListItemButton>
                            <div className='mx-4'>
                                <IconButton onClick={() => setEditMode(true)} edge="end" aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => deleteNavigationChild(parentId, childItem.id)} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </>
                    )}
                </ListItem>
            )}
        </Draggable>
    );
};

export default NavigationItemChild;

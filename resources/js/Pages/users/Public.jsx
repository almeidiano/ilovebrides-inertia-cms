import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import PageInfo from '@/Components/PageInfo';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from "@mui/material/Checkbox";
import {router} from "@inertiajs/react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, FormGroup,
    InputLabel,
    Select
} from "@mui/material";
import toast, {Toaster} from "react-hot-toast";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function General({ users }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event, rowIndex) => {
        setAnchorEl(event.currentTarget);
        setCurrentRow(rowIndex);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentRow(null);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const columns = [
        {
            name: "name",
            label: "Nome",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "district",
            label: "Distrito",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "phone_nr",
            label: "Telefone",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "cartao_vantagens",
            label: "Clube Benefícios",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return <Checkbox checked={value} disabled />;
                }
            }
        },
        {
            name: "engaged",
            label: "Noivo(a)",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return <Checkbox checked={value} disabled />;
                }
            }
        },
        {
            name: "newsletter",
            label: "Newsletter",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return <Checkbox checked={value} disabled />;
                }
            }
        },
        {
            name: 'actions',
            label: 'Ações',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const rowIndex = tableMeta.rowIndex;
                    const user = users[rowIndex];

                    return (
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={anchorEl && currentRow === rowIndex ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={anchorEl && currentRow === rowIndex ? 'true' : undefined}
                                onClick={(event) => handleClick(event, rowIndex)}
                                variant='contained'
                            >
                                Ações
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl) && currentRow === rowIndex}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => console.log(user)}>Editar ultilizador</MenuItem>
                            </Menu>
                        </div>
                    );
                }
            }
        },
    ];

    const data = users;

    const options = {
        rowsPerPageOptions: [10],
        textLabels: {
            body: {
                noMatch: "Nenhum ultilizador foi encontrado",
                toolTip: "Sort",
                columnHeaderTooltip: column => `Sort for ${column.label}`
            },
            pagination: {
                next: "Next Page",
                previous: "Previous Page",
                displayRows: "of",
            },
            toolbar: {
                search: "Search",
                downloadCsv: "Download CSV",
                viewColumns: "View Columns",
                filterTable: "Filter Table",
            },
            filter: {
                all: "All",
                title: "FILTERS",
                reset: "RESET",
            },
            viewColumns: {
                title: "Show Columns",
                titleAria: "Show/Hide Table Columns",
            },
            selectedRows: {
                text: "usuário(s) selecionado",
                delete: "Excluir",
                deleteAria: "Delete Selected Rows",
            },
        },
        onRowsDelete: async (e) => {
            // const confirmed = await confirmDelete();
            // return confirmed;

            let usersIdToDelete = [];

            e.data.forEach(item => {
                let user = users[item.index];
                usersIdToDelete.push(user.user_id)
            })

            router.post('/users/public', usersIdToDelete, {
                onSuccess: (page) => {
                    toast.success('Usuário(s) excluído(s) com sucesso')
                },
                onError: (errors) => {
                    console.log(errors)
                    toast.error('Ops! Ocorreu um erro.')
                }
            })
        }
    };

    return (
        <div>
            {/*dialog*/}
            <Dialog
                fullScreen
                open={open}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDialog}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Criar Ultilizador Público
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleCloseDialog}>
                            Salvar Informações
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    {/*<ListItemButton>*/}
                    {/*    <ListItemText primary="Phone ringtone" secondary="Titania" />*/}
                    {/*</ListItemButton>*/}
                    {/*<Divider />*/}
                    {/*<ListItemButton>*/}
                    {/*    <ListItemText*/}
                    {/*        primary="Default notification ringtone"*/}
                    {/*        secondary="Tethys"*/}
                    {/*    />*/}
                    {/*</ListItemButton>*/}
                    <Container maxWidth='xl' sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField size='small' required fullWidth label="Nome Completo" id="fullWidth" />
                        <TextField size='small' required fullWidth label="Username" id="fullWidth" />

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField size='small' required type='password' fullWidth id="outlined-basic" label="Senha" variant="outlined" />
                            <TextField size='small' required type='password' fullWidth id="outlined-basic" label="Confirmar Senha" variant="outlined" />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                size='small'
                                required
                                type='text'
                                sx={{ flex: 2 }}
                                id="outlined-email"
                                label="Email"
                                variant="outlined"
                            />

                            <Box sx={{display: 'flex'}}>
                                <div className='bg-gray-200 rounded flex items-center px-2 mx-2'>+351</div>
                                <TextField
                                    size='small'
                                    type='number'
                                    // value={'+351'}
                                    sx={{ flex: 1 }}
                                    id="outlined-contact"
                                    label="Contacto Telefônico"
                                    variant="outlined"
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                size='small'
                                type='text'
                                sx={{ flex: 2 }}
                                id="outlined-email"
                                label="Morada"
                                variant="outlined"
                            />

                            <FormControl sx={{flex: 1}} size='small'>
                                <InputLabel id="demo-simple-select-label">País</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={null}
                                    label="País"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                size='small'
                                type='text'
                                sx={{ flex: 2 }}
                                id="outlined-email"
                                label="Código Postal"
                                variant="outlined"
                            />

                            <FormControl sx={{flex: 1}} size='small'>
                                <InputLabel id="demo-simple-select-label">Distrito</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={null}
                                    label="Distrito"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                size='small'
                                type='text'
                                sx={{ flex: 2 }}
                                id="outlined-email"
                                label="Profissão"
                                variant="outlined"
                            />

                            <FormControl sx={{flex: 1}} size='small'>
                                <InputLabel id="demo-simple-select-label">Plano</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={null}
                                    label="Distrito"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label='Está noivo(a)?'
                        />

                        <TextField size='small' fullWidth label="NIF" id="fullWidth" />

                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
                            <Box sx={{ flex: 1 }}>
                                <InputLabel id="select-label-1">Estado Civil</InputLabel>
                                <Select
                                    size='small'
                                    labelId="select-label-1"
                                    id="select-1"
                                    value={10}
                                    // label="Age"
                                    fullWidth
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <InputLabel id="select-label-2">Hablitações Literárias</InputLabel>
                                <Select
                                    size='small'
                                    labelId="select-label-2"
                                    id="select-2"
                                    value={10}
                                    // label="Age"
                                    fullWidth
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Box>
                        </Box>

                        <FormGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 1 }}>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label={
                                    <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href="https://ilovebrides.pt/clube-beneficios" target="_blank" rel="noopener noreferrer">
                                        Aderir ao Clube Benefícios
                                    </a>
                                }
                            />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Newsletter" />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label={
                                    <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href="https://ilovebrides.pt/info/condicoes-gerais" target="_blank" rel="noopener noreferrer">
                                        Li e aceito as condições gerais
                                    </a>
                                }
                            />
                        </FormGroup>
                    </Container>
                </List>
            </Dialog>

            {/*toast*/}
            <Toaster position="bottom-left" reverseOrder={false}/>

            <PageInfo title="Ultilizadores Gerais (públicos e profissionais)"/>

            <div className='my-2'><Button onClick={handleOpenDialog} variant="outlined">Criar ultilizador
                público</Button></div>

            <MUIDataTable
                title={"Lista de Ultilizadores"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
}

export default General;

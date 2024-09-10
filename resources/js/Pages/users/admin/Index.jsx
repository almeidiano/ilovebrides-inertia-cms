import React, {useState, useMemo, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import PageInfo from '@/Components/PageInfo';
import Checkbox from "@mui/material/Checkbox";
import {Link, router} from "@inertiajs/react";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl, FormGroup,
    InputLabel,
    Select
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import Slide from '@mui/material/Slide';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'

// icons
import EditIcon from '@mui/icons-material/Edit';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function General({ users }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);
    const [open, setOpen] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const [confirmedPassword, setConfirmedPassword] = useState('');

    const [confirmedEditPassword, setConfirmedEditPassword] = useState({
        password: '',
        confirmPassword: ''
    });

    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const { props } = usePage();
    const { flash } = props;

    useEffect(() => {
        console.log(flash)
        if (flash) {
            toast.success(flash, {
                toastId: 'success1'
            });
        }
    }, [flash]);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        username: '',
        password: '',
        email: '',
        active: true,
    });

    const [editUser, setEditUser] = useState({
        id: null,
        name: '',
        username: '',
        password: '',
        email: '',
        active: false,
    });

    const handleOpenEditDialog = (user) => {
        setEditUser(user)

        setOpenEditDialog(true)
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if(data.password !== confirmedPassword) {
            return toast.error('Senhas não correspondem.')
        }

        setOpenBackdrop(true)

        router.post('/users/admin', data, {
            onSuccess: (page) => {
                toast.success("Administrador adicionado com sucesso!")
                setOpenBackdrop(false)
                setOpen(false)
            },
            onError: (errors) => {
                toast.error('Ops! Ocorreu um erro.')
                console.log(errors)
                setOpenBackdrop(false)
                setOpen(false)
            },
            onProgress: (progress) => {
                setOpenBackdrop(true)
            }
        })
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();

        setEditUser((prevData) => ({
            ...prevData,
            password: confirmedEditPassword.confirmPassword,
        }));

        console.log(editUser)
        // if(confirmedEditPassword.password !== confirmedEditPassword.confirmPassword) {
        //     return toast.error('Senhas não correspondem.')
        // }
        //
        // setOpenBackdrop(true)
        //
        // router.put(`/users/admin/${editUser.id}`, editUser, {
        //     onSuccess: (page) => {
        //         toast.success("Administrador atualizado com sucesso!")
        //         setOpenBackdrop(false)
        //         setOpen(false)
        //     },
        //     onError: (errors) => {
        //         toast.error('Ops! Ocorreu um erro.')
        //         console.log(errors)
        //         setOpenBackdrop(false)
        //         setOpen(false)
        //     },
        //     onProgress: (progress) => {
        //         setOpenBackdrop(true)
        //     }
        // })
        //
        // setOpenEditDialog(false)
    };

    // Memoized columns
    const columns = useMemo(() => [
        {
            name: "name",
            label: "Nome",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "username",
            label: "Username",
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
            name: "active",
            label: "Ativo",
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
                                // onClick={(event) => handleClick(event, rowIndex)}
                                onClick={() => handleOpenEditDialog(user)}
                                variant='contained'
                            >
                                <EditIcon />
                            </Button>
                        </div>
                    );
                }
            }
        },
    ], [anchorEl, currentRow, users]);

    // Memoized options
    const options = useMemo(() => ({
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
                text: "Administrador(s) selecionado",
                delete: "Excluir",
                deleteAria: "Delete Selected Rows",
            },
        },
        onRowsDelete: async (e) => {
            let usersIdToDelete = [];

            e.data.forEach(item => {
                let user = users[item.dataIndex];
                usersIdToDelete.push(user.id);
            });

            try {
                let req = await axios.post('/users/admin/delete', usersIdToDelete);
                let res = await req.data;

                if(!res.error) {
                    toast.success('Administrador(s) excluído(s) com sucesso');
                }

                console.log(res)
            }catch(error) {
                toast.error("Ops! Ocorreu um erro.")
                console.log(error)
            }
        }
    }), [users]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;

        setEditUser((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangeEditCheck = (e) => {
        const { name, checked } = e.target;

        setEditUser((prevData) => ({
            ...prevData,
            [name]: checked
        }));
    }

    return (
        <div>
            {/*create dialog*/}
            <Dialog
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Adicionar Administrador</DialogTitle>
                <DialogContent>
                    <TextField onChange={handleChange} autoFocus required margin="dense" id="name" name="name" label="Nome" type="text" fullWidth variant="standard"/>
                    <TextField onChange={handleChange} autoFocus required margin="dense" id="email" name="email" label="Email" type="email" fullWidth variant="standard"/>
                    <TextField onChange={handleChange} autoFocus required margin="dense" id="username" name="username" label="Username" type="text" fullWidth variant="standard"/>

                    {/*passwords*/}
                    <Box sx={{display: 'flex'}}>
                        <TextField onChange={handleChange} autoFocus required margin="dense" id="password" name="password" label="Senha" type="password" fullWidth variant="standard"/>

                        {/*confirm password*/}
                        <TextField onChange={(e) => setConfirmedPassword(e.target.value)} autoFocus required margin="dense" id="confirmPassword" label="Confirmar Senha" type="password" fullWidth variant="standard"/>
                    </Box>

                    <FormControlLabel onChange={handleChange} control={<Checkbox defaultChecked />} label="Ativo" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} type="submit">Salvar Informações</Button>
                </DialogActions>
            </Dialog>

            {/*edit dialog*/}
            <Dialog
                maxWidth={'sm'}
                open={openEditDialog}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Editar Administrador</DialogTitle>

                <DialogContent>
                    <DialogContentText>A senha não será alterada caso seu campo esteja em branco.</DialogContentText>

                    <TextField value={editUser.name} onChange={handleChangeEdit} autoFocus margin="dense" id="name" name="name" label="Nome" type="text" fullWidth variant="standard"/>
                    <TextField value={editUser.email} onChange={handleChangeEdit} autoFocus margin="dense" id="email" name="email" label="Email" type="email" fullWidth variant="standard"/>
                    <TextField value={editUser.username} onChange={handleChangeEdit} autoFocus margin="dense" id="username" name="username" label="Username" type="text" fullWidth variant="standard"/>

                    {/*passwords*/}
                    <Box sx={{display: 'flex'}}>
                        <TextField value={confirmedEditPassword.password} onChange={(e) => setConfirmedEditPassword(prevState => ({...prevState, [password]: e.target.value}))} autoFocus margin="dense" id="password" name="password" label="Senha" type="password" fullWidth variant="standard"/>

                        {/*confirm password*/}
                        <TextField value={confirmedEditPassword.confirmPassword} onChange={(e) => setConfirmedEditPassword(prevState => ({...prevState, [confirmPassword]: e.target.value}))} autoFocus margin="dense" id="confirmPassword" label="Confirmar Senha" type="password" fullWidth variant="standard"/>
                    </Box>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={editUser.active}
                                name='active'
                                onChange={handleChangeEditCheck}
                            />
                        }
                        label="Ativo"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
                    <Button onClick={handleSubmitEdit} type="submit">Salvar Informações</Button>
                </DialogActions>
            </Dialog>

            {/*toast*/}
            <Toaster position="bottom-left" reverseOrder={false} />

            <PageInfo title="Ultilizadores Administrativos" />

            <div className='my-2'>
                <Button onClick={handleOpenDialog} variant="outlined">
                    Criar Administrador
                </Button>
            </div>

            <MUIDataTable
                title={"Lista de Ultilizadores"}
                data={users}
                columns={columns}
                options={options}
            />
        </div>
    );
}

export default General;

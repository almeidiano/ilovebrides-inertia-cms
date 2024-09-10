import React, {useState, useMemo, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import PageInfo from '@/Components/PageInfo';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from "@mui/material/Checkbox";
import { router } from "@inertiajs/react";
import {
    Dialog,
    FormControl, FormGroup,
    InputLabel,
    Select
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputMask from "react-input-mask";
import { useForm } from '@inertiajs/react'
import dayjs from 'dayjs';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function General({ user }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [confirmedPassword, setConfirmedPassword] = useState(user.password);
    const [checked, setChecked] = useState(false);
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        username: user.username,
        password: user.password,
        email: user.email,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(data.password !== confirmedPassword) {
            return toast.error('Senhas não correspondem.')
        }

        setOpenBackdrop(true)

        router.put(`/users/public/${user.id}/user/${user.user_id}`, data, {
            onSuccess: (page) => {
                toast.success("Usuário editado com sucesso!")
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        if (date && date.isValid && date.isValid()) {
            const formattedDate = date.toISOString().split('T')[0];
            setData((prevData) => ({
                ...prevData,
                wedding_date: formattedDate
            }));
        }
    };

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <PageInfo title="Editar Administrador(a)" />

            <List>
                <form onSubmit={handleSubmit}>
                    <Container maxWidth='xl' sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField onChange={(e) => setData('name', e.target.value)} name='name' value={data.name} size='small' required fullWidth label="Nome Completo" />
                        <TextField onChange={handleChange} name='username' value={data.username} size='small' required fullWidth label="Username" />

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField onChange={handleChange} name='password' value={data.password} size='small' required type='password' fullWidth id="password" label="Senha" variant="outlined" />
                            <TextField value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} size='small' required type='password' fullWidth id="rewrite-password" label="Confirmar Senha" variant="outlined" />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                onChange={handleChange}
                                name='email'
                                value={data.email}
                                size='small'
                                required
                                type='text'
                                sx={{ flex: 2 }}
                                id="email"
                                label="Email"
                                variant="outlined"
                            />
                        </Box>

                        <div className='flex justify-center'>
                            {
                                processing ?
                                    <Button startIcon={<CircularProgress color="inherit" size={20} />} variant='contained' type="submit">
                                        Salvar Informações
                                    </Button>
                                    :
                                    <Button variant='contained' type="submit">
                                        Salvar Informações
                                    </Button>
                            }
                        </div>
                    </Container>
                </form>
            </List>
        </div>
    );
}

export default General;

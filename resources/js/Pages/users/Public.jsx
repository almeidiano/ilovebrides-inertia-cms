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

function General({ users, countries, districts, brandPlans, maritalStatus, literaryAbilities }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);
    const [open, setOpen] = useState(false);
    const [isEngaged, setIsEngaged] = useState(false);
    const [phoneCode, setPhoneCode] = useState(null);
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        username: '',
        password: '',
        email: '',
        newsletter: false,
        country: '',
        city: '',
        district: '',
        locality: '',
        postal: '',
        address: '',
        engaged: false,
        nif: '',
        phone_nr: '',
        cartao_vantagens: false,
        plan_id: 1,
        occupation: '',
        marital_status: 1, // Valor padrão para marital_status
        literary_abilities: 1,
        spouse_name: null,
        wedding_date: null,
        wedding_district: null
    });

    // Memoized countryMap
    const countryMap = useMemo(() => {
        return countries.reduce((acc, country) => {
            acc[country.countryName] = country.phoneCode;
            return acc;
        }, {});
    }, [countries]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if(data.password !== confirmedPassword) {
            return toast.error('Senhas não correspondem.')
        }

        if(!checked) {
            return toast.error('Aceite as condições gerais antes de continuar.')
        }

        setOpenBackdrop(true)

        router.post('/users/public', data, {
            onSuccess: (page) => {
                toast.success("Usuário adicionado com sucesso!")
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
                text: "usuário(s) selecionado",
                delete: "Excluir",
                deleteAria: "Delete Selected Rows",
            },
        },
        onRowsDelete: async (e) => {
            let usersIdToDelete = [];

            e.data.forEach(item => {
                let user = users[item.dataIndex];
                usersIdToDelete.push(user.user_id);
            });

            try {
                let req = await axios.post('/users/public/delete', usersIdToDelete);
                let res = await req.data;

                if(!res.error) {
                    toast.success('Usuário(s) excluído(s) com sucesso');
                }
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

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        const phoneCode = countryMap[selectedCountry] || '';

        setPhoneCode(phoneCode);
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

    useEffect(() => {
        setData('engaged', isEngaged);
    }, [isEngaged]);

    const handleCheckboxChange = () => {
        setIsEngaged(!isEngaged);
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
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
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
                    </Toolbar>
                </AppBar>
                <List>
                    <form onSubmit={handleSubmit}>
                        <Container maxWidth='xl' sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField onChange={(e) => setData('name', e.target.value)} name='name' value={data.name} size='small' required fullWidth label="Nome Completo" />
                            <TextField onChange={handleChange} name='username' value={data.username} size='small' required fullWidth label="Username" />

                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField onChange={handleChange} name='password' value={data.password} size='small' required type='password' fullWidth id="password" label="Senha" variant="outlined" />
                                <TextField onChange={(e) => setConfirmedPassword(e.target.value)} size='small' required type='password' fullWidth id="rewrite-password" label="Confirmar Senha" variant="outlined" />
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

                                <Box sx={{display: 'flex'}}>
                                    <div className='bg-gray-200 rounded flex items-center px-2 mx-2'>
                                        {phoneCode ? phoneCode : '+351'}
                                    </div>
                                    <TextField
                                        onChange={handleChange}
                                        name='phone_nr'
                                        value={data.phone_nr}
                                        size='small'
                                        type='number'
                                        sx={{ flex: 1 }}
                                        id="outlined-contact"
                                        label="Contacto Telefônico"
                                        variant="outlined"
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    onChange={handleChange}
                                    name='address'
                                    value={data.address}
                                    size='small'
                                    type='text'
                                    sx={{ flex: 2 }}
                                    id="address"
                                    label="Morada"
                                    variant="outlined"
                                />

                                <FormControl sx={{flex: 1}} size='small'>
                                    <InputLabel id="demo-simple-select-label">País</InputLabel>
                                    <Select
                                        onChange={(e) => {
                                            handleCountryChange(e);
                                            handleChange(e);
                                        }}
                                        name='country'
                                        value={data.country}
                                        id="country"
                                        label="País"
                                    >
                                        {
                                            countries.map((item, index) => (
                                                <MenuItem key={index} value={item.countryName}>{item.countryName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <InputMask
                                    mask="9999-999"
                                    value={data.postal}
                                    onChange={handleChange}
                                    disabled={false}
                                    maskChar="_"
                                >
                                    {(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            label="Código Postal"
                                            size="small"
                                            name="postal"
                                        />
                                    )}
                                </InputMask>

                                <TextField
                                    onChange={handleChange}
                                    name='locality'
                                    value={data.locality}
                                    size='small'
                                    type='text'
                                    sx={{ flex: 2 }}
                                    id="locality"
                                    label="Localidade"
                                    variant="outlined"
                                />

                                <TextField
                                    onChange={handleChange}
                                    name='city'
                                    value={data.city}
                                    size='small'
                                    type='text'
                                    sx={{ flex: 2 }}
                                    id="city"
                                    label="Cidade"
                                    variant="outlined"
                                />

                                <FormControl sx={{flex: 1}} size='small'>
                                    <InputLabel id="demo-simple-select-label">Distrito</InputLabel>
                                    <Select
                                        onChange={handleChange}
                                        name='district'
                                        value={data.district}
                                        id="district"
                                        label="Distrito"
                                    >
                                        {
                                            districts.map((item, index) => (
                                                <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    onChange={handleChange}
                                    name='occupation'
                                    value={data.occupation}
                                    size='small'
                                    type='text'
                                    sx={{ flex: 2 }}
                                    id="occupation"
                                    label="Profissão"
                                    variant="outlined"
                                />

                                <FormControl sx={{flex: 1}} size='small'>
                                    <InputLabel id="demo-simple-select-label">Plano</InputLabel>
                                    <Select
                                        onChange={handleChange}
                                        name='plan_id'
                                        value={data.plan_id}
                                        id="plan_id"
                                        label="Plano"
                                    >
                                        {
                                            brandPlans.map((item, index) => (
                                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Box>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isEngaged}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label='Está noivo(a)?'
                            />

                            {
                                isEngaged &&
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', gap: 1 }}>
                                    {/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
                                    {/*    <DatePicker*/}
                                    {/*        // onChange={handleChange}*/}
                                    {/*        onChange={(date) => handleDateChange(date)}*/}
                                    {/*        name='wedding_date'*/}
                                    {/*        value={data.wedding_date}*/}
                                    {/*        sx={{flex: 1, bottom: '3px'}}*/}
                                    {/*        slotProps={{ textField: { size: 'small' } }}*/}
                                    {/*        label="Data de casamento"*/}
                                    {/*    />*/}
                                    {/*</LocalizationProvider>*/}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{ textField: { size: 'small' } }}
                                            value={data.wedding_date ? dayjs(data.wedding_date) : null}
                                            onChange={handleDateChange}
                                            label="Data de casamento"
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>

                                    <TextField
                                        onChange={handleChange}
                                        name='spouse_name'
                                        value={data.spouse_name}
                                        sx={{flex: 1}}
                                        size='small'
                                        label="Nome do Noivo/Noiva"
                                    />

                                    <TextField
                                        onChange={handleChange}
                                        name='wedding_district'
                                        value={data.wedding_district}
                                        sx={{flex: 1}}
                                        size='small'
                                        label="Local"
                                    />
                                </Box>
                            }

                            <TextField
                                onChange={handleChange}
                                name='nif'
                                value={data.nif}
                                size='small'
                                fullWidth label="NIF"
                                id="fullWidth"
                            />

                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
                                <Box sx={{ flex: 1 }}>
                                    <InputLabel id="select-label-1">Estado Civil</InputLabel>
                                    <Select
                                        onChange={handleChange}
                                        name='marital_status'
                                        value={data.marital_status}
                                        size='small'
                                        labelId="select-label-1"
                                        id="select-1"
                                        fullWidth
                                    >
                                        {
                                            maritalStatus.map((item, index) => (
                                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <InputLabel id="select-label-2">Hablitações Literárias</InputLabel>
                                    <Select
                                        onChange={handleChange}
                                        name='literary_abilities'
                                        value={data.literary_abilities}
                                        size='small'
                                        labelId="select-label-2"
                                        id="select-2"
                                        fullWidth
                                    >
                                        {
                                            literaryAbilities.map((item, index) => (
                                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Box>
                            </Box>

                            <FormGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={data.cartao_vantagens}
                                            onChange={(e) => setData('cartao_vantagens', e.target.checked)}
                                        />
                                    }
                                    label={
                                        <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href="https://ilovebrides.pt/clube-beneficios" target="_blank" rel="noopener noreferrer">
                                            Aderir ao Clube Benefícios
                                        </a>
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={data.newsletter}
                                            onChange={(e) => setData('newsletter', e.target.checked)}
                                        />
                                    }
                                    label="Newsletter"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked} // Adicione esta linha se tiver um estado para as condições
                                            onChange={(e) => setChecked(e.target.checked)} // Adicione esta linha se tiver um estado para as condições
                                        />
                                    }
                                    label={
                                        <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href="https://ilovebrides.pt/info/condicoes-gerais" target="_blank" rel="noopener noreferrer">
                                            Li e aceito as condições gerais
                                        </a>
                                    }
                                />
                            </FormGroup>


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
            </Dialog>

            {/*toast*/}
            <Toaster position="bottom-left" reverseOrder={false} />

            <PageInfo title="Ultilizadores Gerais (públicos e profissionais)" />

            <div className='my-2'>
                <Button onClick={handleOpenDialog} variant="outlined">
                    Criar ultilizador público
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

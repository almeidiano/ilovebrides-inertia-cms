import React, {useMemo, useState} from 'react'
import PageInfo from '@/Components/PageInfo'
import Alert from "@mui/material/Alert";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel, Select
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import toast from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";
import {Link, router} from "@inertiajs/react";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function Integration({integrations}) {
    const [openWarningDialog, setOpenWarningDialog] = useState(false);
    const [openDangerDialog, setOpenDangerDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    // const [integrationToUpdate, setIntegrationToUpdate] = useState({
    //     name: "",
    //     description: "",
    //     local: "",
    //     code: ""
    // });

    const [integration, setIntegration] = useState({
        name: "",
        description: "",
        local: "",
        code: ""
    });

    const options = useMemo(() => ({
        rowsPerPageOptions: [10],
        textLabels: {
            body: {
                noMatch: "Nenhuma integração foi encontrada",
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
                text: "integração(ões) selecionada(s)",
                delete: "Excluir",
                deleteAria: "Delete Selected Rows",
            },
        },
        // onRowsDelete: async (e) => {
        //     let usersIdToDelete = [];
        //
        //     e.data.forEach(item => {
        //         let user = users[item.dataIndex];
        //         usersIdToDelete.push(user.user_id);
        //     });
        //
        //     try {
        //         let req = await axios.post('/users/public/delete', usersIdToDelete);
        //         let res = await req.data;
        //
        //         if(!res.error) {
        //             toast.success('Usuário(s) excluído(s) com sucesso');
        //         }
        //     }catch(error) {
        //         toast.error("Ops! Ocorreu um erro.")
        //         console.log(error)
        //     }
        // }
    }), [integrations]);

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
            name: "description",
            label: "Descrição",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "local",
            label: "Local",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "code",
            label: "Código",
            options: {
                filter: true,
                sort: false,
                display: 'false' // Isso oculta a coluna, mas mantém os dados acessíveis.
            }
        },
        {
            name: 'actions',
            label: 'Ações',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    // const rowIndex = tableMeta.rowIndex;
                    // const user = users[rowIndex];

                    return (
                        <div>
                            <Button
                                id="basic-button"
                                variant='contained'
                                onClick={
                                    () => [
                                        // setInfoToUpdate({
                                        //     name: tableMeta.rowData[0],
                                        //     description: tableMeta.rowData[1],
                                        //     local: tableMeta.rowData[2],
                                        //     code: tableMeta.rowData[3]
                                        // }),
                                        setOpenEditDialog(true)
                                    ]
                                }
                            >
                                <EditIcon />
                            </Button>
                        </div>
                    );
                }
            }
        },
    ], [integrations]);

    function checkRegularExpressions(code) {
        // Regular expressions to match <script>...</script> and <link rel="...">
        const scriptTagPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        const linkRelPattern = /<link\s+rel="[^"]*"\s*\/?>/gi;

        // Test if the text contains any of the unsafe tags
        const containsScriptTag = scriptTagPattern.test(code);
        const containsLinkRelTag = linkRelPattern.test(code);

        return containsScriptTag || containsLinkRelTag;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenDialog(false)

        if(!checkRegularExpressions(integration.code)) {
            return setOpenDangerDialog(true)
        }

        router.post('/seo/integrations', integration, {
            onSuccess: (page) => {
                toast.success("Usuário adicionado com sucesso!")
            },
            onError: (errors) => {
                toast.error('Ops! Ocorreu um erro.')
                console.log(errors)
            },
        })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();

        alert(true)
    }

    return (
        <div>
            <PageInfo title='Integrações de Código (SEO)'
                      description='Integre trechos de código na aplicação e em todos os módulos subsequentes para extender funcionalidades de terceiros.'/>
            <Alert severity="warning" sx={{mt: 2, display: 'flex', alignItems: 'center'}}>
                A integração precisa ser validada de acordo com as normas para garantir seu
                funcionamento e segurança adequados.
                <Button variant="contained" sx={{ml: 1}} onClick={() => setOpenWarningDialog(true)}>Visualizar</Button>
            </Alert>

            {/*warning*/}
            <Dialog
                open={openWarningDialog}
                onClose={() => setOpenWarningDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Normas de Integração de Código"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <b>Objetivo:</b><br/> Este documento descreve as normas e recomendações gerais para garantir a
                        total funcionalidade da integração de codigo, promovendo a segurança e a integridade da
                        aplicação e seus módulos subsequentes.
                        <br/><br/>

                        <b>1. Validação de Conteúdo de Código</b> <br/>
                        Antes de injetar qualquer string, certifique-se de que é realmente um código válido e necessário
                        para a integração desejada. (&lt;script&gt; ou &lt;rel&gt;).

                        <br/><br/>

                        <b>2. Aberturas e fechamentos indevidos de tags</b> <br/>
                        Certifique-se de que as tags do código estejam devidamente abertas e fechadas. Este detalhe é
                        crucial, pois sua aplicação incorreta pode corromper todo o sistema e comprometer os módulos
                        subsequentes.

                        <br/><br/>

                        <b>3. Tipos de códigos recomendados</b><br/>
                        Implemente apenas códigos ao lado do cliente (javascript ou similares). Certifique-se de
                        implementar onde o código será aplicado.

                        <br/><br/>

                        <b>4. Utilização de HTTPS</b><br/>
                        Certifique-se de que o código está sendo inserido através do protocolo HTTPS para garantir a
                        proteção dos dados transmitidos entre o cliente e o servidor contra interceptação e manipulação
                        por parte de terceiros.

                        <br/><br/>

                        <b>5. Validação de Entrada de Dados</b><br/>
                        Realize sempre a validação de entrada de dados antes de injetar qualquer código. Isso ajuda a
                        prevenir a injeção de scripts maliciosos e a manter a integridade do sistema.

                        <br/><br/>

                        <b>6. Escapamento de Caracteres Especiais</b><br/>
                        Utilize técnicas de escapamento de caracteres especiais para evitar problemas de segurança como
                        cross-site scripting (XSS). Isso assegura que caracteres potencialmente perigosos sejam tratados
                        corretamente.


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenWarningDialog(false)}>Entendido</Button>
                </DialogActions>
            </Dialog>

            {/*danger*/}
            <Dialog
                open={openDangerDialog}
                onClose={() => setOpenDangerDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Tem certeza?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Você está prestes a inserir um código que viola as normas estabelecidas para a injeção de código na aplicação. Antes de prosseguir, é essencial
                        que você tenha absoluta certeza de que este código pode ser aplicado de forma segura, pois a
                        violação dessas normas pode comprometer a segurança e a funcionalidade do sistema, resultando em
                        vulnerabilidades, instabilidade, conflitos com módulos existentes e possível corrupção de
                        dados.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDangerDialog(false)}>Cancelar</Button>
                    <Button variant="contained" color='error'>Aplicar Código</Button>
                </DialogActions>
            </Dialog>

            {/*create*/}
            <Dialog
                open={openDialog}
                // onClose={handleClose}
                // PaperProps={{
                //     component: 'form',
                //     onSubmit: (event) => {
                //         event.preventDefault();
                //         const formData = new FormData(event.currentTarget);
                //         const formJson = Object.fromEntries((formData as any).entries());
                //         const email = formJson.email;
                //         console.log(email);
                //         handleClose();
                //     },
                // }}
            >
                <form onSubmit={handleSubmit}>
                <DialogTitle>Criar integração</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        name="name"
                        label="Nome"
                        type="text"
                        fullWidth
                        value={integration.name}
                        onChange={(e) => setIntegration((prevData) => ({...prevData, name: e.target.value}))}
                        // variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Descrição"
                        type="email"
                        fullWidth
                        rows={2}
                        multiline
                        value={integration.description}
                        onChange={(e) => setIntegration((prevData) => ({...prevData, description: e.target.value}))}
                    />
                    <FormControl fullWidth sx={{my: 1}}>
                        <InputLabel id="demo-simple-select-label">Local</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={integration.local}
                            label="Local"
                            onChange={(e) => setIntegration((prevData) => ({...prevData, local: e.target.value}))}
                        >
                            <MenuItem value='head'>Head</MenuItem>
                            <MenuItem value='body'>Body</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        margin="dense"
                        name="code"
                        label="Código"
                        type="text"
                        fullWidth
                        rows={4}
                        multiline
                        value={integration.code}
                        onChange={(e) => setIntegration((prevData) => ({...prevData, code: e.target.value}))}
                        // variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button variant="contained" type="submit">Criar</Button>
                </DialogActions>
                </form>
            </Dialog>

            {/*edit*/}
            <Dialog
                open={openEditDialog}
                // onClose={handleClose}
                // PaperProps={{
                //     component: 'form',
                //     onSubmit: (event) => {
                //         event.preventDefault();
                //         const formData = new FormData(event.currentTarget);
                //         const formJson = Object.fromEntries((formData as any).entries());
                //         const email = formJson.email;
                //         console.log(email);
                //         handleClose();
                //     },
                // }}
            >
                <form onSubmit={handleEditSubmit}>
                    <DialogTitle>Editar integração</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            margin="dense"
                            name="name"
                            label="Nome"
                            type="text"
                            fullWidth
                            // value={infoToUpdate.name}
                            // variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Descrição"
                            type="email"
                            fullWidth
                            rows={2}
                            multiline
                            // value={infoToUpdate.description}
                        />
                        <FormControl fullWidth sx={{my: 1}}>
                            <InputLabel id="demo-simple-select-label">Local</InputLabel>
                            <Select
                                // value={infoToUpdate.local}
                                label="Local"
                                // onChange={handleChange}
                            >
                                <MenuItem value='head'>Head</MenuItem>
                                <MenuItem value='body'>Body</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            margin="dense"
                            name="code"
                            label="Código"
                            type="text"
                            fullWidth
                            rows={4}
                            multiline
                            // value={infoToUpdate.code}
                            // variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
                        <Button variant="contained" type="submit">Editar</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <div className="my-2">
                <Button variant="outlined" onClick={() => setOpenDialog(true)}>
                    Criar Integração
                </Button>
            </div>

            <MUIDataTable
                title={"Lista de Integrações"}
                data={integrations}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default Integration

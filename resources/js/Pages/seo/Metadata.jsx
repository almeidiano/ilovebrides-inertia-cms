import React, {useState} from 'react'
import PageInfo from '@/Components/PageInfo'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions, CardMedia, CircularProgress} from "@mui/material";
import {Dropzone, FileMosaic} from "@files-ui/react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Backdrop from "@mui/material/Backdrop";
import {router} from "@inertiajs/react";
import toast, {Toaster} from "react-hot-toast";

function Metadata({companyInfo}) {
    const [files, setFiles] = useState([]);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const updateFiles = (incommingFiles) => {
        setMetadataInformation((prevData) => ({
            ...prevData,
            logoUrl: incommingFiles[0].file
        }));

        const fileObject = incommingFiles[0]; // Pegando o primeiro objeto
        const file = fileObject.file; // Acessando o arquivo real (Blob)

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64data = reader.result; // Contém o data URL (base64)
                setFiles([{ ...fileObject, preview: base64data }]); // Salva a imagem base64 no estado
            };

            reader.readAsDataURL(file); // Converte o arquivo para base64
        }
    };

    const removeFile = (id) => {
        setFiles(files.filter((x) => x.id !== id));
    };

    const [metadataInformation, setMetadataInformation] = useState({
        logoUrl: companyInfo.logoUrl.replace(/\\/g, '/'),
        title: companyInfo.title,
        description: companyInfo.description,
        keywords: companyInfo.keywords
    });

    console.log(metadataInformation)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(files.length === 0) {
            return toast.error('Insira uma imagem antes de continuar.');
        }

        setOpenBackdrop(true)

        router.post(`/seo/metadata`, metadataInformation, {
            forceFormData: true,
            onSuccess: (page) => {
                toast.success("Metadado atualizado com sucesso!")
                setOpenBackdrop(false)
            },
            onError: (errors) => {
                toast.error('Ops! Ocorreu um erro.')
                console.log(errors)
                setOpenBackdrop(false)
            }
        })
    }

    return (
        <div>
            <PageInfo title='Metadados (SEO)'
                      description='Personalize a forma como o seu conteúdo aparece nos motores de busca e nas plataformas sociais. Facebook e Twitter (Open Graph e Cards)'/>

            <Toaster position="bottom-left" reverseOrder={false} />

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box
                sx={{
                    marginTop: 2,
                    display: 'grid',
                    gap: 4,
                    gridTemplateColumns: '1fr 2fr' // Define as proporções das colunas
                }}
            >
                {/* Box com sticky */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 sticky top-20 h-fit">
                    <Typography variant="h6"><strong>Metadado</strong></Typography>

                    <Dropzone
                        onChange={updateFiles}
                        value={files}
                        accept="image/*"
                        maxFiles={1}
                        label="Arraste e solte ou clique"
                        required
                    >
                        {files.map((file) => (
                            <FileMosaic key={file.id} {...file} onDelete={removeFile} preview/>
                        ))}
                    </Dropzone>

                    <TextField
                        required
                        id="outlined-helperText"
                        label="Titulo"
                        defaultValue={metadataInformation.title}
                        helperText="Recomendado: 155 - 150 caracteres"
                        fullWidth
                        onChange={(e) => setMetadataInformation((prevData) => ({...prevData, title: e.target.value}))}
                    />

                    <TextField
                        required
                        id="outlined-helperText"
                        label="Descrição do Metadados (SEO)"
                        defaultValue={metadataInformation.description}
                        helperText="Recomendado: 155 - 150 caracteres"
                        fullWidth
                        onChange={(e) => setMetadataInformation((prevData) => ({
                            ...prevData,
                            description: e.target.value
                        }))}
                    />

                    <TextField
                        required
                        id="outlined-multiline-static"
                        label="Keywords"
                        defaultValue={metadataInformation.keywords}
                        helperText="Palavras-chaves do Metadado (SEO)"
                        multiline
                        rows={4}
                        fullWidth
                        onChange={(e) => setMetadataInformation((prevData) => ({
                            ...prevData,
                            keywords: e.target.value
                        }))}
                    />

                    <Button type="submit" variant="contained">Salvar Atualizações</Button>
                </form>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography variant="h6"><strong>Prévia</strong></Typography>

                    {/* Google */}
                    <Typography variant="subtitle1" sx={{margin: 0, padding: 0, opacity: 0.5}}>
                        <b>Google</b>
                    </Typography>
                    <div className='flex flex-col'>
                        <span className="text-[#1a0dab] hover:underline">{metadataInformation.title}</span>
                        <span className="text-[#006621]">https://ilovebrides.pt/</span>
                        <span className="text-xs opacity-70">
                                                              {
                                                                  metadataInformation && metadataInformation.description.length > 60
                                                                      ? metadataInformation.description.slice(0, 60) + "…"
                                                                      : metadataInformation.description
                                                              }
                        </span>
                    </div>

                    {/*twitter*/}
                    <Typography variant="subtitle1"
                                sx={{margin: 0, padding: 0, opacity: 0.5}}><b>Twitter</b></Typography>
                    <Card sx={{maxWidth: 504, borderRadius: '14px'}}>
                        <CardActionArea>
                            <CardMedia
                                sx={{height: 252, width: 504}}
                                image={metadataInformation.logoUrl && metadataInformation.logoUrl} // Mostra a imagem base64
                            />
                            <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
                                <span className="text-sm font-bold">{metadataInformation.title}</span>
                                <span className="text-sm opacity-90">{metadataInformation.description}</span>
                                <span className="text-sm text-[#8899a6]">ilovebrides.pt</span>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    {/*facebook*/}
                    <Typography variant="subtitle1"
                                sx={{margin: 0, padding: 0, opacity: 0.5}}><b>Facebook</b></Typography>
                    <Card sx={{maxWidth: 500}}>
                        <CardActionArea>
                            <CardMedia
                                sx={{height: 261, width: 500}}
                                image={metadataInformation.logoUrl} // Mostra a imagem base64
                            />
                            <CardContent sx={{padding: 0}}>
                                <div
                                    className="p-[10px] px-3 text-[#1d2129] border-b border-b-[#dadde1] bg-[#f2f3f5] flex flex-col">

                                    <span className="text-sm text-[#8899a6] uppercase">ilovebrides.pt</span>
                                    <span className="text-sm font-bold">{metadataInformation.title}</span>
                                    <span className="text-sm opacity-90">
                                        {
                                            metadataInformation && metadataInformation.description.length > 60
                                                ? metadataInformation.description.slice(0, 60) + "…"
                                                : metadataInformation.description
                                        }
                                </span>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    {/*Linkedin*/}
                    <Typography variant="subtitle1"
                                sx={{margin: 0, padding: 0, opacity: 0.5}}><b>Linkedin</b></Typography>
                    <Card sx={{maxWidth: 552}}>
                        <CardActionArea>
                            <CardMedia
                                sx={{height: 288, width: 552}}
                                image={metadataInformation.logoUrl} // Mostra a imagem base64
                            />
                            <CardContent sx={{padding: 0}}>
                                <div
                                    className="w-full p-2 px-4 text-[#1d2129] border border-[#e6e9ec] border-t-0 bg-[#f3f6f8] flex flex-col">
                                    <span className="text-sm font-bold opacity-85">{metadataInformation.title}</span>
                                    <span className="text-sm text-[#8899a6]">ilovebrides.pt</span>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Box>
            </Box>

        </div>
    )
}

export default Metadata

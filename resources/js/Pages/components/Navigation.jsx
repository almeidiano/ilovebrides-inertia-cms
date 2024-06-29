import React, { useState, useRef, useEffect, useCallback } from 'react';
import ComponentsDashboard from '@/Components/ComponentsDashboard.jsx';
import PageInfo from "@/Components/PageInfo.jsx";
import {CircularProgress} from "@mui/material";

const NavigationChild = ({ navigationData, setNavigationData }) => {
    const iframeRef = useRef(null);
    const [loading, setLoading] = useState(true);

    // Enviar dados de navegação para o iframe quando a navegação mudar
    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: navigationData }, '*');
        }
    }, [navigationData]);

    // // Lidar com mensagens do iframe
    // useEffect(() => {
    //     const receiveMessage = (event) => {
    //         if (event.data.type === 'NAVIGATION_UPDATED') {
    //             setNavigationData(event.data.payload);
    //         }
    //     };
    //
    //     window.addEventListener('message', receiveMessage);
    //
    //     return () => {
    //         window.removeEventListener('message', receiveMessage);
    //     };
    // }, [setNavigationData]);

    const handleLoad = useCallback(() => {
        setLoading(false);
        iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_NAVIGATION', payload: navigationData }, '*');
    }, [navigationData]);

    return (
        <div style={{position: 'relative', width: '100%', height: '400px'}}>
            <PageInfo title='Navegação (header)' description='Gerencie o menu de navegação que aparecerá em todas as páginas e módulos.' />

            {loading && (
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <CircularProgress/>
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
    );
};

export default function Navigation({data}) {
    const [navigationData, setNavigationData] = useState(data);

    return (
        <ComponentsDashboard setNavigationData={setNavigationData} data={navigationData} children={<NavigationChild navigationData={navigationData} setNavigationData={setNavigationData} />} type='navigation' />
    );
}

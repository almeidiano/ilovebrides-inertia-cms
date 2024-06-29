import React, { useRef, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PageInfo from '@/Components/PageInfo.jsx'
import ComponentsDashboard from '@/Components/ComponentsDashboard.jsx'

function Footer({data}) {
    const iframeRef = useRef(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true)

    const sendMessageToIframe = () => {
        const iframeWindow = iframeRef.current.contentWindow;
        iframeWindow.postMessage({ type: 'SET_MESSAGE', payload: 'Hello from Parent!' }, '*');
    };

    useEffect(() => {
        const receiveMessage = (event) => {
            if (event.data.type === 'SET_MESSAGE') {
                setMessage(event.data.payload);
            }
        };
        window.addEventListener('message', receiveMessage);

        return () => {
            window.removeEventListener('message', receiveMessage);
        };
    }, []);

    const FooterChildPage = () => {
        return (
            <div>
                <PageInfo title='Footer (rodapé)' description='Gerencie informações importantes do menu do rodapé que aparecerá em todas as páginas e módulos.' />

                {loading && <div className='flex justify-center'><CircularProgress/></div>}
                <iframe
                    onLoad={() => setLoading(false)}
                    ref={iframeRef}
                    src="http://localhost:8000/iframes/footer"
                    title="iframe"
                    style={{ width: '100%', height: '400px', border: '1px', marginTop: 10 }}
                />
            </div>
        )
    }

    return (
        // <div>
        //     <PageInfo title='Footer (rodapé)' description='Gerencie informações importantes do menu do rodapé que aparecerá em todas as páginas e módulos.' />
        //     {/*<button onClick={sendMessageToIframe}>Send Message to Iframe</button>*/}
        //     {/*<p>Message from Iframe: {message}</p>*/}
        //
        //     {loading && <div className='flex justify-center'><CircularProgress/></div>}
        //     <iframe
        //         onLoad={() => setLoading(false)}
        //         ref={iframeRef}
        //         src="http://localhost:8000/iframes/footer"
        //         title="iframe"
        //         style={{ width: '100%', height: '400px', border: '1px', marginTop: 10 }}
        //     />
        //
        // </div>
        <ComponentsDashboard type='footer' items={data} children={<FooterChildPage />} />
    );
}

export default Footer;




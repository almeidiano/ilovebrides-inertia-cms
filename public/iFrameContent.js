import React, { useState, useEffect } from 'react';

function IframeContent() {
    const [message, setMessage] = useState('Hello from iframe');

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== window.origin) {
                return;
            }
            setMessage(event.data);
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const sendMessageToParent = () => {
        window.parent.postMessage('Hello from iframe', window.origin);
    };

    return (
        <div>
            <h1>Iframe Content</h1>
            <p>Message from parent: {message}</p>
            <button onClick={sendMessageToParent}>Send Message to Parent</button>
        </div>
    );
}

export default IframeContent;

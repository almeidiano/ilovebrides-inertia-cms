import React, { useEffect, useState } from 'react';

function NavigationIframe() {
    const [navigationData, setNavigationData] = useState(null);

    // Lidar com mensagens da janela principal
    useEffect(() => {
        const receiveMessage = (event) => {
            if (event.data.type === 'UPDATE_NAVIGATION') {
                setNavigationData(event.data.payload);
            }
        };

        window.addEventListener('message', receiveMessage);

        // Solicitar dados de navegação ao carregar
        window.parent.postMessage({ type: 'REQUEST_NAVIGATION' }, '*');

        return () => {
            window.removeEventListener('message', receiveMessage);
        };
    }, []);

    return (
        <div>
            <div className="navbar bg-base-100 top-0 z-[100] relative shadow-md">
                <div className="navbar-start">
                    <div className={`drawer ${navigationData && navigationData.navigation.position === 'right' ? 'drawer-end' : ''}`}>
                        <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h7"/>
                                </svg>
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
                                {navigationData && navigationData.navigation.items.map((item, index) => (
                                    item.children.length > 0 ? (
                                        <li key={index}>
                                            <details>
                                                <summary>{item.text}</summary>
                                                <ul className="p-2 bg-base-100">
                                                    {item.children.map((child, idx) => (
                                                        <li key={idx}><a href={child.url}>{child.text}</a></li>
                                                    ))}
                                                </ul>
                                            </details>
                                        </li>
                                    ) : (
                                        <li key={index}><a href={item.url}>{item.text}</a></li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="navbar-center">
                    <img
                        src={navigationData && navigationData.logo ? navigationData.logo : ""}
                        alt="ILOVEBRIDES Logo"
                        width={150}
                        height={150}
                    />
                </div>
                <div className="navbar-end"></div>
            </div>
        </div>
    );
}

export default NavigationIframe;

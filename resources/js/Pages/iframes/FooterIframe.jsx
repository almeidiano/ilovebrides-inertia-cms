import React, {useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

function FooterIframe() {
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [hoveredItem, setHoveredItem] = useState(null);
    const [footerData, setFooterData] = useState(null);

    // Lidar com mensagens da janela principal
    useEffect(() => {
        const receiveMessage = (event) => {
            if (event.data.type === 'UPDATE_NAVIGATION') {
                setFooterData(event.data.payload);
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
        <footer className="footer p-10 bg-black text-neutral-content flex flex-col">
            <div>
                <img
                    src={footerData && footerData.logo}
                    className='w-[150px]'
                    alt="ILOVEBRIDES Logo"
                />
            </div>
            <div className="dropdown dropdown-top">
                <label tabIndex={0} className="font-bold text-md">{footerData && footerData.weddingDistricties.text}</label>
                <ul tabIndex={0}
                    className="z-50 h-[250px] overflow-auto bg-white divide-y divide-gray-100 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-100">
                    {footerData && footerData.weddingDistricties.children.map((item, index) => (
                        <li key={index}><a>{item.text}</a></li>
                    ))}
                </ul>
            </div>

            {/*navegação geral*/}
            <div className="flex justify-center w-full justify-between grid grid-cols-4 max-[850px]:grid-cols-2 gap-y-10">
                {footerData && footerData.navigation.map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <h3 className="text-lg mb-2">{item.text}</h3>
                        <div className="flex flex-col space-y-3">
                            {item.children.map((child, index) => (
                                <span key={index} className="link opacity-75 link-hover">{child.text}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between w-full items-center max-[850px]:flex-col items-start space-y-5">
                <div className="flex space-x-4">
                    {/* Social media links */}

                    {footerData && footerData.socialMedia.map((item, index) => (
                        <a className="flex items-center opacity-75 px-1" key={index}>
                            <img className="invert" alt="Social media icon" src={item.icon} height={13} width={13} />
                        </a>
                    ))}
                </div>
                <div className="flex space-x-4">
                    {/* Contact information */}
                </div>
            </div>

            <div className="flex justify-between w-full opacity-70 text-xs max-[530px]:flex-col">
                <div>{footerData && footerData.rights.text}</div>
                <div className="flex space-x-2">

                    {footerData && footerData.legal.map((item, index) => (
                        <span key={index}>{item.text}</span>
                    ))}

                </div>
            </div>
        </footer>
    );
}

export default FooterIframe;

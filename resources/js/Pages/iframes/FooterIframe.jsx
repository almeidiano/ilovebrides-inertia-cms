import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

function FooterIframe({ data }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
        { icon: <PrintIcon />, name: 'Print' },
        { icon: <ShareIcon />, name: 'Share' },
    ];

    const handleMouseEnter = (event, index) => {
        setAnchorEl(event.currentTarget);
        setHoveredItem(index);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
        setHoveredItem(null);
    };

    return (
        <footer className="footer p-10 bg-black text-neutral-content flex flex-col">
            <div>
                <img
                    src={data.logo}
                    className='w-[150px]'
                    alt="ILOVEBRIDES Logo"
                />
            </div>
            <div className="dropdown dropdown-top">
                <label tabIndex={0} className="font-bold text-md">Fornecedores por Distrito</label>
                <ul tabIndex={0}
                    className="z-50 h-[250px] overflow-auto bg-white divide-y divide-gray-100 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-100">
                    {data.weddingDistricties.map((item, index) => (
                        <li key={index}><a href={item.url}>{item.text}</a></li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-center w-full justify-between grid grid-cols-4 max-[850px]:grid-cols-2 gap-y-10">
                {data.navigation.map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <h3 className="text-lg mb-2">{item.text}</h3>
                        <div className="flex flex-col space-y-3">
                            {item.children.map((child, index) => (
                                <a key={index} href={child.url} className="link opacity-75 link-hover">{child.text}</a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between w-full items-center max-[850px]:flex-col items-start space-y-5">
                <div className="flex space-x-4">
                    {/* Social media links */}
                </div>
                <div className="flex space-x-4">
                    {/* Contact information */}
                </div>
            </div>

            <div className="flex justify-between w-full opacity-70 text-xs max-[530px]:flex-col">
                <div>{data.rights}</div>
                <div className="flex space-x-2">
                    {data.legal.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 relative"
                            onMouseEnter={(event) => handleMouseEnter(event, index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <a href={item.url}>{item.text}</a>
                            {hoveredItem === index && (
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMouseLeave}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    {actions.map((action) => (
                                        <MenuItem
                                            key={action.name}
                                            onClick={() => console.log(`${action.name} clicked for ${item.text}`)}
                                        >
                                            {action.icon}
                                            {action.name}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default FooterIframe;

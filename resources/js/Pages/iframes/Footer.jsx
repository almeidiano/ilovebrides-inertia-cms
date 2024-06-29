import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// function Footer() {
//     // const [message, setMessage] = useState('Hello from iframe');
//     //
//     // useEffect(() => {
//     //     const handleMessage = (event) => {
//     //         if (event.origin !== window.origin) {
//     //             return;
//     //         }
//     //         setMessage(event.data);
//     //     };
//     //
//     //     window.addEventListener('message', handleMessage);
//     //
//     //     return () => {
//     //         window.removeEventListener('message', handleMessage);
//     //     };
//     // }, []);
//     //
//     // const sendMessageToParent = () => {
//     //     window.parent.postMessage('Hello from iframe', window.origin);
//     // };
//     //
//     // return (
//     //     <div>
//     //         <h1>Iframe Content</h1>
//     //         <p>Message from parent: {message}</p>
//     //         <button onClick={sendMessageToParent}>Send Message to Parent</button>
//     //     </div>
//     // );
//     return (
//         // <div className="drawer">
//         //     <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
//         //     <div className="drawer-content">
//         //         {/* Page content here */}
//         //         <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
//         //     </div>
//         //     <div className="drawer-side">
//         //         <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
//         //         <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
//         //             {/* Sidebar content here */}
//         //             <li><a>Sidebar Item 1</a></li>
//         //             <li><a>Sidebar Item 2</a></li>
//         //         </ul>
//         //     </div>
//         // </div>
//         <>ei</>
//     )
// }

function Footer({data}) {
    const [message, setMessage] = useState('');

    const sendMessageToParent = () => {
        window.parent.postMessage({ type: 'SET_MESSAGE', payload: 'Hello from Iframe!' }, '*');
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

    return (
        // <div class>
        //     <h1>Iframe Content</h1>
        //     <button onClick={sendMessageToParent}>Send Message to Parent</button>
        //     <p>Message from Parent: {message}</p>
        // </div>

      <footer className="footer p-10 bg-black text-neutral-content flex flex-col">
        {
          data &&
            <>
                <div>
                    {/* <img
                    src={`http://localhost:8000/media/images/${footer.logo}`}
                  // src={`${process.env.NEXT_PUBLIC_DEPLOY_ROOT_URL}/uploads/images/main-logo-inverse.svg`}
                  height={150}
                  width={150}
                  alt="ILOVEBRIDES Logo"
                /> */}
                    <img
                        src={data.logo}
                        // src={`${process.env.NEXT_PUBLIC_DEPLOY_ROOT_URL}/uploads/images/main-logo-inverse.svg`}
                        className='w-[150px]'
                        alt="ILOVEBRIDES Logo"
                    />
                </div>
                <div className="dropdown dropdown-top">
                    <label tabIndex={0} className="font-bold text-md">Fornecedores por Distrito</label>
                    <ul tabIndex={0}
                        className="z-50 h-[250px] overflow-auto bg-white divide-y divide-gray-100 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-100">
                  {
                    data && data.weddingDistricties.map((item, index) => {
                      return <li key={index}><a href={item.url}>{item.text}</a></li>
                    })
                  }
                </ul>
              </div>
              <div className="flex justify-center w-full justify-between grid grid-cols-4 max-[850px]:grid-cols-2 gap-y-10">
                {
                  data && data.navigation.map((item, index) => {
                    return <div key={index} className="flex flex-col">
                      <h3 className="text-lg mb-2">{item.text}</h3>
                      <div className="flex flex-col space-y-3">
                        {
                          item.children.map((child, index) => {
                            return <a key={index} href={child.url} className="link opacity-75 link-hover">{child.text}</a>
                          })
                        }
                      </div>
                    </div>
                  })
                }
              </div>

              <div className="flex justify-between w-full items-center max-[850px]:flex-col items-start space-y-5">
                <div className="flex space-x-4">
                  {/*{*/}
                  {/*  data && data.socialMedia.map((item, index) => {*/}
                  {/*    return <a className="flex items-center opacity-75 px-1" key={index} target="_blank" href={item.url}> <Image className="invert" alt="Social media icon" src={item.icon} height={13} width={13} /> </a>*/}
                  {/*  })*/}
                  {/*}*/}
                </div>
                <div className="flex space-x-4">

                  {/*<div className="flex items-center">*/}
                  {/*  <PhoneIcon />*/}
                  {/*  /!* <FontAwesomeIcon height={20} width={20} icon={faPhone} /> *!/*/}
                  {/*  {data && data.phone}*/}
                  {/*</div>*/}

                  {/*<div className="flex items-center">*/}
                  {/*  <EmailIcon />*/}
                  {/*  /!* <FontAwesomeIcon height={20} width={20} icon={faEnvelope} /> *!/*/}
                  {/*  {data && data.email}*/}
                  {/*</div>*/}

                </div>
                {/* <div className="flex space-x-2">
                  <Image className="cursor-pointer" onClick={()=> {if (document) {document.getElementById('my_modal_google').showModal()}}} alt="GooglePlay Logo" src='/assets/images/GooglePlayBadge.png' width={130} height={20} />
                  <Image className="cursor-pointer" onClick={()=> {if (document) {document.getElementById('my_modal_apple').showModal()}}} alt="AppStore Logo" src='/assets/images/AppStoreBadge.png' width={120} height={20} />

                </div> */}
              </div>

              <div className="flex justify-between w-full opacity-70 text-xs max-[530px]:flex-col">
                {/* direitos reservados */}
                {/* <div>{footerJson.rights}</div> */}
                <div>© I LOVE BRIDES | ALL RIGHTS RESERVED</div>

                {/* politicas legais */}
                <div className="flex space-x-2">
                  {
                    data && data.legal.map((item, index) => {
                      return <a key={index} href={item.url}>{item.text}</a>
                    })
                  }
                </div>
              </div>
            </>
        }

      </footer>
    );
}

export default Footer;

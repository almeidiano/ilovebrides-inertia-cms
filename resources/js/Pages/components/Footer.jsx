import axios from 'axios'
import React from 'react'
import { router, usePage } from '@inertiajs/react'
import { useState, useEffect } from "react"
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from "@mui/material";

function footer({data}) {

  console.log(data)
  // const [footer, setFooter] = useState(data);
  const [loading, setLoading] = useState(true);

  const Footer = styled('div')(() => ({
    backgroundColor: 'black'
  }));

  return (
    <Footer>kk</Footer>
    // <footer className="footer p-10 bg-black text-neutral-content flex flex-col">
    //   {
    //     data && loading === false ?
    //       <>
    //         <div>
    //           {/* <img 
    //             src={`http://localhost:8000/media/images/${footer.logo}`}
    //             // src={`${process.env.NEXT_PUBLIC_DEPLOY_ROOT_URL}/uploads/images/main-logo-inverse.svg`}
    //             height={150}
    //             width={150}
    //             alt="ILOVEBRIDES Logo"
    //           /> */}
    //         </div>
    //         <div className="dropdown dropdown-top">
    //           <label tabIndex={0} className="font-bold text-md">Fornecedores por Distrito</label>
    //           <ul tabIndex={0} className="z-50 h-[250px] overflow-auto bg-white divide-y divide-gray-100 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-100">
    //             {
    //               footer && footer.weddingDistricties.map((item, index) => {
    //                 return <li key={index}><a href={item.url}>{item.text}</a></li>
    //               })
    //             }
    //           </ul>
    //         </div>
    //         <div className="flex justify-center w-full justify-between grid grid-cols-4 max-[850px]:grid-cols-2 gap-y-10">
    //           {
    //             footer && footer.navigation.map((item, index) => {
    //               return <div key={index} className="flex flex-col">
    //                 <h3 className="text-lg mb-2">{item.text}</h3> 
    //                 <div className="flex flex-col space-y-3">
    //                   {
    //                     item.children.map((child, index) => {
    //                       return <a key={index} href={child.url} className="link opacity-75 link-hover">{child.text}</a>
    //                     })
    //                   }
    //                 </div>
    //               </div>
    //             })
    //           }
    //         </div>

    //         <div className="flex justify-between w-full items-center max-[850px]:flex-col items-start space-y-5">
    //           <div className="flex space-x-4">
    //             {
    //               footer && footer.socialMedia.map((item, index) => {
    //                 return <a className="flex items-center opacity-75 px-1" key={index} target="_blank" href={item.url}> <Image className="invert" alt="Social media icon" src={item.icon} height={13} width={13} /> </a>
    //               })
    //             }
    //           </div>
    //           <div className="flex space-x-4">

    //             <div className="flex items-center">
    //               <PhoneIcon />
    //               {/* <FontAwesomeIcon height={20} width={20} icon={faPhone} /> */}
    //               {footer && footer.phone}
    //             </div>

    //             <div className="flex items-center">
    //               <EmailIcon />
    //               {/* <FontAwesomeIcon height={20} width={20} icon={faEnvelope} /> */}
    //               {footer && footer.email}
    //             </div>

    //           </div>
    //           {/* <div className="flex space-x-2">
    //             <Image className="cursor-pointer" onClick={()=> {if (document) {document.getElementById('my_modal_google').showModal()}}} alt="GooglePlay Logo" src='/assets/images/GooglePlayBadge.png' width={130} height={20} />
    //             <Image className="cursor-pointer" onClick={()=> {if (document) {document.getElementById('my_modal_apple').showModal()}}} alt="AppStore Logo" src='/assets/images/AppStoreBadge.png' width={120} height={20} />
                
    //           </div> */}
    //         </div>

    //         <div className="flex justify-between w-full opacity-70 text-xs max-[530px]:flex-col">
    //           {/* direitos reservados */}
    //           {/* <div>{footerJson.rights}</div> */}
    //           <div>© I LOVE BRIDES | ALL RIGHTS RESERVED</div>

    //           {/* politicas legais */}
    //           <div className="flex space-x-2">
    //             {
    //               footer && footer.legal.map((item, index) => {
    //                 return <a key={index} href={item.url}>{item.text}</a>
    //               })
    //             }
    //           </div>
    //         </div>
    //       </>
    //     :
    //     <Box sx={{display: 'flex', justifyContent: 'center'}}>
    //       <CircularProgress />        
    //     </Box>
    //   }

    // </footer>
  )
}

export default footer
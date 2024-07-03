import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
import { grey } from '@mui/material/colors';
import NavbarAndSidebar from '@/Components/NavbarAndSidebar';
import React from 'react';
import Version from '@/Components/Version';
import '../css/app.css';

// dashboards
import Dashboard from '@/Components/Dashboard';
import ComponentsDashboard from '@/Components/ComponentsDashboard';

// const currentTheme = createTheme({
//   palette: {
//     // primary: {
//     //   main: '#181A1B',
//     //   // dark: grey[100],
//     //   // contrastText: '#000'
//     // },
//     // secondary: {
//     //   main: grey[900],
//     // }
//     // secondary: {
//     //   main: '#FFF',
//     //   light: '#FFF8E1',
//     //   dark: '#F57C00',
//     //   contrastText: '#000'
//     // },
//     // background: {
//     //   default: '#303030',
//     //   paper: '#424242'
//     // },
//     // text: {
//     //   primary: '#FFF',
//     //   secondary: '#B0BEC5',
//     //   disabled: '#757575',
//     //   hint: '#B0BEC5'
//     // }
//   }
// });

// const AppWrapper = ({ children, currentRoute }) => {
//   // Define the routes where you don't want to show NavbarAndSidebar
//   const noNavRoutes = ['/login', '/components/footer'];

//   const showDashboard = !noNavRoutes.includes(currentRoute);

//   return (
//     <React.StrictMode>
//       {/* <ThemeProvider theme={currentTheme}> */}
//         <GlobalStyles styles={{ html: { backgroundColor: grey[50], overflow: 'hidden' } }} />
//         {showDashboard ? (
//           <Dashboard>
//             {children}
//           </Dashboard>
//         ) : (
//           children
//         )}
//       {/* </ThemeProvider> */}
//       <Version />
//     </React.StrictMode>
//   );
// };



createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    let page = pages[`./Pages/${name}.jsx`];
    // page.default.layout = name.startsWith('Login') || name.startsWith('components/') ? undefined : page => <Dashboard children={page} />;
    // page.default.layout = name.startsWith('iframes/') ? undefined : name.startsWith('components/') ? page => <ComponentsDashboard children={page} /> : page => <Dashboard children={page} />;
      page.default.layout = name.startsWith('iframes/') || name.startsWith('Login') ? undefined : page => <Dashboard children={page} />;

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      // <AppWrapper currentRoute={props.initialPage.url}>
        <div>
          <App {...props} />
          {/*<Version />*/}
        </div>
      // </AppWrapper>
    );
  },
});

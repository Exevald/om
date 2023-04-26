import React, { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';

import './index.scss';


import TitleScreen from './view/pages/TitleScreen/TitleScreen'
import Authentication from './view/pages/Authentication/Authentication'
import Onboarding from './view/pages/Onboarding/Onboarding';
import GroupsPage from './view/pages/Groups/Groups';


const App = () => {
    return (
        <React.StrictMode>
            <Authentication/>
        </React.StrictMode>
    )
}

ReactDOMClient.createRoot(document.getElementById('root') as Element).render(<App/>);
import React from 'react';
import ReactDOMClient from 'react-dom/client';

import './index.scss';


import TitleScreen from './view/pages/TitleScreen/TitleScreen'
import Authentication from './view/pages/Authentication/Authentication'


const App = () => {
    return (
        <Authentication/>
    )
}

ReactDOMClient.createRoot(document.getElementById('root') as Element).render(<App/>);
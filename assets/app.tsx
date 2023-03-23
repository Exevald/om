import React from 'react';
import ReactDOMClient from 'react-dom/client';

import './index.scss';


import TitleScreen from './view/pages/TitleScreen/TitleScreen'
import Authefication from './view/pages/Authefication/Authefication'


const App = () => {
    return (
        <TitleScreen/>
    )
}

ReactDOMClient.createRoot(document.getElementById('root') as Element).render(<Authefication/>);
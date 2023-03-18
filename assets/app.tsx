import React from 'react';
import ReactDOMClient from 'react-dom/client';

import './index.css';

import TitleScreen from './view/pages/TitleScreen/TitleScreen'
const App = () => {
    return (
        <TitleScreen/>
    )
}

ReactDOMClient.createRoot(document.getElementById('root') as Element).render(<App/>);
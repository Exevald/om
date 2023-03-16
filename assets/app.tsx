import './app.css';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import TitleScreen from "./view/pages/TitleScreen"

const App = () => {
    let colors = ['red', 'cyan', 'blue', 'green'];
    let items = colors.map(item =>
        <div key={item.toString()} style={{backgroundColor: item}}>
            <>Test {item}</>
        </div>
    );
    return(
        <div>
            <h2>Hello from: </h2>
            {items}
        </div>
    )
}

ReactDOMClient.createRoot(document.getElementById('root')).render(<App/>);
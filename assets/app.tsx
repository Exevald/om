/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    let colors = ['red', 'blue', 'green'];
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

ReactDOM.render(<App />, document.getElementById('root'));
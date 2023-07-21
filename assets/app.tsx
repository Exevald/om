import {createRoot} from "react-dom/client";
import React from "react";
import './index.css';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import store from "./core/store";
import TitleScreen from "./view/pages/TitleScreen/TitleScreen";
import Authentication from "./view/pages/Authentication/Authentication";


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/*<Provider store={store}>*/}
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<TitleScreen/>}/>
                    <Route path={'/login'} element={<Authentication/>}/>
                </Routes>
            </BrowserRouter>
        {/*</Provider>*/}
    </React.StrictMode>
)
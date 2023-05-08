import React from 'react';
import './TitleScreen.scss'
// @ts-ignore
import mainLogo from './OmMainLogo.svg';

import Button from './../../components/Button/Button'
import {createRoot} from "react-dom/client";
import {getLoginPageUrl} from "../../../api/pageUrls";


const MainLogo = () => {
    return (
        <img src={mainLogo}
            className='title__main-logo'
            alt='Om main logo'
        />
    )
}

const TitleScreen = () => {
    return (
        <div className='titleScreen__main-wrapper' id={"titleScreenRoot"}>

            <div className='titleScreen__logoBlock'>
                <MainLogo/>
                <h1>Электронный журнал</h1>
            </div>
            <div className='titleScreen__buttons'>
                <Button type='login' data='Войти' onClick={
                    () => {
                        window.location.href = getLoginPageUrl().replace("PATH", "login")
                    }
                }/>
                <Button type='register' data='Зарегистрироваться' onClick={
                    () => window.location.href = getLoginPageUrl().replace("PATH", "register")
                }/>
            </div>

        </div>
    )
}

function renderTitleScreen() {
    const root = createRoot(document.getElementById('root'))

    root.render(
        <React.StrictMode>
            <TitleScreen/>
        </React.StrictMode>
    )
}

export {TitleScreen, renderTitleScreen}
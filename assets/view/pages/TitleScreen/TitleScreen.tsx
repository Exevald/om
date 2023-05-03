import React from 'react';
import './TitleScreen.scss'

import Button from './../../components/Button/Button'
import {createRoot} from "react-dom/client";


const MainLogo = () => {
    return (
        <img src='./images/OmMainLogo.svg'
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
                <Button type='login' data='Войти'/>
                <Button type='register' data='Зарегистрироваться'/>
            </div>

        </div>
    )
}

const renderTitleScreen = (rootId: string) => {
    const rootElement = document.getElementById(rootId)
    const root = createRoot(rootElement)

    root.render(
        <TitleScreen/>
    )
}

export {TitleScreen, renderTitleScreen}
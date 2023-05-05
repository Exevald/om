import React from 'react';
import './TitleScreen.scss'
// @ts-ignore
import mainLogo from './OmMainLogo.svg';

import Button from './../../components/Button/Button'


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
        <div className='titleScreen__main-wrapper'>

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

export default TitleScreen;
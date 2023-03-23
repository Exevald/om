import React from 'react';
import './TitleScreen.scss'

import Button from './../../components/Button/Button'



const TitleScreen = () => {
    return (
        <div className='titleScreen__main-wrapper'>

            <div className='titleScreen__logoBlock'>
                <img src='./images/OmMainLogo.svg'
                    className='title__main-logo'
                    alt='Om main logo'
                />
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
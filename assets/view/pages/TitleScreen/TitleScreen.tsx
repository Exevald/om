import React from 'react';
import './TitleScreen.scss'


const LoginButton = () => {
    return (
        <div className='titleScreen__loginButton titleScreen__button'>
            <h4>Войти</h4>
        </div>
    )
}
const RegisterButton = () => {
    return (
        <div className='titleScreen__registerButton titleScreen__button'>
            <h4>Зарегестрироваться</h4>
        </div>
    )
}

const TitleScreen = () => {
    return (
        <div className='titleScreen__main-wrapper'>

            <div className='titleScreen__logoBlock'>
                <img src='./OmMainLogo.svg'
                    className='title__main-logo'
                    alt='Om main logo'
                />
                <h1>Электронный журнал</h1>
            </div>
            <div className='titleScreen__buttons'>
                <LoginButton/>
                <RegisterButton/>
            </div>

        </div>
    )
}

export default TitleScreen;
import React from 'react'
import './ErrorLogin.css'
import ErrorPng from '../../assets/Error.png'

const ErrorLogin = ({setErrorLogin}) => {

    setTimeout(() => {
        setErrorLogin(false)
    }, 2000);

    return (
        <div className='ErrorLogin'>
            <div className='errorLogin__container'>
                <img src={ErrorPng} alt="error" />
                <p>Datos incorrectos</p>
            </div>
        </div>
    )
}

export default ErrorLogin

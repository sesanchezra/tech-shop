import React, { useState } from 'react'
import '../Login/Login.css'
import Cart from '../../assets/Login.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye , faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {setUser} from '../../store/slices/user.slice'
import ErrorLogin from './ErrorLogin'
import TechLogo from '../../assets/TechLogo.png'
import TechLogoGrey from '../../assets/TechLogo-Grey.png'

const defaultValue = {
    email: '',
    password: ''
}


const Login = () => {

    const [isShow, setIsShow] = useState(false)

    const toggleShow = () => {
        setIsShow(!isShow)
    }

    //Funcion login

    const {handleSubmit,register,reset}=useForm()

    const dispatch = useDispatch()

    const navigate=useNavigate()

    const [errorLogin, setErrorLogin] = useState(false)

    const login = (data) =>{

        const user = {
            email: data.email,
            password: data.password
        }

        const URL=`https://ecommerce-api-react.herokuapp.com/api/v1/users/login`

        axios.post(URL,user)
            .then(res => {
                localStorage.setItem('token',res.data.data.token)
                dispatch(setUser(res.data.data.user))
                navigate('/home')
            })
            .catch (error => {
                console.log(error)
                setErrorLogin(true)

            })

        reset(defaultValue)

    }

    // Remember me

    const [remember, setRemember] = useState('active')

    
    const rememberToggle =() =>{
        if(remember === 'active'){
            window.onbeforeunload = function() {
                localStorage.removeItem('token');
                return '';
            };
            
            setRemember('inactive')
        }
        else{
            setRemember('active')
        }
    }
    
    

    return (
        <div className='Login'>
            <img src={TechLogoGrey} alt="" />
            {
                errorLogin && <ErrorLogin setErrorLogin={setErrorLogin}/>
            }
            <div className='login__img'>
                {/* <div className='background'></div> */}
                <img src={TechLogo} alt="cart" className='cart'/>
                <p>Tech Shop</p>
            </div>
            <form className='login__form' onSubmit={handleSubmit(login)}>
                <div className='login__form__text'>
                    <h2>Welcome Back !</h2>
                    <h4>Enter your email and password</h4>
                </div>
                <div className='login__form__input'>
                    <div className='email'>
                        <div className='icon'>
                            <FontAwesomeIcon icon={faEnvelope} className='email__icon' />
                        </div>

                        <div className='content'>
                            <label htmlFor="email">Email or username</label>
                            <input type="text" placeholder=' example@mail.com' {...register('email')}/>
                        </div>
                    </div>
                    <div className='password'>
                        <div className='icon'>
                            <FontAwesomeIcon icon={faKey} className='password__icon' />
                        </div>
                        <div className='content'>
                            <label htmlFor="email">Password</label>
                            <div className='content__input'>
                                <input
                                    type={
                                        isShow ?
                                            'text'
                                        :
                                            'password'
                                    }

                                    placeholder='password'

                                    {...register('password')}
                                />
                                <div className='show__password' onClick={()=>toggleShow()}>
                                    {
                                        isShow ?
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        :
                                            <FontAwesomeIcon icon={faEye} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='remember__container'>
                        <div className={`remember-${remember}`} onClick={rememberToggle}>
                            <div className={`round-${remember}`}></div>
                        </div>
                        <p>Remember me</p>
                    </div>
                    <button className='login__form__button'>
                        Login
                    </button>
                    <div className='sign__up'>
                        <p>Don't have an account?</p>
                        <a href="">Sign Up </a>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Login

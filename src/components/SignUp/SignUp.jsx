import React, { useEffect, useState } from 'react'
import LogoGrey from '../../assets/TechLogo-Grey.png'
import '../SignUp/SignUp.css'
import Logo from '../../assets/TechLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faKey, faPhone ,faEarthAmericas , faLocationDot, faEnvelope , faUser} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const defaultValue = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
}



const SignUp = () => {

    const [isShow, setIsShow] = useState(false)

    const toggleShow = () => {
        setIsShow(!isShow)
    }

    const navigate = useNavigate()

    const { handleSubmit, register, reset } = useForm()

    const submit = (data) => {

        const user = {
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
            password: data?.password,
            phone: data?.phone,
            role: "admin"
        }

        const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/users`

        axios.post(URL, user)
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            .catch(error => console.log(error))

            reset({
                name: '',
                email: '',
                password: ''
            })
    }

    return (
        <div className='SignUp'>
            <img src={LogoGrey} alt="Logo Grey" className='signup__logo__grey' />

            <div className='signup__img'>
                <img src={Logo} alt="Logo" className='logo' />
                <p>Tech Shop</p>
            </div>

            <form className='signup__form' onSubmit={handleSubmit(submit)}>
                <div className='signup__form__text'>
                    <h2>Sign Up!</h2>
                    <h4>Enter your credentials to continue</h4>
                </div>
                <div className='signup__form__input'>
                    <div className='register'>
                        <div className='icon'>
                            <FontAwesomeIcon icon={faUser} className='register__icon' />
                        </div>
                        <div className='content'>
                            <label htmlFor="name">First name</label>
                            <input type="text" placeholder='First name' {...register('firstName')} />
                        </div>
                    </div>
                    <div className='register'>
                        <div className='icon'>
                            <FontAwesomeIcon icon={faUser} className='register__icon' />
                        </div>
                        <div className='content'>
                            <label htmlFor="name">Last name</label>
                            <input type="text" placeholder='First name' {...register('lastName')} />
                        </div>
                    </div>
                    <div className='register'>
                        <div className='icon'>
                            <FontAwesomeIcon icon={faEnvelope} className='register__icon' />
                        </div>
                        <div className='content'>
                            <label htmlFor="email">Email</label>
                            <input type="text" placeholder='example@gmail.com' {...register('email')} />
                        </div>
                    </div>
                    <div className='register'>
                        <div className='icon'>
                            <FontAwesomeIcon icon={faPhone} className='register__icon' />
                        </div>
                        <div className='content'>
                            <label htmlFor="email">Phone</label>
                            <input type="text" placeholder='example@gmail.com' {...register('phone')} />
                        </div>
                    </div>

                    <div className='register'>
                        <div className='icon'>
                            <FontAwesomeIcon icon={faKey} className='register__icon' />
                        </div>
                        <div className='content'>
                            <label htmlFor="password">Password</label>
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
                                <div className='show__password' onClick={() => toggleShow()}>
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

                    <button className='signup__form__button'>
                        Sign Up
                    </button>
                    <div className='login'>
                        <p>Already have an account?</p>
                        <a onClick={() => navigate('/')} className='login__link'>Login</a>
                    </div>


                </div>
            </form>

        </div>
    )
}

export default SignUp

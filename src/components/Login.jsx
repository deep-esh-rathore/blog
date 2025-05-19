import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { set, useForm } from 'react-hook-form'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'



function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            await authservice.login(data.email, data.password)
            if (session) {
                const userData = await authservice.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)

        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 
                rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign in to your account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Dont have an account?
                    <Link to='/Signup'
                        className='font-medium text-primary transition-all duration-200
                        hover:underline'>
                        Sign up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className="space-y-5">
                        <Input
                            label='Email'
                            placeholder="Enter your email"
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchpatern: (value) => {
                                        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                                        return pattern.test(value) || "Please enter a valid email address"
                                    }
                                }
                            })}
                        />
                        <Input
                            label='Password'
                            placeholder="Enter your password"
                            type='password'
                            {...register('password', {
                                required: true })}
                        />
                        <button type='submit' className='w-full'>Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
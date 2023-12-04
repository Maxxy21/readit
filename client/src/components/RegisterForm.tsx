'use client'

import Link from "next/link";
import React, {FormEvent, useState} from "react";
import {useRouter} from 'next/navigation'


import InputGroup from "@/components/InputGroup";
import axiosInstance from "@/lib/axios";

const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [agreement, setAgreement] = useState(false)
    const [errors, setErrors] = useState<any>({})

    const router = useRouter()

    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!agreement) {
            setErrors({...errors, agreement: 'You must agree to T&Cs'})
            return
        }

        try {
            await axiosInstance.post('/auth/register', {
                email,
                password,
                username,
            })
            router.push('/login')

        } catch (err: any) {
            setErrors(err.response.data)
        }

    }

    return (
        <div className="flex bg-white">
            <div className="w-36 h-screen bg-cover bg-center" style={{backgroundImage: "url('/images/bricks.jpg')"}}>
            </div>
            <div className="flex flex-col justify-center pl-6">
                <div className="w-70">
                    <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
                    <p className="mb-10 text-xs">
                        By continuing, you agree to our User Agreement and Privacy Policy.
                    </p>
                    <form onSubmit={submitForm}>
                        <div className="mb-6">
                            <input
                                type="checkbox"
                                className="mr-1 cursor-pointer"
                                id="agreement"
                                checked={agreement}
                                onChange={e => setAgreement(e.target.checked)}
                            />
                            <label htmlFor="agreement" className="text-xs cursor-pointer">
                                I agree to get emails about cool stuff on Readit
                            </label>
                            <small className=" block font-medium text-red-600">{errors.agreement}</small>
                        </div>
                        <InputGroup
                            className="mb-2"
                            type="email"
                            placeholder="Email"
                            value={email}
                            error={errors.email}
                            setValue={setEmail}/>
                        <InputGroup
                            className="mb-2"
                            type="text"
                            placeholder="Username"
                            value={username}
                            error={errors.username}
                            setValue={setUsername}/>
                        <InputGroup
                            className="mb-2"
                            type="password"
                            placeholder="Password"
                            value={password}
                            error={errors.password}
                            setValue={setPassword}/>
                        <button
                            className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
                            Sign Up
                        </button>
                    </form>
                    <small>
                        Already a readitor?
                        <Link className="ml-1 text-blue-500 uppercase" href="/login">
                            Log In
                        </Link>
                    </small>
                </div>
            </div>
        </div>

    );
}

export default RegisterForm
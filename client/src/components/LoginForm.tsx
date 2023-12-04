'use client'

import Link from "next/link";
import React, {FormEvent, useState} from "react";
import {useRouter} from 'next/navigation'
import axiosInstance from "@/lib/axios";


import InputGroup from "@/components/InputGroup";
import Axios from "axios";

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<any>({})

    const router = useRouter()

    const submitForm = async (event: FormEvent) => {
        event.preventDefault()

        try {
            await axiosInstance.post('/auth/login', {
                username,
                password,
            })

            router.push('/')
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
                    <h1 className="mb-2 text-lg font-medium">Login</h1>
                    <p className="mb-10 text-xs">
                        By continuing, you agree to our User Agreement and Privacy Policy.
                    </p>
                    <form onSubmit={submitForm}>
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
                            Login
                        </button>
                    </form>
                    <small>
                        New to readit?
                        <Link className="ml-1 text-blue-500 uppercase" href="/client/src/components/RegisterForm">
                            Sign Up
                        </Link>
                    </small>
                </div>
            </div>
        </div>

    );
}

export default LoginPage;
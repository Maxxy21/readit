'use client'

import Link from "next/link";
import React, {FormEvent, useState} from "react";
import {useRouter} from 'next/navigation'


import InputGroup from "@/components/InputGroup";
import {signIn} from "next-auth/react";

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState("")

    const router = useRouter()

    const submitForm = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const res = await signIn('credentials', {
                username: username,
                password: password,
                redirect: false,

            })
            if (res?.error) {
                console.log(res.error)
                setErrors("Password or username is incorrect")
                return
            }
            router.push('/')
        } catch (err) {
            console.log(err)
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
                            setValue={setUsername}/>
                        <InputGroup
                            className="mb-2"
                            type="password"
                            placeholder="Password"
                            value={password}
                            error={errors}
                            setValue={setPassword}/>
                        <button
                            className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
                            Login
                        </button>
                    </form>
                    <small>
                        New to readit?
                        <Link className="ml-1 text-blue-500 uppercase" href="/register">
                            Sign Up
                        </Link>
                    </small>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;
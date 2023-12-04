'use client'

import {SessionProvider} from "next-auth/react";

interface NextAuthSessionProviderProps {
    children?: React.ReactNode

}

const AuthProvider = ({children}: NextAuthSessionProviderProps) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider
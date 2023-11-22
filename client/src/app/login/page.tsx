import {Metadata} from "next";
import LoginPage from "./login";


export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
}

const Login = () => {
    return (
        <>
            <LoginPage/>
        </>
    );
}

export default Login;
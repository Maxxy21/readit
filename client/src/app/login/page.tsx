import {Metadata} from "next";
import LoginForm from "../../components/LoginForm"


export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
}

const Login = () => {
    return (
        <>
            <LoginForm/>
        </>
    );
}

export default Login;
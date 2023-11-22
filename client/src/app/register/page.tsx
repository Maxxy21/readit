import {Metadata} from "next";
import RegisterPage from "./register";



export const metadata: Metadata = {
    title: 'Register',
    description: 'Register page',
}


const Register = () => {

    return (
        <>
            <RegisterPage/>
        </>

    );
}

export default Register;
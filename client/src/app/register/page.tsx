import {Metadata} from "next";
import RegisterPage from "../../components/RegisterForm";



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
import {Metadata} from "next";
import RegisterForm from "../../components/RegisterForm";



export const metadata: Metadata = {
    title: 'Register',
    description: 'Register page',
}


const Register = () => {

    return (
        <>
            <RegisterForm/>
        </>

    );
}

export default Register;
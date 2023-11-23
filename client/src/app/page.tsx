'use client'

import Navbar from "@/components/Navbar";
import {useRouter, usePathname} from "next/navigation";

const Home = () => {

    // const authRoutes = ['/register', '/login']
    // const authRoute = authRoutes.includes(usePathname())


    return (
        <>
            {/*{!authRoute && <Navbar/>}*/}
            <Navbar/>
        </>
    );
}

export default Home;
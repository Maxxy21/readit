import Link from "next/link";
import Images from "next/image";
import RedditLogo from "@/images/reddit.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useSession} from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession()

    return (
        <div className=" bg-white fixed inset-x-0 top-0 z-0 flex items-center justify-center h-12 px-5">
            <div className="flex items-center">
                <Link href={'/'}>
                    <Images
                        src={RedditLogo}
                        alt="Reddit Logo"
                        className="w-8 h-8 mr-2"/>
                </Link>
                <span className="text-2xl font-semibold">
                    <Link href={'/'}>readit</Link>
                </span>
            </div>
            <div className="flex items-center bg-gray-100 mx-auto border rounded hover:border-blue-500 hover:bg-white">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="pl-4 pr-3 text-gray-500"/>
                <input
                    type="text"
                    className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"
                    placeholder="Search"/>
            </div>
            <div className="flex">
                <Link className="w-32 py-1 mr-4 hollow blue button leading-5" href={'/login'}>
                    Login
                </Link>
                <Link className="w-32 py-1 blue button leading-5" href={'/register'}>
                    Sign Up
                </Link>
            </div>
        </div>
    )
}

export default Navbar;
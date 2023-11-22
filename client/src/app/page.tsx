import Images from "next/image";
import Link from "next/link";

import RedditLogo from '../images/reddit.svg'

const Home = () => {
    return (
        <div className=" bg-white fixed inset-x-0 top-0 z-0 flex items-center justify-center h-12">
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
            <div className="flex">

            </div>
        </div>
    );
}

export default Home;
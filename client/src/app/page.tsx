import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {Post} from "@/types";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";

dayjs.extend(relativeTime)


async function getPosts() {
    const res = await fetch('http://localhost:5000/api/posts', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',

    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Home = async () => {
    const posts: Post[] = await getPosts()

    return (
        <>
            {/*{!authRoute && <Navbar/>}*/}
            <Navbar/>
            <div className="pt-12">
                <div className="container pt-4">
                    {/*Posts feed*/}
                    <div className="w-160">
                        {posts.map(post => (
                            <PostCard post={post} key={post.identifier}/>
                        ))}

                    </div>
                    {/*Sidebar*/}
                    {/*Sidebar*/}
                    {/*Sidebar*/}
                </div>
            </div>
        </>
    );
}

export default Home;
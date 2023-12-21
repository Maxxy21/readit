"use client"

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {Post} from "@/types";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

dayjs.extend(relativeTime)


const Home = () => {

    const { data:posts } = useSWR<Post[]>(
        `/posts`,
        fetcher,
        {dedupingInterval: 10000}
    );

    return (
        <>
            {/*{!authRoute && <Navbar/>}*/}
            <Navbar/>
            <div className="pt-12">
                <div className="container pt-4">
                    {/*Posts feed*/}
                    <div className="w-160">
                        {posts?.map((post: Post) => (
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
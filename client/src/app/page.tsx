"use client"

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import React from "react";




import {Post, Sub} from "@/types";
import TopSubs from "@/components/TopSubs";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";

dayjs.extend(relativeTime)


const Home = () => {

    const {data: posts} = useSWR<Post[]>(
        `/posts`,
        fetcher,
        {dedupingInterval: 10000}
    );

    const {data: topSubs} = useSWR<Sub[]>('/misc/top-subs', fetcher)


    return (
        <>
            {/*{!authRoute && <Navbar/>}*/}
            <Navbar/>
            <div className="pt-12">
                <div className="container flex pt-4">
                    {/*Posts feed*/}
                    <div className="w-full px-4 md:w-160 md:p-0">
                        {posts?.map((post: Post) => (
                            <PostCard post={post} key={post.identifier}/>
                        ))}

                    </div>

                    {/*Sidebar*/}
                    <div className="ml-6 w-80">
                        <div className="bg-white-rounded">
                            <div className="p-4 border-b-2">
                                <p className="text-lg font-semibold text-center">Top Communities</p>
                            </div>
                            {/*TopSubs*/}
                            <div>
                                {topSubs?.map((sub: Sub) => (
                                    <TopSubs sub={sub} key={sub.name}/>
                                ))}
                            </div>
                            {/*{authenticated && (*/}
                            {/*    <div className="p-4 border-t-2">*/}
                            {/*        <Link href="/subs/create" className="w-full px-2 py-1 blue button">*/}
                            {/*            Create Community*/}
                            {/*        </Link>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
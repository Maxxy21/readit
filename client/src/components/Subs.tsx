"use client";

import {usePathname, useRouter} from "next/navigation";

import useSWR from "swr";
import {Sub} from "@/types";
import PostCard from "@/components/PostCard";
import fetcher from "@/lib/fetcher";
import Head from "next/head";
import Image from "next/image";


const Subs = () => {


    const router = useRouter()
    //get sub name from url
    const subName = usePathname().split('/')[2]

    const {data: sub, error} = useSWR<Sub>(subName ? `/subs/${subName}` : null, fetcher)

    if (error) {
        router.push('/')
    }

    let postsMarkup
    if (!sub) {
        postsMarkup = <p className="text-lg text-center">Loading..</p>
    } else if (sub.posts.length === 0) {
        postsMarkup = <p className="text-lg text-center">No posts submitted yet</p>
    } else {
        postsMarkup = sub.posts.map((post) => (
            <PostCard key={post.identifier} post={post}/>
        ))
    }

    return (

        <div className="pt-12">
            {sub && (
                <>
                    {/*Sub info and images*/}
                    <div>
                        {/*Banner image*/}
                        <div className="bg-blue-500">
                            {sub.bannerUrl ? (
                                <div
                                    className="h-56 bg-blue-500"
                                    style={{
                                        backgroundImage: `url(${sub.bannerUrl})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>
                            ) : (
                                <div className="h-20 bg-blue-500"></div>
                            )}
                        </div>
                        {/*Sub metadata*/}
                        <div className="h-20 bg-white">
                            <div className="container relative flex">
                                <div className="absolute" style={{top: -15}}>
                                    <Image
                                        src={sub.imageUrl}
                                        alt="Sub"
                                        width={70}
                                        height={70}
                                        className="w-20 h-20 rounded-full"
                                    />
                                </div>
                                <div className="pt-1 pl-24">
                                    <div className="flex items-center">
                                        <h1 className="mb-1 text-3xl font-bold">{sub.title}</h1>
                                    </div>
                                    <p className="text-sm font-bold text-gray-500">
                                        /r/{sub.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Post & Sidebar*/}
                    <div className="container flex pt-5">
                        <div className="w-160">
                            {postsMarkup}
                        </div>

                    </div>
                </>
            )}

        </div>
    )
}

export default Subs
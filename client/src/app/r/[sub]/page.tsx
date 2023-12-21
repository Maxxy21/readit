"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import useSWR from "swr";
import {Post, Sub} from "@/types";
import PostCard from "@/components/PostCard";
import fetcher from "@/lib/fetcher";
import {router} from "next/client";


const SubPage = () => {

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
            <div className="container flex pt-5">
                {sub && (
                    <div className="w-160">
                        {postsMarkup}
                    </div>
                )}
            </div>
        </div>)
}

export default SubPage
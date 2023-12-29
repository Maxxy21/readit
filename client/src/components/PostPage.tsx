'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import {Post} from "@/types";
import Sidebar from "@/components/Sidebar";

type Props = {
    params: { sub: string, identifier: string, slug: string };
};

const PostPage = ({params}: Props) => {
    const {identifier, slug, sub} = params;
    const router = useRouter();
    const {data: post, error} = useSWR<Post>((identifier && slug) ? `/posts/${identifier}/${slug}` : null, fetcher);

    if (error) router.push('/');

    if (!post) return 'loading...'

    return (
        <div className="pt-12">
            <Link href={`/r/${sub}`}>
                <>
                    <div className="flex items-center w-full h-20 p-8 bg-blue-500">
                        <div className="container flex">
                            {post && (
                                <div className="mr-2 w-8 h-8 overflow-hidden rounded-full">
                                    <Image
                                        src={post.sub.imageUrl}
                                        alt="Sub"
                                        width={8 * 16 / 4}
                                        height={8 * 16 / 4}
                                    />
                                </div>
                            )}
                            <p className="text-xl font-semibold text-white">
                                /r/{sub}
                            </p>
                        </div>
                    </div>
                </>
            </Link>
            <div className="container flex pt-5">
                {/*Post*/}
                <div className = "w-160">
                    <div className="bg-white rounded">
                        <div className = "flex">

                        </div>
                    </div>
                </div>
                {post && <Sidebar sub={post.sub}/>}
            </div>
        </div>
    );
};

export default PostPage;

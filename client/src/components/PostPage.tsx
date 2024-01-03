'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {revalidatePath} from 'next/cache'

dayjs.extend(relativeTime)

import fetcher from "@/lib/fetcher";
import {Post} from "@/types";
import Sidebar from "@/components/Sidebar";
import axiosInstance from "@/lib/axios";
import {useAuthState} from "@/context/auth";
import ActionButton from "@/components/ActionButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faMessage, faShare} from "@fortawesome/free-solid-svg-icons";


type Props = {
    params: { sub: string, identifier: string, slug: string };
};

const PostPage = ({params}: Props) => {

    const {authenticated} = useAuthState()


    const {identifier, slug, sub} = params;
    const router = useRouter();
    const {data: post, error} = useSWR<Post>((identifier && slug) ? `/posts/${identifier}/${slug}` : null, fetcher);


        if(error) router.push('/');

        if(!
    post
)
    return 'loading...'

    const vote = async (value: number) => {
        if (!authenticated) router.push('/login')

        if (value === post.userVote) value = 0;

        try {
            await axiosInstance.post('/misc/vote', {
                identifier,
                slug,
                value,
            })
        } catch (err: any) {
            throw err.response.data
        }


    }

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
                <div className="w-160">
                    <div className="bg-white rounded">
                        <div className="flex">
                            {/*Vote section*/}
                            <div className="w-10 py-3 text-center rounded-l">
                                {/*Upvote*/}
                                <div
                                    className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                                    onClick={() => vote(1)}>
                                    <i className={classNames('icon-arrow-up', {
                                        'text-red-500': post.userVote === 1
                                    })}/>
                                </div>
                                <p className="text-xs font-bold">{post.voteScore}</p>
                                {/*Downvote*/}
                                <div
                                    className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
                                    onClick={() => vote(-1)}>
                                    <i className={classNames('icon-arrow-down', {
                                        'text-blue-600': post.userVote === -1
                                    })}/>
                                </div>
                            </div>
                            {/*Post data section*/}
                            <div className="p-2">
                                <div className="flex items-center">
                                    <p className="text-xs text-gray-500">
                                        Posted by
                                        <Link href={`/r/${post.username}`} className="mx-1 hover:underline">
                                            /u/{post.username}
                                        </Link>
                                        <Link href={post.url} className="mx-1 hover:underline">
                                            {dayjs(post.createdAt).fromNow()}
                                        </Link>
                                    </p>
                                </div>
                                {/*Post title*/}
                                <h1 className="my-1 text-xl font-medium">{post.title}</h1>
                                {/*Post body*/}
                                <p className="my-3 text-sm">{post.body}</p>
                                {/*Actions*/}
                                <div className="flex">
                                    <Link href={post.url}>
                                        <ActionButton>
                                            <FontAwesomeIcon
                                                icon={faMessage}
                                                className="mr-1 text-gray-500"/>
                                            <span className="font-bold">{post.commentCount} Comments</span>
                                        </ActionButton>
                                    </Link>
                                    <ActionButton>
                                        <FontAwesomeIcon
                                            icon={faShare}
                                            className="mr-1"/>
                                        <span className="font-bold">Share</span>
                                    </ActionButton>
                                    <ActionButton>
                                        <FontAwesomeIcon
                                            icon={faBookmark}
                                            className="mr-1"/>
                                        <span className="font-bold">Save</span>
                                    </ActionButton>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {post && <Sidebar sub={post.sub}/>}
            </div>
        </div>
    );
    }
;

export default PostPage;

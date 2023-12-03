'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faMessage, faShare} from "@fortawesome/free-solid-svg-icons";
import relativeTime from "dayjs/plugin/relativeTime";
import classNames from "classnames";

import {Post} from "@/types";
import ActionButton from "@/components/ActionButton";

dayjs.extend(relativeTime)


interface PostCardProps {
    post: Post

}

const PostCard = ({post: {identifier, voteScore, slug, title, body, subName, createdAt, userVote, commentCount, url, username}}: PostCardProps) => {

    const vote = async (value: number) => {
        const res = await fetch('http://localhost:5000/api/misc/vote', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({identifier: identifier, slug: slug, value: value})
        })
        if (!res.ok) {
            throw new Error('Failed to post data')
        }

        console.log(res.json())

    }


    return (
        <div key={identifier} className="flex mb-4 bg-white rounded">
            {/*Vote section*/}
            <div className="w-10 py-3 text-center bg-gray-200 rounded-l">
                {/*Upvote*/}
                <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                     onClick={() => vote(1)}>
                    <i className={classNames('icon-arrow-up', {
                        'text-red-500': userVote === 1
                    })}/>
                </div>
                <p className="text-xs font-bold">{voteScore}</p>
                {/*Downvote*/}
                <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
                     onClick={() => vote(-1)}>
                    <i className={classNames('icon-arrow-down', {
                        'text-blue-600': userVote === -1
                    })}/>
                </div>
            </div>
            {/*Post data section*/}
            <div className="w-full p-2">
                <div className="flex items-center">
                    <Link href={`/r/${subName}`}>
                        <Image
                            src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                            className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                            alt="gravatar"
                            width={6}
                            height={6}

                        />

                    </Link>
                    <Link href={`/r/${subName}`}
                          className="text-xs font-bold cursor-pointer hover:underline">
                        /r/{subName}
                    </Link>
                    <p className="text-xs text-gray-500">
                        <span className="mx-1">•</span>
                        Posted by
                        <Link href={`/r/${username}`} className="mx-1 hover:underline">
                            /u/{username}
                        </Link>
                        <Link href={url} className="mx-1 hover:underline">
                            {dayjs(createdAt).fromNow()}
                        </Link>
                    </p>
                </div>
                {/*Post title*/}
                <Link href={url} className="my-1 text-lg font-medium">
                    {title}
                </Link>
                {/*Post body*/}
                {body && <p className="my-1 text-sm">{body}</p>}
                {/*Actions*/}
                <div className="flex">
                    <Link href={url}>
                        <ActionButton>
                            <FontAwesomeIcon
                                icon={faMessage}
                                className="mr-1 text-gray-500"/>
                            <span className="font-bold">{commentCount} Comments</span>
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
    )
}

export default PostCard;
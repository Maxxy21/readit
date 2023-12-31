"use client";
import React, {createRef, useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import useSWR from "swr";
import classNames from "classnames";

import {Sub} from "@/types";
import PostCard from "@/components/PostCard";
import fetcher from "@/lib/fetcher";
import {useAuthState} from "@/context/auth";


import Image from "next/image";
import axiosInstance from "@/lib/axios";
import Sidebar from "@/components/Sidebar";


const Subs = () => {
    const [ownsSub, setOwnsSub] = React.useState(false)
    const {authenticated, user} = useAuthState()

    const router = useRouter()
    const fileInputRef = createRef<HTMLInputElement>()
    //get sub name from url
    const subName = usePathname().split('/')[2]

    const {data: sub, error, revalidate} = useSWR<Sub>(subName ? `/subs/${subName}` : null, fetcher)

    useEffect(() => {
        if (!sub) return
        setOwnsSub(authenticated && user?.username === sub.username)
    }, [sub])

    const openFileInput = (type: string) => {
        if (!ownsSub) return
        fileInputRef.current.name = type
        fileInputRef.current.click()
    }

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0]

        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', fileInputRef.current.name)

        try {
            await axiosInstance.post<Sub>(`/subs/${sub.name}/image`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            })

            revalidate()
        } catch (err) {
            console.log(err)
        }

    }

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
                    <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage}/>
                    {/*Sub info and images*/}
                    <div>
                        {/*Banner image*/}
                        <div
                            className={classNames("bg-blue-500", {"cursor-pointer": ownsSub})}
                            onClick={() => openFileInput('banner')}
                        >
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
                                        width={80}
                                        height={80}
                                        className={classNames("rounded-full", {"cursor-pointer": ownsSub})}
                                        onClick={() => openFileInput('image')}
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
                    {/*Post & TopSubs*/}
                    <div className="container flex pt-5">
                        <div className="w-160">
                            {postsMarkup}
                        </div>
                        <Sidebar sub={sub}/>
                    </div>
                </>
            )}

        </div>
    )
}

export default Subs


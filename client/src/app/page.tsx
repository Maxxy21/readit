import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {Post} from "@/types";
import Navbar from "@/components/Navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage, faBookmark, faShare} from "@fortawesome/free-solid-svg-icons";

dayjs.extend(relativeTime)


async function getPosts() {
    const res = await fetch('http://localhost:5000/api/posts', {
        method: 'GET',

    })
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Home = async () => {
    const posts: Post[] = await getPosts()
    // const [posts, setPosts] = useState<Post[]>([])
    //
    // // useEffect(() => {
    // //     fetch('http://localhost:5000/api/posts', {
    // //         method: 'GET',
    // //     })
    // //         .then(res => res.json()) // Convert the response to JSON
    // //         .then(data => setPosts(data)) // Assuming the JSON object is the array of posts
    // //         .catch(err => console.log(err))
    // //
    // //
    // // }, [])
    //
    // setPosts(data)


    return (
        <>
            {/*{!authRoute && <Navbar/>}*/}
            <Navbar/>
            <div className="pt-12">
                <div className="container pt-4">
                    {/*Posts feed*/}
                    <div className="w-160">
                        {posts.map(post => (
                            <div key={post.identifier} className="flex mb-4 bg-white rounded">
                                {/*Vote section*/}
                                <div className="w-10 text-center bg-gray-200 rounded-l">
                                    <p>V</p>
                                </div>
                                {/*Post data section*/}
                                <div className="w-full p-2">
                                    <div className="flex items-center">
                                        <Link href={`/r/${post.subName}`}>
                                            <Image
                                                src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                                                className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                                                alt="gravatar"
                                                width={6}
                                                height={6}

                                            />

                                        </Link>
                                        <Link href={`/r/${post.subName}`}
                                              className="text-xs font-bold cursor-pointer hover:underline">
                                            /r/{post.subName}
                                        </Link>
                                        <p className="text-xs text-gray-500">
                                            <span className="mx-1">•</span>
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
                                    <Link href={post.url} className="my-1 text-lg font-medium">
                                        {post.title}
                                    </Link>
                                    {/*Post body*/}
                                    {post.body && <p className="my-1 text-sm">{post.body}</p>}
                                    {/*Actions*/}
                                    <div className="flex">
                                        <Link href={post.url}>
                                            <div
                                                className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                                                <FontAwesomeIcon
                                                    icon={faMessage}
                                                    className="mr-1 text-gray-500"/>
                                                <span className="font-bold">{"20"} Comments</span>
                                            </div>
                                        </Link>
                                        <div
                                            className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                                            <FontAwesomeIcon
                                                icon={faShare}
                                                className="mr-1"/>
                                            <span className="font-bold">Share</span>
                                        </div>
                                        <div
                                            className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                                            <FontAwesomeIcon
                                                icon={faBookmark}
                                                className="mr-1"/>
                                            <span className="font-bold">Save</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import axiosInstance from "@/lib/axios";
import {Post} from "@/types";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";

dayjs.extend(relativeTime)


async function getPosts() {
    try {
        const res = await axiosInstance.get('/posts')
        return res.data
    } catch (err) {
        console.log(err)
    }

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
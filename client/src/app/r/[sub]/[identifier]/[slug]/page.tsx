import React from 'react';
import {Metadata} from "next";
import axiosInstance from "@/lib/axios";

import PostPage from "@/components/PostPage";
import {Post} from "@/types";

type Props = {
    params: { sub: string, identifier: string, slug: string };
};

const Page = ({params}: Props) => {
    return (
        <>
            <PostPage params={params}/>
        </>
    );
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const { identifier, slug } = params;

    try {
        const response = await axiosInstance.get(`/posts/${identifier}/${slug}`);
        const post: Post = response.data; // Now expecting a single Post object

        if (post && post.title) {
            return {
                title: post.title,
            };
        } else {
            return {
                title: "Post not found",
            };
        }
    } catch (error) {
        console.error("Error fetching post data:", error);
        return {
            title: "Error loading post title",
        };
    }
};

export default Page;

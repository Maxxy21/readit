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

    const response = await axiosInstance.get(`/posts/${identifier}/${slug}`);
    const post: Post = response.data;

    return {
        title: post.title,
    };
};

export default Page;

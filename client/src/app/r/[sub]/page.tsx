import React from 'react';

import {Metadata} from 'next';

import Subs from "@/components/Subs";
import axiosInstance from "@/lib/axios";

type Props = {
    params: { sub: string };
};

const Page = () => {
    return (
        <Subs/>
    );
};


export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const subName = params.sub;
    const sub = await axiosInstance.get(`/subs/${subName}`).then(res => res.data);

    return {
        title: sub?.title,
    };
}


export default Page;
import React from 'react';
import {Sub} from "@/types";
import Link from "next/link";
import Image from "next/image";

const TopSubs = ({sub}: { sub: Sub }) => {
    return (
        <div key={sub.name} className="flex items-center px-4 py-2 text-xs border-b">
            <Link href={`/r/${sub.name}`}>
                <Image
                    src={sub.imageUrl}
                    className="rounded-full cursor-pointer"
                    alt="Sub"
                    width={(6 * 16) / 4}
                    height={(6 * 16) / 4}
                />
            </Link>
            <Link href={`/r/${sub.name}`} className="ml-2 font-bold hover:cursor-pointer">
                /r/{sub.name}
            </Link>
            <p className="ml-auto font-med">{sub.postCount}</p>
        </div>


    );
};

export default TopSubs;
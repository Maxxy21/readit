"use client";

import React from 'react';
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-10 mb-5 text-5xl text-gray-700">404</h1>
            <h2 className="mb-5 text-2xl text-gray-700">Page not found</h2>
            <p className="mb-5 text-gray-600">Sorry, we couldn't find this page.</p>

            <Link href="/" className="px-4 py-1 blue button">
                Go home
            </Link>
        </div>
    );
};

export default NotFound;
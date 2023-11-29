export interface Post {
    identifier: string;
    title: string;
    slug: string;
    body?: string;
    username: string;
    subName: string;
    createdAt: string;
    updatedAt: string;
    // Virtual fields
    url: string;
}


export interface Author {
    name: string;
    image: string;
}

export interface Slug {
    current: string;
}

export interface Post {
    _id: string;
    _createdAt: string;
    title: string;
    description: string;
    slug: Slug
    author: Author;
    mainImage: {
        assets: {
            url: string;
        }
    }
    post?: any;
    comment?: any
}
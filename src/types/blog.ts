export interface Author {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    bio?: any[];
    image?: {
        asset: {
            _id: string;
            url: string;
        };
    };
}

export interface Category {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    description?: string;
    group?: string;
}

export interface BlogPost {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    publishedAt: string;
    excerpt?: string;
    mainImage?: {
        asset: {
            _id: string;
            url: string;
        };
        alt?: string;
    };
    body?: any[];
    categories: Category[];
    author: Author;
}
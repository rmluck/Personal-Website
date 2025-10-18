import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { BlogPost, Category } from "@/types/blog";
import BlogPageClient from "@/components/BlogPage";

export default async function BlogPage() {
    const [postsData, categoriesData] = await Promise.all([
        sanityFetch({ query: POSTS_QUERY }),
        sanityFetch({ query: CATEGORIES_QUERY }),
    ]);

    const posts = (postsData as { data: BlogPost[] }).data || [];
    const categories = (categoriesData as { data: Category[] }).data || [];

    return <BlogPageClient posts={posts} categories={categories} />;
}
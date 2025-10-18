import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_BY_CATEGORY_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { BlogPost, Category } from "@/types/blog";
import { notFound } from "next/navigation";
import CategoryPageClient from "@/components/BlogCategoryPage";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogCategoryPage({ params } : CategoryPageProps) {
    const { data: categories } = await sanityFetch({
        query: CATEGORIES_QUERY,
    }) as { data: Category[] };

    const category = categories?.find(cat => cat.slug.current === params.slug);

    if (!category) {
        notFound();
    }

    const { data: posts } = await sanityFetch({
        query: POSTS_BY_CATEGORY_QUERY,
        params: { categoryId: category._id },
    }) as { data: BlogPost[] };

    return (
        <CategoryPageClient 
            posts={posts || []}
            categories={categories || []}
            category={category}
        />
    );
}
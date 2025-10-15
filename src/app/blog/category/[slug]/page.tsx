import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_BY_CATEGORY_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { BlogPost, Category } from "@/types/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";

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

    const groupedCategories = categories?.reduce((acc, category) => {
        const group = category.group || "general";
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(category);
        return acc;
    }, {} as Record<string, Category[]>);

    const groupOrder = ["general", "sports", "entertainment", "lifestyle", "technology"];
    const groupTitles = {
        "sports": "Sports",
        "technology": "Technology",
        "lifestyle": "Lifestyle",
        "entertainment": "Entertainment",
        "general": "General"
    };

    const navItems = [
        ...groupOrder.map((groupKey) => {
            const groupCategories = groupedCategories?.[groupKey];

            if (!groupCategories || groupCategories.length === 0) {
                return null;
            }

            return {
                label: groupTitles[groupKey as keyof typeof groupTitles] || groupKey,
                href: "/blog",
                dropdown: groupCategories.map(category => ({
                    label: category.title,
                    href: `/blog/category/${category.slug.current}`,
                }))
            };
        }).filter(Boolean)
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar items={navItems} />

            <div className="fixed top-7 left-3 z-40 hidden lg:flex">
                <Link
                    href="/blog"
                    className="flex items-center justify-center w-10 h-10 bg-pro200/80 dark:bg-pro800/80 backdrop-blur-xl rounded-full shadow-lg border border-pro300/30 dark:border-pro800/30 hover:bg-accent/30 hover:border-accent transition-all duration-200 cursor-hover cursor-none clickable group"
                    title="Back to all posts"                
                >
                    <ArrowLeftCircle className="w-5 h-5 text-pro800 dark:text-pro300 group-hover:text-accent group-hover:-translate-x-1 transition-all duration-200" />
                </Link>
            </div>

            <main className="flex-1">
                <section className="px-6 sm:px-12 pt-16 pb-8 mx-12">
                    <div className="ml-1 mt-3 mb-4 lg:hidden">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-pro700 dark:text-pro300 hover:text-accent transition-colors duration-200 text-sm font-text cursor-hover cursor-none clickable"
                        >
                            <ArrowLeftCircle className="w-4 h-4" />
                            <span className="relative bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-300 hover:text-accent cursor-hover cursor-none">Back to all posts</span>
                        </Link>
                    </div>

                    <div className="mb-10 mt-10">
                        <h1 className="text-5xl text-pro900 dark:text-pro200 font-heading font-bold whitespace-nowrap text-center">
                            {category.title.toUpperCase()}
                        </h1>
                        {category.description && (
                            <p className="text-center text-pro800 dark:text-pro300 mt-4 max-w-2xl mx-auto font-text text-sm">
                                {category.description}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        {/* <div className="text-md font-regular text-pro900 dark:text-pro200 mb-6">
                            <Link
                                href="/blog"
                                className="relative bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-300 hover:text-accent hover:font-bold cursor-hover cursor-none clickable"
                            >
                                &larr; Back to all posts
                            </Link>
                        </div> */}

                        {/* Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts?.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>

                        {posts?.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-pro600 dark:text-pro400">No posts found in this category.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <section className="mt-0">
                <Footer />
            </section>
        </div>
    )
}
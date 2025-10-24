"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import BlogSearch from "@/components/BlogSearch";
import { ArrowLeftCircle } from "lucide-react";
import { BlogPost, Category } from "@/types/blog";
import { useSearchPosts } from "@/hooks/useSearchPosts";

interface CategoryPageClientProps {
    posts: BlogPost[];
    categories: Category[];
    category: Category;
}

export default function CategoryPageClient(
    { posts, categories, category } : CategoryPageClientProps
) {
    // Search functionality
    const { searchTerm, setSearchTerm, filteredPosts, resultsCount, totalCount } = useSearchPosts(posts);

    // Group categories for navbar
    const groupedCategories = categories?.reduce((acc, category) => {
        const group = category.group || "general";
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(category);
        return acc;
    }, {} as Record<string, Category[]>);

    // Navbar items
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
        }).filter((item): item is NonNullable<typeof item> => item != null)
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar items={navItems} />

            {/* Back to all posts button */}
            <div className="fixed top-7 left-3 z-40 hidden lg:flex">
                <Link
                    href="/blog"
                    className={`
                        flex items-center justify-center
                        w-10 h-10
                        bg-pro200/80 dark:bg-pro800/80
                        border border-pro300/30 dark:border-pro800/30
                        backdrop-blur-xl rounded-full shadow-lg
                        transition-all duration-200
                        hover:bg-accent/30 hover:border-accent
                        cursor-hover cursor-none clickable
                        group
                    `}
                    title="Back to all posts"
                >
                    <ArrowLeftCircle
                        className={`
                            w-5 h-5
                            text-pro800 dark:text-pro300
                            transition-all duration-200
                            group-hover:-translate-x-1
                            group-hover:text-accent
                        `}
                    />
                </Link>
            </div>

            <main className="flex-1">
                <section className="px-6 sm:px-12 pt-24 pb-8 mx-12">
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
                        {/* Search Bar */}
                        <div className="mb-8 max-w-2xl mx-auto">
                            <BlogSearch 
                                onSearch={setSearchTerm}
                                placeholder={`Search in ${category.title}...`}
                            />
                            {searchTerm && (
                                <div className="mt-3 text-center">
                                    <p className="text-sm text-pro600 dark:text-pro400">
                                        {resultsCount === 0
                                            ? `No posts found in ${category.title} for "${searchTerm}"`
                                            : `${resultsCount} of ${totalCount} posts found in ${category.title} for "${searchTerm}"`}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts?.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>

                        {filteredPosts?.length === 0 && searchTerm && (
                            <div className="text-center py-12">
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="text-pro800 dark:text-pro300 font-text border border-pro400 dark:border-pro800 text-md px-4 py-2 rounded-lg hover:bg-accent/30 hover:text-accent hover:font-bold hover:border-accent duration-200 transition cursor-hover cursor-none clickable"
                                >
                                    Clear search and show all {category.title} posts
                                </button>
                            </div>
                        )}

                        {posts?.length === 0 && !searchTerm && (
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
    );
}
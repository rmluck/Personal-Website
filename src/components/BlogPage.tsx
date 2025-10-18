"use client";

import { BlogPost, Category } from "@/types/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import BlogSearch from "@/components/BlogSearch";
import { useSearchPosts } from "@/hooks/useSearchPosts";

interface BlogPageClientProps {
    posts: BlogPost[];
    categories: Category[];
}

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
    const { searchTerm, setSearchTerm, filteredPosts, resultsCount, totalCount } = useSearchPosts(posts);

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

            <main className="flex-1">
                <section className="px-6 sm:px-12 pt-16 pb-8 ml-12 mr-12">
                    <div className="mb-10 mt-10">
                        <h2 className="text-5xl text-pro900 dark:text-pro200 font-heading font-bold whitespace-nowrap text-center">
                            BLOG
                        </h2>
                    </div>

                    <div className="w-full">
                        {/* Search Bar */}
                        <div className="mb-8 max-w-2xl mx-auto">
                            <BlogSearch 
                                onSearch={setSearchTerm}
                                placeholder="Search blog posts..."
                            />
                            {searchTerm && (
                                <div className="mt-3 text-center">
                                    <p className="text-sm text-pro600 dark:text-pro400">
                                        {resultsCount === 0 
                                            ? `No posts found for "${searchTerm}"`
                                            : `${resultsCount} of ${totalCount} posts found for "${searchTerm}"`
                                        }
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
                                    Clear search and show all posts
                                </button>
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
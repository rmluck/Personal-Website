import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { BlogPost, Category } from "@/types/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default async function BlogPage() {
    const { data: posts } = await sanityFetch({
        query: POSTS_QUERY,
    }) as { data: BlogPost[] };

    const { data: categories } = await sanityFetch({
        query: CATEGORIES_QUERY,
    }) as { data: Category[] };

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
                        {/* Categories Filter */}
                        {/* <div className="mb-8"> */}
                            {/* <Link
                                href="/blog"
                                className="inline-block px-4 py-2 mb-4 text-pro800 dark:text-pro300 font-text border border-pro300 dark:border-pro800 text-[14px] rounded-lg hover:bg-accent/30 hover:text-accent hover:font-bold hover:border-accent duration-200 transition cursor-hover cursor-none clickable"
                            >
                                All Posts
                            </Link> */}
                            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                                {groupOrder.map((groupKey) => {
                                    const groupCategories = groupedCategories?.[groupKey];

                                    if (!groupCategories || groupCategories.length === 0) {
                                        return null;
                                    }

                                    return (
                                        <div key={groupKey} className="space-y-3">
                                            <h3 className="text-sm font-semibold text-pro800 dark:text-pro300 uppercase tracking-wide">
                                                {groupTitles[groupKey as keyof typeof groupTitles] || groupKey}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 items-center">
                                                {groupCategories.map((category) => (
                                                    <Link
                                                        key={category._id}
                                                        href={`/blog/category/${category.slug.current}`}
                                                        className="text-pro800 dark:text-pro300 font-text border border-pro300 dark:border-pro800 text-[12px] px-3 py-1 rounded-lg hover:bg-accent/30 hover:text-accent hover:font-bold hover:border-accent duration-200 transition cursor-hover cursor-none clickable"
                                                    >
                                                        {category.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div> */}

                        {/* Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts?.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <section className="mt-0">
                <Footer />
            </section>
        </div>
    )
}
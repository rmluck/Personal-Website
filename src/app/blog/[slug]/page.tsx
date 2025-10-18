import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { BlogPost, Category } from "@/types/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";
import { ArrowLeftCircle } from "lucide-react";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
    params: { slug: string };
}

export default async function BlogPostPage({ params } : BlogPostPageProps) {
    const { data: post } = await sanityFetch({
        query: POST_QUERY,
        params: { slug: params.slug },
    }) as { data: BlogPost };

    if (!post) {
        notFound();
    }

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
                <article className="max-w-4xl mx-12 lg:mx-auto px-6 sm:px-12 pt-28 pb-8">
                    <div className="ml-1 mt-3 mb-4 lg:hidden">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-pro700 dark:text-pro300 hover:text-accent transition-colors duration-200 text-sm font-text cursor-hover cursor-none clickable"
                        >
                            <ArrowLeftCircle className="w-4 h-4" />
                            <span className="relative bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-300 hover:text-accent cursor-hover cursor-none">Back to all posts</span>
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories?.map((category) => (
                                <Link key={category._id} href={`/blog/category/${category.slug.current}`} className="font-text border text-[12px] px-3 py-1 rounded-lg bg-accent/30 text-accent font-bold border-accent duration-200 transition cursor-hover cursor-none">
                                    {category.title}
                                </Link>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl text-pro900 dark:text-pro200 font-heading font-bold mb-8">{post.title}</h1>

                        {/* Featured Image */}
                        {post.mainImage && (
                            <div className="mb-6">
                                <Image 
                                    src={urlFor(post.mainImage.asset).width(800).height(400).url()}
                                    alt={post.mainImage.alt || post.title}
                                    width={800}
                                    height={400}
                                    className="w-full rounded-lg shadow-lg"
                                />
                                <p className="mt-2 text-xs text-pro800 dark:text-pro300 font-text">{post.mainImage.alt}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-pro800 dark:text-pro300 font-regular mb-8">
                            <div className="flex items-center gap-2">
                                {post.author.image && (
                                    <Image 
                                        src={urlFor(post.author.image.asset).width(32).height(32).url()}
                                        alt={post.author.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                )}
                                <span>By {post.author.name}</span>
                            </div>
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                    </header>

                    <div className="border-t border-pro300 dark:border-pro800 my-8" />

                    {/* Content */}
                    {post.body && (
                        <div className="prose prose-lg dark:prose-invert max-w-none text-pro800 dark:text-pro300 font-regular text-sm">
                            <PortableText value={post.body} components={portableTextComponents} />
                        </div>
                    )}
                </article>
            </main>

            <section className="mt-0">
                <Footer />
            </section>
        </div>
    );
}
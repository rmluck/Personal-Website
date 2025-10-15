import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { BlogPost } from "@/types/blog";

interface PostCardProps {
    post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Link
            href={`/blog/${post.slug.current}`}
            className="group cursor-hover cursor-none clickable"
        >
            <article className="hover:scale-105 transition-transform duration-300">
                {post.mainImage && (
                    <Image 
                        src={urlFor(post.mainImage).width(400).height(200).url()}
                        alt={post.mainImage.alt || post.title}
                        width={400}
                        height={200}
                        className="w-full h-48 rounded-t-md object-cover cursor-hover cursor-none clickable"
                    />
                )}
                <div className="p-6 flex flex-col justify-center bg-pro200/80 dark:bg-pro800/50 rounded-b-md shadow-sm">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories?.map((category) => (
                            <span
                                key={category._id}
                                className="text-accent font-text border border-accent text-[10px] px-2 py-1 rounded-md bg-accent/30 font-bold duration-200 transition cursor-hover cursor-none"
                            >
                                {category.title}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-xl font-bold font-heading text-pro900 dark:text-pro200 mb-2">
                        <span className="relative bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 group-hover:text-accent cursor-hover cursor-none">
                            {post.title}
                        </span>
                    </h2>

                    {post.excerpt && (
                        <p className="text-pro800 dark:text-pro300 mb-4 line-clamp-3 font-text text-xs">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-pro800 dark:text-pro300 font-regular">
                        <div className="flex items-center gap-2">
                            {/* {post.author.image && (
                                <Image 
                                    src={urlFor(post.author.image).width(32).height(32).url()}
                                    alt={post.author.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            )} */}
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
                </div>
            </article>
        </Link>
    );
}
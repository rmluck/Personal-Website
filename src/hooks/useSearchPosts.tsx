"use client";

import { useState, useMemo } from "react";
import { BlogPost } from "@/types/blog";

export function useSearchPosts(posts: BlogPost[]) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPosts = useMemo(() => {
        if (!searchTerm.trim()) {
            return posts;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();

        return posts.filter(post => {
            if (post.title.toLowerCase().includes(lowerSearchTerm)) {
                return true;
            }

            if (post.excerpt?.toLowerCase().includes(lowerSearchTerm)) {
                return true;
            }

            if (post.categories.some(category => 
                category.title.toLowerCase().includes(lowerSearchTerm)
            )) {
                return true;
            }

            if (post.author.name.toLowerCase().includes(lowerSearchTerm)) {
                return true;
            }

            return false;
        });
    }, [posts, searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        filteredPosts,
        resultsCount: filteredPosts.length,
        totalCount: posts.length,
    };
}
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    onSearch: (term: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search posts", className = "" }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        onSearch(term);
    };

    const clearSearch = () => {
        setSearchTerm("");
        onSearch("");
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pro600 dark:text-pro400" />
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-3 bg-pro200/80 dark:bg-pro800/80 border border-pro400 dark:border-pro700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-pro900 dark:text-pro200 placeholder-pro600 dark:placeholder-pro400 cursor-hover cursor-none"
                />
                {searchTerm && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pro600 dark:text-pro400 hover:text-accent transition-colors cursor-hover cursor-none"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
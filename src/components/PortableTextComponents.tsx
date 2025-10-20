import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import PowerRankings from "./PowerRankings";
import GamePicks from "./GamePicks";

export const portableTextComponents: PortableTextComponents = {
    types: {
        rankings: ({ value }) => <PowerRankings data={value} />,
        gamePicks: ({ value }) => <GamePicks data={value} />,
        image: ({ value }) => (
            <div className="my-8">
                <Image 
                    src={urlFor(value.asset).width(800).url()}
                    alt={value.alt || ""}
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg"
                />
                {value.caption && (
                    <p className="text-sm text-pro600 dark:text-pro400">{value.caption}</p>
                )}
            </div>
        ),
        codeBlock: ({ value }) => (
            <pre className="bg-pro300 dark:bg-pro700 p-4 rounded-lg overflow-x-auto my-6">
                <code className={`language-${value.language || "text"}`}>{value.code}</code>
            </pre>
        ),
    },
    marks: {
        highlight: ({ children }) => (
            <mark className="bg-accent/50 px-1 rounded text-pro800 dark:text-pro300 font-regular text-sm">{children}</mark>
        ),
        sup: ({ children }) => (
            <sup className="text-xs">{children}</sup>
        ),
        sub: ({ children }) => (
            <sub className="text-xs">{children}</sub>
        ),
        link: ({ value, children }) => (
            <a
                href={value.href}
                target={value.blank ? "_blank" : "_self"}
                rel={value.blank ? "noopener noreferrer" : undefined}
                className="hover:underline text-accent transition"
            >
                {children}
            </a>
        ),
    },
    block: {
        h1: ({ children }) => (
            <h1 className="text-4xl font-bold mb-4 mt-8">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-3xl font-bold mb-3 mt-6">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-2xl font-bold mb-2 mt-4">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-xl font-bold mb-2 mt-4">{children}</h4>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-pro500 pl-4 italic my-6">{children}</blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
        ),
    },
};
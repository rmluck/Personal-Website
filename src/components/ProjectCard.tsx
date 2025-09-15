import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

type ProjectCardProps = {
    title: string;
    description: string;
    image: string;
    tags: string[];
    links: { label: string; url: string; icon?: JSX.Element }[];
};

export default function ProjectCard({
    title,
    description,
    image,
    tags,
    links,
} : ProjectCardProps) {
    return (
        <div className="bg-light-pbg rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
            {/* Project Image */}
            <div className="relative w-full h-48">
                <Image src={image} alt={title} fill className="object-cover" />
            </div>

            {/* Project Details */}
            <div className="flex flex-col flex-grow p-4">
                <h3 className="font-regular text-xl font-semibold text-light-ptxt mb-2">{title}</h3>
                <p className="text-light-stxt flex-grow font-text">{description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag) => (
                        <span key={tag} className="bg-border/50 text-light-stxt text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-border/70 transition">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-4">
                    {links.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                            {link.icon ? link.icon : <ExternalLink className="h-4 w-4" />}
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
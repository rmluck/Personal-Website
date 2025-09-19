import Image from "next/image";
import { ExternalLink } from "lucide-react";

type ProjectCardProps = {
    title: string;
    type: string;
    description: string;
    image: string;
    tags: string[];
    links: { label: string; url: string; icon?: React.ReactNode }[];
    side: "left" | "right";
};

export default function ProjectCard({
    title,
    type,
    description,
    image,
    tags,
    links,
    side,
} : ProjectCardProps) {
    return (
        <li className={`relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8 ${side === "left" ? "lg:flex-row-reverse" : ""}`}>
            {/* Project Content */}
            <div className={`lg:w-1/2 flex flex-col justify-center order-2 lg:order-1 ${side === "left" ? "text-right" : "text-left"}`}>
                <p className="text-sm text-accent font-text tracking-wider mb-2">
                    {type}
                </p>
                <h3 className="text-2xl font-heading font-bold text-pro900 mb-4">
                    <a
                        href={links[0]?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                    >
                        {title}
                    </a>
                </h3>

                <div className={`relative z-10 bg-pro200/80 rounded-sm p-4 shadow-sm mb-4 ${side === "left" ? "lg:-ml-20" : "lg:-mr-20"} backdrop-blur-md`}>
                    <p className="text-pro800 font-text text-sm">{description}</p>
                </div>

                <ul className={`flex flex-wrap gap-4 text-xs text-pro700 font-text mb-4 ${side === "left" ? "justify-end" : "justify-start"}`}>
                    {tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>

                <div className={`flex items-center gap-4 ${side === "left" ? "justify-end" : "justify-start"}`}>
                    {links.map((link) => (
                        <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="inline-block text-pro600 hover:text-accent transform hover:-translate-y-1 transition-all duration-200"
                        >
                        {link.icon ? link.icon : <ExternalLink className="h-5 w-5" />}
                        </a>
                    ))}
                </div>
            </div>

            {/* Project Image */}
            <div className="lg:w-1/2 relative order-1 lg:order-2 group">
                <a
                    href={links[0]?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-md">
                        <Image 
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                        />
                    </div>
                </a>
                <div className="absolute inset-0 rounded-lg bg-accent opacity-60 mix-blend-color transition-opacity duration-500 ease-out group-hover:opacity-0"></div>
            </div>
        </li>
        // <div className="bg-light-pbg rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
        //     {/* Project Image */}
        //     <div className="relative w-full h-48">
        //         <Image src={image} alt={title} fill className="object-cover" />
        //     </div>

        //     {/* Project Details */}
        //     <div className="flex flex-col flex-grow p-4">
        //         <h3 className="font-regular text-xl font-semibold text-light-ptxt mb-2">{title}</h3>
        //         <p className="text-light-stxt flex-grow font-text">{description}</p>

        //         {/* Tags */}
        //         <div className="flex flex-wrap gap-2 mt-3">
        //             {tags.map((tag) => (
        //                 <span key={tag} className="bg-border/50 text-light-stxt text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-border/70 transition">
        //                     {tag}
        //                 </span>
        //             ))}
        //         </div>

        //         {/* Links */}
        //         <div className="flex gap-4 mt-4">
        //             {links.map((link) => (
        //                 <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
        //                     {link.icon ? link.icon : <ExternalLink className="h-4 w-4" />}
        //                     {link.label}
        //                 </a>
        //             ))}
        //         </div>
        //     </div>
        // </div>
    );
}
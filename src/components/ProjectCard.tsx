import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Github, ExternalLink, Notebook, Presentation, Video } from "lucide-react";

type ProjectCardProps = {
    name: string;
    type: string;
    brief: string;
    description: string;
    start_date: string;
    end_date: string;
    image: string;
    skills: {
        languages: string[];
        frameworks: string[];
        tools: string[];
        domains: string[];
        soft_skills: string[];
    }
    links: { label: string; url: string; }[];
    side: "left" | "right";
};

export default function ProjectCard({
    name,
    type,
    brief,
    description,
    start_date,
    end_date,
    image,
    skills,
    links,
    side,
} : ProjectCardProps) {
    function getIcon(label: string) {
        switch (label) {
            case "GitHub":
                return <Github className="h-5 w-5" />;
            case "Report":
                return <Notebook className="h-5 w-5" />;
            case "Presentation":
                return <Presentation className="h-5 w-5" />;
            case "Demo Videos":
                return <Video className="h-5 w-5" />;
            default:
                return <ExternalLink className="h-5 w-5" />;
        }
    }

    return (
        <li className={`relative flex flex-col items-center lg:items-stretch gap-8 ${side === "left" ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
            {/* Project Content */}
            <div className={`lg:w-1/2 flex flex-col justify-center order-2 lg:order-1 ${side === "left" ? "text-right" : "text-left"}`}>
                <p className="text-sm text-accent font-text tracking-wider mb-2">
                    {type}
                </p>
                <h3 className="text-2xl font-heading font-bold text-pro900 dark:text-pro200 mb-1">
                    <a
                        href={links[0]?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        // className="hover:text-accent transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full cursor-hover cursor-none"
                        className="relative bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-300 hover:text-accent cursor-hover cursor-none"
                    >
                        {name}
                    </a>
                </h3>
                {(start_date || end_date) && (start_date != end_date && (
                    <span className="text-sm font-regular text-pro800 dark:text-pro300 mb-3">
                        {start_date} - {end_date}
                    </span>
                )) || (start_date == end_date && (
                    <span className="text-sm font-regular text-pro800 dark:text-pro300 mb-3">
                        {start_date}
                    </span>
                ))}

                <div className={`relative z-10 bg-pro200/80 dark:bg-pro800/50 rounded-sm p-4 shadow-sm mb-4 text-pro800 dark:text-pro300 font-text text-sm ${side === "left" ? "lg:-ml-20" : "lg:-mr-20"} backdrop-blur-md`}>
                    <ReactMarkdown
                        components={{
                            a: ({ node, ...props }) => (
                                <a 
                                    {...props}
                                    // className="inline-flex text-pro900 dark:text-pro200 font-semibold relative transition-all hover:text-accent after:absolute after:left-0 after:-bottom-0.25 after:h-[1px] after:w-0 after:bg-accent after:transition-all hover:after:w-full cursor-hover cursor-none"
                                    className="text-pro900 dark:text-pro200 font-semibold relative bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-300 hover:text-accent cursor-hover cursor-none"
                                >
                                    {props.children}
                                </a>
                            )
                        }}
                    >
                        {brief}
                    </ReactMarkdown>
                </div>

                <div className={`flex flex-wrap gap-2 mb-5 ${side === "left" ? "justify-end" : "justify-start"}`}>
                    {Object.values(skills).flat().map((skill, i) => {
                        return (
                            <div key={`skill-${i}`} className="flex flex-wrap gap-2 items-center">
                                <span className="text-pro800 dark:text-pro300 font-text border border-pro300 dark:border-pro800 text-[10px] px-2 py-1 rounded-md hover:bg-accent/30 hover:text-accent hover:font-bold hover:border-accent duration-200 transition cursor-hover cursor-none clickable">{skill}</span>
                            </div>
                        );
                    })}
                </div>

                <div className={`flex items-center gap-4 ${side === "left" ? "justify-end" : "justify-start"}`}>
                    {links.map((link, i) => (
                        <a
                            key={`link-${i}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="inline-block text-pro600 dark:text-pro400 hover:text-accent transform hover:-translate-y-1 transition-all duration-200 cursor-hover cursor-none"
                        >
                            {getIcon(link.label)}
                        </a>
                    ))}
                </div>
            </div>

            {/* Project Image */}
            <div className="w-full lg:w-1/2 relative order-1 lg:order-2 group cursor-hover cursor-none clickable">
                <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-md">
                    <Image 
                        src={image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500 ease-out opacity-50 group-hover:opacity-100 saturate-0 group-hover:saturate-100"
                    />
                </div>
                <div className="absolute w-full h-64 lg:h-80 inset-0 rounded-lg shadow-md bg-accent opacity-50 mix-blend-color transition duration-500 ease-out group-hover:opacity-0"></div>
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
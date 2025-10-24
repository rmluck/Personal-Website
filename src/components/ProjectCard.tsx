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
    start_date,
    end_date,
    image,
    skills,
    links,
    side,
} : ProjectCardProps) {
    // Function to get the appropriate icon based on the link label
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
        <li
            className={`
                relative flex flex-col gap-8
                items-center lg:items-stretch
                ${side === "left" ? "lg:flex-row-reverse" : "lg:flex-row"}
            `}
        >
            {/* Project Details */}
            <div
                className={`
                    flex flex-col justify-center
                    order-2 lg:order-1 lg:w-1/2
                    ${side === "left" ? "text-right" : "text-left"}
                `}
            >
                {/* Project Type */}
                <p className="mb-2 text-sm text-accent font-text tracking-wider">
                    {type}
                </p>

                {/* Project Name */}
                <h3 className="mb-1 text-2xl text-pro900 dark:text-pro200 font-heading font-bold">
                    <a
                        href={links[0]?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            relative
                            bg-gradient-to-r from-accent to-accent
                            bg-[length:0%_2px] bg-left-bottom bg-no-repeat
                            transition-all duration-300
                            hover:bg-[length:100%_2px] hover:text-accent 
                            cursor-hover cursor-none
                        `}
                    >
                        {name}
                    </a>
                </h3>

                {/* Project Dates */}
                {(start_date || end_date) && (start_date != end_date && (
                    <span className="text-sm font-regular text-pro800 dark:text-pro300 mb-3">
                        {start_date} - {end_date}
                    </span>
                )) || (start_date == end_date && (
                    <span className="text-sm font-regular text-pro800 dark:text-pro300 mb-3">
                        {start_date}
                    </span>
                ))}

                {/* Project Brief */}
                <div
                    className={`
                        relative p-4 mb-4 z-10
                        bg-pro200/80 dark:bg-pro800/50
                        backdrop-blur-md
                        text-sm font-text
                        text-pro800 dark:text-pro300
                        rounded-sm shadow-sm
                        ${side === "left" ? "lg:-ml-20" : "lg:-mr-20"}
                    `}
                >
                    <ReactMarkdown
                        components={{
                            a: ({ node, ...props }) => (
                                <a 
                                    {...props}
                                    className={`
                                        relative
                                        text-pro900 dark:text-pro200 font-semibold 
                                        bg-gradient-to-r from-accent to-accent
                                        bg-[length:0%_2px] bg-left-bottom bg-no-repeat
                                        transition-all duration-300
                                        hover:bg-[length:100%_2px] hover:text-accent 
                                        cursor-hover cursor-none
                                    `}
                                >
                                    {props.children}
                                </a>
                            )
                        }}
                    >
                        {brief}
                    </ReactMarkdown>
                </div>

                {/* Skills */}
                <div
                    className={`
                        flex flex-wrap gap-2 mb-5
                        ${side === "left" ? "justify-end" : "justify-start"}
                    `}
                >
                    {Object.values(skills).flat().map((skill, i) => {
                        return (
                            <div
                                key={`skill-${i}`}
                                className="flex flex-wrap gap-2 items-center"
                            >
                                <span className={`
                                    px-2 py-1
                                    text-[10px] font-text
                                    text-pro800 dark:text-pro300
                                    border border-pro300 dark:border-pro800
                                    rounded-md
                                    transition duration-200
                                    hover:bg-accent/30 hover:border-accent
                                    hover:text-accent hover:font-bold
                                    cursor-hover cursor-none clickable
                                `}>
                                    {skill}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Links */}
                <div
                    className={`
                        flex items-center gap-4
                        ${side === "left" ? "justify-end" : "justify-start"}
                    `}
                >
                    {links.map((link, i) => (
                        <a
                            key={`link-${i}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className={`
                                inline-block text-pro600 dark:text-pro400
                                transition-all transform duration-200
                                hover:text-accent hover:-translate-y-1
                                cursor-hover cursor-none
                            `}
                        >
                            {getIcon(link.label)}
                        </a>
                    ))}
                </div>
            </div>

            {/* Project Image */}
            <div
                className={`
                    relative order-1 lg:order-2
                    w-full lg:w-1/2
                    cursor-hover cursor-none clickable
                    group
                `}
            >
                <div className="relative w-full h-64 lg:h-80 rounded-lg shadow-md overflow-hidden">
                    <Image 
                        src={image}
                        alt={name}
                        fill
                        className={`
                            object-cover
                            opacity-50 saturate-0
                            transition duration-500 ease-out
                            group-hover:scale-105
                            group-hover:opacity-100
                            group-hover:saturate-100
                        `}
                    />
                </div>

                {/* Overlay Effect */}
                <div className={`
                    absolute inset-0
                    w-full h-64 lg:h-80
                    bg-accent
                    rounded-lg shadow-md
                    opacity-50 mix-blend-color
                    transition duration-500 ease-out
                    group-hover:opacity-0
                `}></div>
            </div>
        </li>
    );
}
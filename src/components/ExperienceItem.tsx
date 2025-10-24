"use client";

import Image from "next/image";
import { useState } from "react";

type ExperienceItemProps = {
    company: string;
    role: string;
    start_date: string;
    end_date: string;
    description: string[];
    logo: string;
    link: string;
};

export default function ExperienceItem({
    company,
    role,
    start_date,
    end_date,
    description,
    logo,
    link,
} : ExperienceItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="relative flex items-start group/job">
            {/* Company Logo */}
            <div className="group/logo">
                <div
                    className={`
                        flex flex-shrink-0
                        items-center justify-center
                        relative w-20 h-20
                        bg-pro200
                        sm:border-3 sm:border-accent
                        rounded-full shadow-md
                        transition-all duration-500
                        overflow-hidden
                        group-hover:bg-pro100 dark:group-hover:bg-pro900
                        cursor-hover cursor-none
                    `}
                >
                    <Image
                        src={logo}
                        alt={company}
                        width={125}
                        height={125}
                        className={`
                            object-cover scale-105
                            sm:opacity-50 sm:saturate-0
                            transition duration-500 
                            group-hover/logo:scale-110
                            group-hover/logo:opacity-100
                            group-hover/job:saturate-100
                        `}
                    />

                    {/* Overlay on hover */}
                    <div className={`
                        absolute inset-0
                        sm:bg-accent rounded-lg
                        opacity-70 mix-blend-color
                        transition-opacity duration-500 ease-out
                        group-hover/job:opacity-0
                    `}></div>
                </div>
            </div>

            {/* Job Details */}
            <div
                className={`
                    flex flex-col p-4 ml-8
                    w-full min-w-60
                    border border-pro800 dark:border-pro300
                    rounded-md shadow-md
                    transition-all duration-500
                    whitespace-normal
                `}
                onClick={toggleExpanded}
            >
                {/* Role and Company */}
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg text-pro900 dark:text-pro200 font-regular font-semibold flex-1 min-w-0">
                        <span className="block sm:inline">{role}</span>

                        <span className="block sm:inline text-pro800 dark:text-pro300">
                            &nbsp;@&nbsp;
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`
                                    relative
                                    transition-colors
                                    hover:text-accent
                                    after:absolute after:left-0 after:-bottom-0.5
                                    after:h-[2px] after:w-0
                                    after:bg-accent
                                    after:transition-all
                                    hover:after:w-full
                                    cursor-hover cursor-none
                                `}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {company}
                            </a>
                        </span>
                    </h3>

                    <div className="sm:hidden text-pro600 dark:text-pro400">
                        <svg
                            className={`
                                w-5 h-5
                                transition-transform duration-300
                                ${isExpanded ? "rotate-180" : ""}
                            `}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Dates */}
                <span className="text-sm text-pro800 dark:text-pro300 font-regular font-normal">
                    {start_date} - {end_date}
                </span>

                {/* Job Description */}
                <ul
                    className={`
                        text-xs text-pro700 dark:text-pro400 font-text
                        space-y-1 leading-relaxed
                        transition-all duration-500
                        ${isExpanded
                            ? "max-h-120 opacity-100 mt-2 overflow-scroll"
                            : "max-h-0 opacity-0"
                        }

                        sm:max-h-0 sm:opacity-0
                        sm:group-hover/job:mt-2
                        sm:group-hover/job:max-h-120
                        sm:group-hover/job:opacity-100
                    `}
                >
                    {description.map((item, i) => (
                        <li key={i} className="notes-item relative pl-4">{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
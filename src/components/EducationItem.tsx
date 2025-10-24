"use client";

import Image from "next/image";
import { useState } from "react";

type NestedDetails = string[] | { [key: string]: NestedDetails };

type EducationItemProps = {
    school: string;
    degree?: string;
    specialization?: string;
    start_date?: number;
    end_date?: number;
    gpa?: number;
    details?: Record<string, NestedDetails | undefined>;
    logo?: string;
    link?: string;
};

export default function EducationItem({
    school,
    degree,
    specialization,
    start_date,
    end_date,
    gpa,
    details = {},
    logo,
    link,
} : EducationItemProps) {
    // Filter out undefined detail keys
    const detailKeys = Object.keys(details).filter(key => details[key] !== undefined);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<string>(detailKeys[0] || "");

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    }

    // Recursive function to render nested details
    function renderDetails(content: NestedDetails) {
        if (Array.isArray(content)) {
            return (
                <ul className="text-pro700 dark:text-pro400 font-text text-xs space-y-1">
                    {content.map((item, i) => (
                        <li key={i} className="bullet-list-item">{item}</li>
                    ))}
                </ul>
            );
        }
        
        return Object.entries(content).map(([subheading, items], i) => (
            <div key={i} className="mb-4">
                <h4 className="text-pro900 dark:text-pro200 font-semibold text-sm mb-1">{subheading}</h4>
                {renderDetails(items)}
            </div>
        ));
    }

    return (
        <div
            className={`
                relative p-6 w-full
                border border-pro800 dark:border-pro300
                rounded-md shadow-md
                transition-all duration-500
                group/school
            `}
            onClick={toggleExpanded}
        >
            {detailKeys.length > 0 && (
                <div className="sm:hidden absolute top-6 right-6 text-pro600 dark:text-pro400">
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
            )}

            {/* School Information */}
            <div className="flex items-center gap-6 pr-8">
                {/* School Logo */}
                {logo && (
                    <div className="group/logo">
                        <div
                            className={`
                                flex flex-shrink-0
                                items-center justify-center
                                relative w-20 h-20 sm:w-30 sm:h-30
                                sm:border-3 sm:border-accent
                                rounded-full shadow-md
                                overflow-hidden
                                transition-colors duration-500
                                cursor-hover cursor-none clickable
                            `}
                        >
                            <Image 
                                src={logo}
                                alt={`${school} logo`}
                                width={120}
                                height={120}
                                className={`
                                    object-cover
                                    sm:opacity-50 sm:saturate-0
                                    transition duration-500
                                    group-hover/logo:scale-105
                                    group-hover/logo:opacity-100
                                    group-hover/school:saturate-100
                                `}
                            />

                            {/* Accent Overlay */}
                            <div
                                className={`
                                    absolute inset-0
                                    sm:bg-accent opacity-70
                                    rounded-lg mix-blend-color
                                    transition-opacity duration-500 ease-out
                                    group-hover/school:opacity-0
                                `}
                            ></div>
                        </div>
                    </div>
                )}

                {/* School Details */}
                <div className="flex-1 min-w-0">
                    {/* School Name */}
                    <h3 className="text-xl sm:text-2xl text-pro900 dark:text-pro200 font-regular font-bold">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                relative transition-colors
                                hover:text-accent
                                after:absolute after:left-0 after:-bottom-0.5
                                after:h-[2px] after:w-0 hover:after:w-full
                                after:bg-accent after:transition-all
                                cursor-hover cursor-none
                            `}
                        >
                            {school}
                        </a>
                    </h3>

                    {/* Degree */}
                    {degree &&
                        <p
                            className={`
                                text-sm sm:text-lg text-pro800 dark:text-pro300
                                font-regular font-bold
                            `}
                        >
                            {degree} {specialization && ` - ${specialization}`}
                        </p>
                    }

                    {/* Dates */}
                    {(start_date || end_date) && (
                        <span className="text-xs sm:text-sm text-pro800 dark:text-pro300 font-regular">
                            {start_date} - {end_date}
                        </span>
                    )}

                    {/* GPA */}
                    {gpa &&
                        <p className="text-xs sm:text-sm text-pro700 dark:text-pro400 font-regular">
                            GPA: {gpa}
                        </p>
                    }
                </div>
            </div>

            {/* School Details */}
            <div
                className={`
                    transition-all duration-500

                    ${isExpanded
                        ? "max-h-120 opacity-100 mt-8"
                        : "max-h-0 opacity-0"
                    }

                    sm:max-h-0
                    sm:opacity-0
                    sm:group-hover/school:mt-8
                    sm:group-hover/school:max-h-120
                    sm:group-hover/school:opacity-100
                `}
            >
                {detailKeys.length > 0 && (
                    <>
                        {/* Simple Stacked Content */}
                        <div className="block sm:hidden space-y-6 max-h-90 overflow-scroll">
                            {detailKeys.map((key) => (
                                <div key={key}>
                                    <h4 className="text-lg text-pro900 dark:text-pro200 font-semibold mb-3 border-pro300 dark:border-pro700 pb-2">
                                        {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                    </h4>

                                    <div className="pl-2">
                                        {renderDetails(details[key]!)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tabbed Interface */}
                        <div className="hidden sm:flex flex-col md:flex-row gap-6 max-h-120 overflow-scroll">
                            {/* Tab Buttons */}
                            <div className="flex md:flex-col relative">
                                <div 
                                    className={`
                                        absolute left-0 w-0.75
                                        bg-accent
                                        transition-all duration-300
                                    `}
                                    style={{
                                        top: `${detailKeys.indexOf(activeTab) * 2.25}rem`,
                                        height: "2.25rem",
                                    }}
                                />
                                {detailKeys.map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={`
                                            px-4 py-2
                                            text-sm font-text text-left
                                            border-l-3 border-pro300 dark:border-pro800
                                            transition-colors duration-200
                                            cursor-none
                                            ${activeTab === key ?
                                                "bg-pro200 dark:bg-pro800 text-accent" : "text-pro800 dark:text-pro300 hover:bg-pro200 dark:hover:bg-pro800 hover:text-accent cursor-hover"}
                                        `}
                                    >
                                        {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="flex-1">
                                {activeTab && renderDetails(details[activeTab]!)}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
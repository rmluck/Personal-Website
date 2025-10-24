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
    const [activeTab, setActiveTab] = useState<string>(detailKeys[0] || "");

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
                p-6 w-full
                border border-pro800 dark:border-pro300
                rounded-md shadow-md
                transition-all duration-500
                group/school
            `}
        >
            {/* School Information */}
            <div className="flex items-center gap-6">
                {/* School Logo */}
                {logo && (
                    <div className="group/logo">
                        <div
                            className={`
                                flex flex-shrink-0
                                items-center justify-center
                                relative w-30 h-30
                                border-3 border-accent
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
                                    opacity-50 saturate-0
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
                                    bg-accent opacity-70
                                    rounded-lg mix-blend-color
                                    transition-opacity duration-500 ease-out
                                    group-hover/school:opacity-0
                                `}
                            ></div>
                        </div>
                    </div>
                )}

                {/* School Details */}
                <div>
                    {/* School Name */}
                    <h3 className="text-2xl text-pro900 dark:text-pro200 font-regular font-bold">
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
                                text-lg text-pro800 dark:text-pro300
                                font-regular font-bold
                            `}
                        >
                            {degree} {specialization && ` - ${specialization}`}
                        </p>
                    }

                    {/* Dates */}
                    {(start_date || end_date) && (
                        <span className="text-sm text-pro800 dark:text-pro300 font-regular">
                            {start_date} - {end_date}
                        </span>
                    )}

                    {/* GPA */}
                    {gpa &&
                        <p className="text-sm text-pro700 dark:text-pro400 font-regular">
                            GPA: {gpa}
                        </p>
                    }
                </div>
            </div>

            {/* Tabs */}
            <div
                className={`
                    max-h-0 opacity-0
                    overflow-hidden
                    transition-all duration-500
                    group-hover/school:mt-8
                    group-hover/school:max-h-300
                    group-hover/school:opacity-100
                `}
            >
                {detailKeys.length > 0 && (
                    <div className="flex flex-col md:flex-row gap-6">
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
                )}
            </div>
        </div>
    );
}
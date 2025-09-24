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
    details?: Record<string, NestedDetails>;
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
    const detailKeys = Object.keys(details);
    const [activeTab, setActiveTab] = useState<string>(detailKeys[0] || "");

    function renderDetails(content: NestedDetails) {
        if (Array.isArray(content)) {
            return (
                <ul className="text-pro700 font-text text-xs space-y-1">
                    {content.map((item, i) => (
                        <li key={i} className="bullet-list-item">{item}</li>
                    ))}
                </ul>
            );
        }

        return Object.entries(content).map(([subheading, items], i) => (
            <div key={i} className="mb-4">
                <h4 className="text-pro900 font-semibold text-sm mb-1">{subheading}</h4>
                {renderDetails(items)}
            </div>
        ));
    }

    return (
        <div className="border border-pro800 rounded-md shadow-md p-6 w-full group/school transition-all duration-500">
            {/* School Information */}
            <div className="flex items-center gap-6">
                {logo && (
                    <div className="group/logo">
                        <div className="relative flex-shrink-0 w-30 h-30 border-3 border-accent rounded-full flex items-center justify-center transition-colors duration-500 overflow-hidden shadow-md cursor-hover cursor-none clickable">
                            <Image 
                                src={logo}
                                alt={`${school} logo`}
                                width={120}
                                height={120}
                                className="object-cover group-hover/logo:scale-105 transition duration-500 opacity-50 group-hover/logo:opacity-100 saturate-0 group-hover/school:saturate-100"
                            />
                            <div className="absolute inset-0 rounded-lg bg-accent opacity-70 mix-blend-color transition-opacity duration-500 ease-out group-hover/school:opacity-0"></div>
                        </div>
                        
                    </div>
                )}
                <div>
                    <h3 className="text-2xl font-bold font-regular text-pro900">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full cursor-hover cursor-none"
                        >
                            {school}
                        </a>
                    </h3>
                    {degree && <p className="text-lg font-bold font-regular text-pro800">{degree} {specialization && ` - ${specialization}`}</p>}
                    {(start_date || end_date) && (
                        <span className="text-sm font-regular text-pro800">
                            {start_date} - {end_date}
                        </span>
                    )}
                    {gpa && <p className="text-sm font-regular text-pro700">GPA: {gpa}</p>}
                </div>
            </div>

            {/* Tabs */}
            <div className="group-hover/school:mt-8 opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover/school:opacity-100 group-hover/school:max-h-96">
                {detailKeys.length > 0 && (
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Tab Buttons */}
                        <div className="flex md:flex-col relative">
                            <div 
                                className="absolute left-0 w-0.75 bg-accent transition-all duration-300"
                                style={{
                                    top: `${detailKeys.indexOf(activeTab) * 2.25}rem`,
                                    height: "2.25rem",
                                }}
                            />
                            {detailKeys.map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`px-4 py-2 text-sm text-left border-l-3 border-pro300 transition-colors duration-200 cursor-none ${activeTab === key ? "text-accent bg-pro200" : "text-pro800 hover:bg-pro200 hover:text-accent cursor-hover"}`}
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
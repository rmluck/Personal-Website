"use client";

import Image from "next/image";
import { useState } from "react";

type EducationItemProps = {
    school: string;
    degree?: string;
    specialization?: string;
    dates: string;
    coursework?: string[];
    organizations?: string[];
    extras?: string[];
    logo: string;
};

export default function EducationItem({
    school,
    degree,
    specialization,
    dates,
    coursework = [],
    organizations = [],
    extras = [],
    logo,
} : EducationItemProps) {
    const [activeTab, setActiveTab] = useState<"coursework" | "organizations" | "extras">("coursework");

    const tabLabels: Record<string, string> = {
        coursework: "Coursework",
        organizations: "Organizations",
        extras: "Additional Info",
    };

    const tabContent: Record<string, string[]> = {
        coursework,
        organizations,
        extras,
    };

    return (
        <div className="border border-pro800 rounded-md shadow-md p-6 w-full">
            {/* School Information */}
            <div className="flex items-center gap-6 group mb-10">
                {logo && (
                    <div className="relative flex-shrink-0 w-30 h-30 border-3 border-pro600 rounded-full flex items-center justify-center bg-pro200 group-hover:bg-pro100 transition-colors duration-500">
                        <Image 
                            src={logo}
                            alt={`${school} logo`}
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                    </div>
                )}
                <div>
                    <h3 className="text-2xl font-bold font-regular text-pro900">{school}</h3>
                    <p className="text-lg font-bold font-regular text-pro800">{degree}</p>
                    <span className="text-sm font-regular text-pro800">{dates}</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex md:flex-col relative">
                    <div
                        className="absolute left-0 w-0.75 bg-accent transition-all duration-300"
                        style={{
                            top: `${Object.keys(tabLabels).indexOf(activeTab) * 2.25}rem`,
                            height: "2.25rem",
                        }}
                    />

                    {Object.keys(tabLabels).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key as "coursework" | "organizations" | "extras")}
                            className={`px-4 py-2 text-sm text-left border-l-3 border-pro300 transition-colors duration-200 ${activeTab === key ? "text-accent bg-pro200" : "text-pro800 hover:bg-pro200 hover:text-accent"}`}
                        >
                            {tabLabels[key]}
                        </button>
                    ))}
                </div>
                <div className="flex-1">
                    {tabContent[activeTab].length > 0 ? (
                        <ul className="text-pro700 font-text text-xs space-y-1">
                            {tabContent[activeTab].map((item, index) => (
                                <li key={index} className="bullet-list-item">{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-pro700 font-text text-xs space-y-1 italic">No {tabLabels[activeTab]} available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
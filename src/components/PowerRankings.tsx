"use client";

import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ChevronDown, ChevronUp, MoveUp, MoveDown, Minus } from "lucide-react";

interface Entity {
    rank: number;
    team: {
        _id: string;
        name: string;
        logo?: any;
        primaryColor?: string;
    }
    record?: string;
    movement?: string;
    movementAmount?: number;
    analysis?: string;
    lastWeek?: string;
    thisWeek?: string;
}

interface PowerRankingsProps {
    data: {
        title: string;
        subtitle?: string;
        sport?: string;
        entities: Entity[];
    };
}

export default function PowerRankings({ data } : PowerRankingsProps) {
    const [expandedEntities, setExpandedEntities] = useState<Set<number>>(new Set());

    const toggleExpand = (rank: number) => {
        const newExpanded = new Set(expandedEntities);
        if (newExpanded.has(rank)) {
            newExpanded.delete(rank);
        } else {
            newExpanded.add(rank);
        }
        setExpandedEntities(newExpanded);
    };

    const getMovementIcon = (movement?: string) => {
        switch (movement) {
            case "up":
                return <MoveUp className="w-4 h-4 text-green-600" />;
            case "down":
                return <MoveDown className="w-4 h-4 text-red-600" />;
            case "new":
                return;
            default:
                return <Minus className="w-4 h-4 text-gray-400" />;
        }
    };

    const getMovementText = (movement?: string, amount?: number) => {
        switch (movement) {
            case "up":
                return amount ? amount : "";
            case "down":
                return amount ? amount : "";
            case "new":
                return "New";
            default:
                return "";
        }
    };

    return (
        <div className="my-12">
            {/* Header */}
            {/* <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-pro900 dark:text-pro200 mb-2">
                    {data.title}
                </h2>
                {data.subtitle && (
                    <p className="text-lg text-pro700 dark:text-pro300 font-medium">
                        {data.subtitle}
                    </p>
                )}
            </div> */}

            {/* Rankings */}
            <div className="space-y-2">
                {data.entities?.map((entity) => {
                    const isExpanded = expandedEntities.has(entity.rank);
                    const bgColor = entity.team.primaryColor || "#E5E7EB";
                    const textColor = "#FFFFFF";

                    return (
                        <div key={entity.rank} className="rounded-lg overflow-hidden shadow-md">
                            {/* Row */}
                            <div
                                className="flex items-stretch pl-4 cursor-hover cursor-none hover:brightness-105 transition-all duration-200 min-h-[80px]"
                                style={{
                                    backgroundColor: bgColor,
                                    color: textColor,
                                }}
                                onClick={() => toggleExpand(entity.rank)}
                            >
                                <div className="flex items-center flex-grow p-4">
                                    <div
                                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4"
                                        style={{
                                            backgroundColor: textColor,
                                            color: bgColor
                                        }}
                                    >
                                        <span className="text-xl font-bold">
                                            {entity.rank}
                                        </span>
                                    </div>
                                

                                    {/* Logo */}
                                    {entity.team.logo && (
                                        <div className="flex-shrink-0 mr-4 w-24 h-16 flex items-center justify-center">
                                            <div className="relative w-full h-full">
                                                <Image 
                                                    src={urlFor(entity.team.logo).width(300).url()}
                                                    alt={`${entity.team.name} logo`}
                                                    fill
                                                    className="bg-transparent  object-contain"
                                                    sizes="96px"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Info */}
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-1">
                                            {entity.team.name}
                                        </h3>
                                        {entity.record && (
                                            <p className="text-sm opacity-90 font-medium">{entity.record}</p>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className="flex items-center min-w-[90px] justify-center"
                                    style={{
                                        backgroundColor: bgColor,
                                        filter: "brightness(1.25)",
                                    }}
                                >
                                    {/* Movement */}
                                    <div className="flex items-center justify-end gap-3 mr-2 w-[50%]">
                                        <div className="flex flex-row items-center">
                                            {getMovementIcon(entity.movement)}
                                            <span className="text-lg font-medium ml-1">
                                                {getMovementText(entity.movement, entity.movementAmount)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Expand/Collapse */}
                                    <div className="">
                                        <div className="justify-start">
                                            {isExpanded ? (
                                                <ChevronUp className="w-6 h-6" />
                                            ) : (
                                                <ChevronDown className="w-6 h-6" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            <div className={`overflow-hidden transition-all duration-1000 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className={`bg-pro100 dark:bg-pro800 p-6 transform transition-transform duration-300 ease-in-out ${isExpanded ? "translate-y-0" : "-translate-y-4"}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Analysis */}
                                        <div>
                                            {entity.analysis && (
                                                <>
                                                    <h4 className="font-bold text-pro900 dark:text-pro200 mb-2">Analysis</h4>
                                                    <p className="text-sm text-pro800 dark:text-pro300 leading-relaxed">
                                                        {entity.analysis}
                                                    </p>
                                                </>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            {entity.lastWeek && (
                                                <div>
                                                    <h4 className="font-bold text-pro900 dark:text-pro200 mb-1 text-sm">Last Week</h4>
                                                    <p className="text-sm text-pro700 dark:text-pro400 font-text">
                                                        {entity.lastWeek}
                                                    </p>
                                                </div>
                                            )}

                                            {entity.thisWeek && (
                                                <div>
                                                    <h4 className="font-bold text-pro900 dark:text-pro200 mb-1 text-sm">This Week</h4>
                                                    <p className="text-sm text-pro700 dark:text-pro400 font-text">
                                                        {entity.thisWeek}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
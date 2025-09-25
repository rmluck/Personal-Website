"use client";

import Image from "next/image";
import Section from "@/components/Section";
import FullProjectCard from "@/components/FullProjectCard";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";

export default function Projects() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="px-6 sm:px-12 py-16 m-24 rounded-lg border-2 border-pro900 dark:border-pro200 shadow-lg">
                    <div className="mb-20">
                        <h2 className="text-5xl text-center text-pro900 dark:text-pro200 font-heading font-bold whitespace-nowrap">
                            PROJECTS
                        </h2>
                        {/* <div className="flex-1 h-px bg-pro600 dark:bg-pro400"></div> */}
                    </div>

                    <ul className="space-y-24">
                        {projects
                            .map((project, i) => (
                                <FullProjectCard key={project.name} side={i % 2 === 0 ? "right" : "left"} {...project} />
                            ))}
                    </ul>
                </section>
            </main>
        </div>
    )
}
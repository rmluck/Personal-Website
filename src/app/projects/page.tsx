"use client";

import FullProjectCard from "@/components/FullProjectCard";
import Navbar from "@/components/Navbar";
import { projects } from "@/data/projects";

export default function Projects() {
    const navItems = [];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar items={navItems} side="professional" />
            
            <main className="flex-1">
                <section className="px-6 sm:px-12 py-16 m-24">
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
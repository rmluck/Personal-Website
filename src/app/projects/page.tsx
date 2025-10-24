"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FullProjectCard from "@/components/FullProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar items={[]} />
            
            <main className="flex-1">
                <section className="px-6 sm:px-12 pb-8 mx-24 mb-0">
                    {/* Header */}
                    <div className="mb-10 mt-10">
                        <h2
                            className={`
                                text-5xl text-pro900 dark:text-pro200
                                font-heading font-bold 
                                text-center whitespace-nowrap
                            `}
                            style={{ textShadow: "-3px 3px 0 var(--accent)" }}
                        >
                            PROJECTS
                        </h2>
                    </div>

                    {/* Projects List */}
                    <ul className="space-y-20">
                        {projects
                            .map((project, i) => (
                                <FullProjectCard
                                    key={project.name}
                                    side={i % 2 === 0 ? "right" : "left"}
                                    {...project}
                                />
                            ))
                        }
                    </ul>
                </section>

                <section className="mt-0">
                    <Footer />
                </section>
            </main>
        </div>
    )
}
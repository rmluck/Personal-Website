"use client";

import FullProjectCard from "@/components/FullProjectCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";


export default function Projects() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar items={[]} />
            
            <main className="flex-1">
                <section className="px-6 sm:px-12 pt-16 pb-8 m-24 mb-0">
                    <div className="mb-10 mt-10">
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

                <section className="mt-0">
                    <Footer />
                </section>
            </main>
        </div>
    )
}
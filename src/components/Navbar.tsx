"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState<string>("home");

    useEffect(() => {
        const sections = navItems.map((item) => document.querySelector(item.href));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
                });
            },
            { threshold: 0.6 } // 60% of section visible triggers highlight
        );

        sections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-pro200/80 backdrop-blur-md shadow-md font-regular">
            <div className="flex items-center justify-between px-6 py-3">
                {/* Logo Placeholder */}
                <div className="font-bold text-xl">LOGO</div>

                {/* Navigation Links */}
                <ul className="flex space-x-6 text-sm">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                scroll={true}
                                className={`relative transition-colors
                                after:absolute
                                after:left-0 after:-bottom-0.5
                                after:h-[2px] after:w-0
                                after:bg-accent after:transition-all
                                hover:after:w-full
                                ${activeSection === item.href.slice(1) ? "text-accent" : "text-pro900"}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
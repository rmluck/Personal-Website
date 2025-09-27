"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

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
    const [navMenuOpen, setNavMenuOpen] = useState<boolean>(false);
    const ticking = useRef(false);

    useEffect(() => {
        const sectionIds = navItems.map((item) => item.href.slice(1));

        const getSections = () => sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        
        const navEl = document.querySelector("nav");
        const getNavHeight = () => navEl?.getBoundingClientRect().height ?? 0;

        const applyScrollMargin = () => {
            const navHeight = getNavHeight();
            getSections().forEach((section) => {
                section.style.scrollMarginTop = `${navHeight + 12}px`;
            });
        };

        const determineActiveByPosition = () => {
            const sections = getSections();
            if (!sections.length) return;

            const vh = window.innerHeight;
            const viewportCenter = vh / 2;
            const navHeight = getNavHeight();

            let best: HTMLElement | null = null;
            let bestDist = Infinity;

            for (const sec of sections) {
                const rect = sec.getBoundingClientRect();
                if (rect.top <= navHeight + 8 && rect.bottom > navHeight + 8) {
                    setActiveSection(sec.id);
                    return;
                }

                const secCenter = (rect.top + rect.bottom) / 2;
                const dist = Math.abs(secCenter - viewportCenter);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = sec;
                }
            }

            if (best && best.id !== activeSection) {
                setActiveSection(best.id);
            }
        };

        const onScroll = () => {
            if (!ticking.current) {
                ticking.current = true;
                requestAnimationFrame(() => {
                    determineActiveByPosition();
                    ticking.current = false;
                });
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = (entry.target as HTMLElement).id;
                        setActiveSection(id);
                    }
                });
            },
             {
                root: null,
                rootMargin: `-10% 0px -40% 0px`,
                threshold: [0.15, 0.4, 0.6],
             }
        );

        getSections().forEach((section) => observer.observe(section));

        applyScrollMargin();
        determineActiveByPosition();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        window.addEventListener("load", onScroll);

        const imgs = Array.from(document.querySelectorAll("img"));
        imgs.forEach((img) => img.addEventListener("load", onScroll));

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            window.removeEventListener("load", onScroll);
            imgs.forEach((img) => img.removeEventListener("load", onScroll));
            observer.disconnect();
        };
    }, []);

    // useEffect(() => {
    //     const sections = navItems.map((item) => document.querySelector(item.href));

    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //             if (entry.isIntersecting) {
    //                 setActiveSection(entry.target.id);
    //             }
    //             });
    //         },
    //         {
    //             threshold: 0.5, // 50% of section visible triggers highlight
    //          } 
    //     );

    //     sections.forEach((section) => {
    //         if (section) observer.observe(section);
    //     });

    //     return () => {
    //         sections.forEach((section) => {
    //             if (section) observer.unobserve(section);
    //         });
    //     };
    // }, []);

    return (
        <>
            <nav className="fixed top-0 left-0 z-50 w-full bg-transparent backdrop-blur-xl shadow-2xl font-regular">
                <div className="flex items-center justify-between px-6 py-3">
                    {/* Logo Placeholder */}
                    <div className="font-bold text-xl text-pro900 dark:text-pro100">LOGO</div>

                    {/* Navigation Links */}
                    <ul className="hidden md:flex space-x-6 text-sm">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    scroll={true}
                                    className={`relative transition-colors
                                    cursor-hover cursor-none
                                    after:absolute
                                    after:left-0 after:-bottom-0.5
                                    after:h-[2px] after:w-0
                                    after:bg-accent after:transition-all
                                    hover:text-accent
                                    hover:after:w-full
                                    ${activeSection === item.href.slice(1) ? "text-accent font-bold" : "text-pro900 dark:text-pro100"}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Navigation Menu Button */}
                    <button onClick={() => setNavMenuOpen(true)} className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1 group relative z-50 cursor-hover cursor-none" aria-label="Open menu">
                        <span className={`block w-6 h-[2px] bg-pro900 dark:bg-pro100 transition-all duration-300 group-hover:bg-accent group-hover:-translate-y-1 ${navMenuOpen ? "rotate-45 translate-y-2 bg-accent" : ""}`}></span>
                        <span className={`block w-6 h-[2px] bg-pro900 dark:bg-pro100 transition-all duration-300 group-hover:bg-accent group-hover:-translate-y-1 ${navMenuOpen ? "opacity-0" : ""}`}></span>
                        <span className={`block w-6 h-[2px] bg-pro900 dark:bg-pro100 transition-all duration-300 group-hover:bg-accent group-hover:-translate-y-1 ${navMenuOpen ? "-rotate-45 -translate-y-2 bg-accent" : ""}`}></span>
                    </button>
                </div>
            </nav>

            {/* Navigation Panel */}
            {navMenuOpen && (
                <div onClick={() => setNavMenuOpen(false)} className={`fixed inset-0 z-50 bg-pro900/20 dark:bg-pro100/20 backdrop-blur-sm transition-opacity duration-500 ${navMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
            )}
            <div className={`fixed top-0 right-0 h-full w-64 bg-pro200/95 dark:bg-pro850/95 backdrop-blur-md shadow-lg transform transition-transform duration-300 z-50 ${navMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex justify-end p-6">
                    <button onClick={() => setNavMenuOpen(false)} className="text-pro900 dark:text-pro100 hover:text-accent font-bold text-2xl cursor-pointer transform hover:-translate-y-1 transition-transform duration-200">✕</button>
                </div>
                <ul className="flex flex-col mt-8 ml-6 space-y-6 text-lg font-medium font-regular">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} scroll onClick={() => setNavMenuOpen(false)} className=
                            {`relative transition-colors
                                    after:absolute
                                    after:left-0 after:-bottom-0.5
                                    after:h-[2px] after:w-0
                                    after:bg-accent after:transition-all
                                    hover:text-accent
                                    hover:after:w-full
                                    cursor-hover cursor-none
                                    ${activeSection === item.href.slice(1) ? "text-accent font-bold" : "text-pro900 dark:text-pro100"}`}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
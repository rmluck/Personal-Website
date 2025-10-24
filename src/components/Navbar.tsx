"use client";
import Logo from "./SiteLogo";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, Menu } from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    dropdown?: {
        label: string;
        href: string;
    }[];
}

export default function Navbar(
    { items: navItems }: { items?: NavItem[] }
) {
    const [activeSection, setActiveSection] = useState<string>("home");
    const [navMenuOpen, setNavMenuOpen] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const hasNavItems = navItems && navItems.length > 0;
    const ticking = useRef(false);

    // Handle active section based on scroll position
    useEffect(() => {
        if (!navItems || navItems.length === 0) return;

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
    }, [activeSection, navItems]);

    return (
        <>
            <nav
                className={`
                    fixed top-8 z-50
                    transform -translate-x-1/2
                    ${hasNavItems ? "w-[90%] max-w-6xl font-regular left-1/2" : "w-16 lg:left-1/28 md:left-1/20 sm:left-1/14 left-1/10"}  
                `}
            >
                <div className={`
                        bg-pro200/80 dark:bg-pro800/55
                        backdrop-blur-xl
                        border border-pro300/30 dark:border-pro700/30
                        rounded-full shadow-2xl
                    `}
                >
                    <div className={`
                            flex items-center py-4
                            ${hasNavItems ? "px-6 justify-between" : "justify-center"}
                        `}
                    >
                        {/* Site Logo */}
                        <Link href="/" className="flex items-center">
                            <Logo
                                className={`
                                    text-pro900 dark:text-pro100
                                    transition-all duration-200
                                    hover:text-accent hover:-translate-y-1
                                    cursor-none cursor-hover clickable
                                `}
                                width={50}
                                height={30} 
                            />
                        </Link>

                        {/* Navigation */}
                        <div className="flex items-center gap-4">
                            {/* Navigation Links */}
                            <ul className="hidden md:flex space-x-6 text-md">
                                {navItems && navItems.length > 0 && navItems.map((item, index) => (
                                    <li
                                        key={`nav-item-${index}`}
                                        className="relative"
                                        onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <Link
                                            href={item.href}
                                            scroll={true}
                                            className={`
                                                flex items-center gap-1
                                                relative
                                                transition-colors
                                                after:absolute after:left-0 after:-bottom-0.5
                                                after:h-[2px] after:w-0
                                                after:bg-accent after:transition-all
                                                hover:text-accent hover:font-semibold
                                                hover:after:w-full
                                                cursor-hover cursor-none
                                                ${activeSection === item.href.slice(1)
                                                ? "text-accent font-bold"
                                                : "text-pro900 dark:text-pro100"}
                                            `}
                                        >
                                            {item.label}
                                            {item.dropdown && (
                                                <ChevronDown
                                                    className={`
                                                        w-3 h-3
                                                        transition-transform duration-200
                                                        ${activeDropdown === item.label ? "rotate-180" : ""}
                                                    `}
                                                />
                                            )}
                                        </Link>

                                        {item.dropdown && activeDropdown === item.label && (
                                            <div className="absolute top-[100%] left-0 pt-3 w-48">
                                                <div className="absolute top-0 left-0 right-0 h-3 bg-transparent" />
                                                <div
                                                    className={`
                                                        py-1
                                                        bg-pro200/85 dark:bg-pro800/55
                                                        backdrop-blur-3xl
                                                        border border-pro300/30 dark:border-pro700/30
                                                        rounded-lg shadow-xl
                                                    `}
                                                >
                                                    {item.dropdown.map((dropdownItem) => (
                                                        <Link
                                                            key={dropdownItem.href}
                                                            href={dropdownItem.href}
                                                            className={`
                                                                block px-4 py-2
                                                                text-sm text-pro800 dark:text-pro200 
                                                                hover:bg-accent/20
                                                                hover:text-accent hover:font-semibold 
                                                                transition-colors
                                                                cursor-hover cursor-none
                                                            `}
                                                        >
                                                            {dropdownItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Navigation Menu Button */}
                            {navItems && navItems.length > 0 && (
                                <button>
                                    <Menu
                                        onClick={() => setNavMenuOpen(true)}
                                        className={`
                                            md:hidden w-6 h-6
                                            text-pro900 dark:text-pro100
                                            transition-all duration-300
                                            hover:text-accent  hover:-translate-y-1
                                            cursor-hover cursor-none clickable
                                        `}
                                        aria-label="Open menu"
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Navigation Panel */}
            {navItems && navItems.length > 0 && navMenuOpen && (
                <div
                    onClick={() => setNavMenuOpen(false)}
                    className={`
                        fixed inset-0 z-50
                        bg-pro900/20 dark:bg-pro100/20
                        backdrop-blur-sm
                        transition-opacity duration-500
                        ${navMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                    `}
                ></div>
            )}
            {navItems && navItems.length > 0 && (
                <div
                    className={`
                        fixed top-0 right-0 pb-12
                        h-full w-64
                        bg-pro200/95 dark:bg-pro850/95
                        backdrop-blur-md shadow-lg
                        z-50 overflow-scroll
                        transition-transform transform duration-300
                        ${navMenuOpen ? "translate-x-0" : "translate-x-full"}
                    `}
                >
                    <div className="flex justify-end p-6">
                        <button
                            onClick={() => setNavMenuOpen(false)}
                            className={`
                                text-2xl text-pro900 dark:text-pro100 font-bold
                                transition-transform transform duration-200
                                hover:text-accent hover:-translate-y-1
                                cursor-hover cursor-none clickable
                            `}
                        >✕</button>
                    </div>
                    <ul className="flex flex-col mt-8 ml-6 space-y-4 font-medium font-regular">
                        {navItems.map((item, index) => (
                            <li key={`mobile-nav-item-${index}`}>
                                <Link
                                    href={item.href}
                                    scroll
                                    onClick={() => setNavMenuOpen(false)}
                                    className={`
                                        relative
                                        text-lg
                                        transition-colors
                                        hover:text-accent
                                        after:absolute after:left-0 after:-bottom-0.5
                                        after:h-[2px] after:w-0
                                        after:bg-accent
                                        after:transition-all
                                        hover:after:w-full
                                        cursor-hover cursor-none
                                        ${activeSection === item.href.slice(1)
                                        ? "text-accent font-bold"
                                        : "text-pro900 dark:text-pro100"
                                        }
                                    `}
                                >
                                    {item.label}
                                </Link>
                                {item.dropdown && (
                                    <ul className="ml-4 mt-2 space-y-2">
                                        {item.dropdown.map((dropdownItem) => (
                                            <li key={dropdownItem.href}>
                                                <Link
                                                    href={dropdownItem.href}
                                                    onClick={() => setNavMenuOpen(false)}
                                                    className={`
                                                        relative
                                                        text-sm text-pro700 dark:text-pro300
                                                        transition-colors
                                                        after:absolute after:left-0 after:-bottom-0.5
                                                        after:h-[2px] after:w-0
                                                        after:bg-accent after:transition-all
                                                        hover:text-accent hover:after:w-full
                                                        cursor-hover cursor-none
                                                    `}
                                                >
                                                    {dropdownItem.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
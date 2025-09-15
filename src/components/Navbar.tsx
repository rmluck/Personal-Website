"use client";
import Link from "next/link";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-light-pbg/80 backdrop-blur-md shadow-md z-50 font-regular">
            <div className="flex items-center justify-between px-6 py-3">
                {/* Logo Placeholder */}
                <div className="font-bold text-xl">LOGO</div>

                {/* Navigation Links */}
                <ul className="flex space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                scroll={true}
                                className="text-light-ptxt hover:underline hover:underline-offset-3 transition-colors"
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
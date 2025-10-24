import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full pt-6 pb-3">
            {/* Copyright */}
            <p
                className={`
                    mb-3
                    text-sm text-pro700 dark:text-pro400
                    text-regular text-center
                `}
            >
                © {new Date().getFullYear()} Rohan Mistry. All rights reserved.
            </p>

            {/* Social Links */}
            <ul className="md:hidden flex flex-row items-center justify-center w-full space-x-6">
                <li>
                    <a
                        href="https://github.com/rmluck" 
                        aria-label="GitHub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            inline-block
                            text-pro600 dark:text-pro400
                            transition-all transform duration-200
                            hover:text-accent hover:-translate-y-1
                            cursor-hover cursor-none
                        `}
                        title="Github"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                </li>
                
                <li>
                    <a
                        href="https://www.linkedin.com/in/rohan-dilan-mistry/"
                        aria-label="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            inline-block
                            text-pro600 dark:text-pro400
                            transition-all transform duration-200
                            hover:text-accent hover:-translate-y-1
                            cursor-hover cursor-none
                        `}
                        title="LinkedIn"
                    >
                        <Linkedin className="h-5 w-5" />
                    </a>
                </li>

                <li>
                    <a
                        href="https://www.instagram.com/rohandm99/"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            inline-block
                            text-pro600 dark:text-pro400
                            transition-all transform duration-200
                            hover:text-accent hover:-translate-y-1
                            cursor-hover cursor-none
                        `}
                        title="Instagram"
                    >
                        <Instagram className="h-5 w-5" />
                    </a>
                </li>
            </ul>
        </footer>
    );
}
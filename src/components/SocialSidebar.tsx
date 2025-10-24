import { Github, Linkedin, Instagram } from "lucide-react";

export default function SocialSidebar() {
    return (
        <div className="hidden md:flex fixed left-8 bottom-0 flex-col items-center space-y-6">
            {/* Social Links */}
            <ul className="flex flex-col items-center space-y-6">
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

            {/* Vertical Line */}
            <div className="w-px h-40 bg-pro600 dark:bg-pro400"></div>
        </div>
    );
}
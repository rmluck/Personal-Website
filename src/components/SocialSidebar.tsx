import { Github, Linkedin, Instagram } from "lucide-react";

export default function SocialSidebar() {
    return (
        <div className="hidden md:flex fixed left-8 bottom-0 flex-col items-center space-y-6">
            <ul className="flex flex-col items-center space-y-6">
                <li>
                    <a
                        href="https://github.com/rmluck" 
                        aria-label="GitHub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-pro600 hover:text-accent transform hover:-translate-y-1 transition-all duration-200"
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
                        className="inline-block text-pro600 hover:text-accent transform hover:-translate-y-1 transition-all duration-200"
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
                        className="inline-block text-pro600 hover:text-accent transform hover:-translate-y-1 transition-all duration-200"
                    >
                        <Instagram className="h-5 w-5" />
                    </a>
                </li>
            </ul>
            <div className="w-px h-40 bg-pro600"></div>
        </div>
    );
}
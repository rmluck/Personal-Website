import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-light-sbg border-t border-border">
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Copyright */}
                <p className="text-regular text-sm text-light-stxt">
                    © {new Date().getFullYear()} Rohan Mistry. All rights reserved.
                </p>

                {/* Social Links */}
                <div className="flex space-x-5">
                    <a
                        href="https://github.com/rmluck" target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-stxt hover:text-light-ptxt transition-colors"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/rohan-dilan-mistry/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-stxt hover:text-light-ptxt transition-colors"
                    >
                        <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                        href="https://www.instagram.com/rohandm99/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-stxt hover:text-light-ptxt transition-colors"
                    >
                        <Instagram className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
export default function EmailSidebar() {
    return (
        <div className="hidden md:flex fixed -right-7 bottom-0 flex-col items-center space-y-6">
            {/* Email */}
            <a
                href="mailto:rohandm99@yahoo.com"
                className="text-pro600 dark:text-pro400 hover:text-accent transform origin-bottom-left hover:-translate-y-1 transition-all duration-200 cursor-hover cursor-none"
            >
                <span className="inline-block transform rotate-90 font-text text-xs">rohandm99@yahoo.com</span>
            </a>
            <div className="w-px h-40 bg-pro600 dark:bg-pro400 mt-15"></div>
        </div>
    );
}
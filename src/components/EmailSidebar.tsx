export default function EmailSidebar() {
    return (
        <div
            className={`
                hidden md:flex flex-col
                items-center space-y-6
                fixed -right-7 bottom-0
            `}
        >
            {/* Email */}
            <a
                href="mailto:rohandm99@yahoo.com"
                className={`
                    text-pro600 dark:text-pro400
                    transition-all transform duration-200
                    origin-bottom-left
                    hover:text-accent hover:-translate-y-1
                    cursor-hover cursor-none
                `}
            >
                <span className="inline-block text-xs font-text transform rotate-90">rohandm99@yahoo.com</span>
            </a>

            {/* Divider */}
            <div className="mt-15 w-px h-40 bg-pro600 dark:bg-pro400"></div>
        </div>
    );
}
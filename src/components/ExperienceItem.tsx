import Image from "next/image";

type ExperienceItemProps = {
    company: string;
    role: string;
    start_date: string;
    end_date: string;
    description: string[];
    logo: string;
    link: string;
};

export default function ExperienceItem({
    company,
    role,
    start_date,
    end_date,
    description,
    logo,
    link,
} : ExperienceItemProps) {
    return (
        <div className="relative flex items-start group/job">
            {/* Company Logo */}
            <div className="group/logo">
                <div
                    className={`
                        flex flex-shrink-0
                        items-center justify-center
                        relative w-20 h-20
                        bg-pro200
                        border-3 border-accent
                        rounded-full shadow-md
                        transition-all duration-500
                        overflow-hidden
                        group-hover:bg-pro100 dark:group-hover:bg-pro900
                        cursor-hover cursor-none
                    `}
                >
                    <Image
                        src={logo}
                        alt={company}
                        width={125}
                        height={125}
                        className={`
                            object-cover scale-105
                            opacity-50 saturate-0
                            transition duration-500 
                            group-hover/logo:scale-110
                            group-hover/logo:opacity-100
                            group-hover/job:saturate-100
                        `}
                    />

                    {/* Overlay on hover */}
                    <div className={`
                        absolute inset-0
                        bg-accent rounded-lg
                        opacity-70 mix-blend-color
                        transition-opacity duration-500 ease-out
                        group-hover/job:opacity-0
                    `}></div>
                </div>
            </div>

            {/* Job Details */}
            <div
                className={`
                    flex flex-col p-4 ml-8
                    w-full
                    border border-pro800 dark:border-pro300
                    rounded-md shadow-md
                    transition-all duration-500
                `}
            >
                {/* Role and Company */}
                <h3 className="text-lg text-pro900 dark:text-pro200 font-regular font-semibold">
                    <span>{role}</span>

                    <span className="text-pro800 dark:text-pro300">
                        &nbsp;@&nbsp;
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                relative
                                transition-colors
                                hover:text-accent
                                after:absolute after:left-0 after:-bottom-0.5
                                after:h-[2px] after:w-0
                                after:bg-accent
                                after:transition-all
                                hover:after:w-full
                                cursor-hover cursor-none
                            `}
                        >
                            {company}
                        </a>
                    </span>
                </h3>

                {/* Dates */}
                <span className="text-sm text-pro800 dark:text-pro300 font-regular font-normal">
                    {start_date} - {end_date}
                </span>

                {/* Job Description */}
                <ul
                    className={`
                        max-h-0
                        text-xs text-pro700 dark:text-pro400 font-text
                        opacity-0 overflow-hidden
                        space-y-1 leading-relaxed
                        transition-all duration-500
                        group-hover/job:mt-2
                        group-hover/job:max-h-96
                        group-hover/job:opacity-100
                    `}
                >
                    {description.map((item, i) => (
                        <li key={i} className="notes-item relative pl-4">{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
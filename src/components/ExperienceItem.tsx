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
                <div className="relative flex-shrink-0 w-20 h-20 border-3 border-pro700 rounded-full flex items-center justify-center group-hover:bg-pro100 transition-colors duration-500 overflow-hidden shadow-md bg-pro200 cursor-hover cursor-none">
                    <Image
                        src={logo}
                        alt={company}
                        width={125}
                        height={125}
                        className="object-cover scale-105 group-hover/logo:scale-110 transition duration-500 opacity-50 group-hover/logo:opacity-100"
                    />
                    <div className="absolute inset-0 rounded-lg bg-accent opacity-70 mix-blend-color transition-opacity duration-500 ease-out group-hover/job:opacity-0"></div>
                </div>
            </div>

            {/* Content */}
            <div className="ml-8 flex flex-col border border-pro800 rounded-md shadow-md p-4 w-full transition-all duration-500">
                <h3 className="text-lg font-semibold font-regular text-pro900">
                    <span>{role}</span>
                    <span className="text-pro800">
                        &nbsp;@&nbsp;
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full cursor-hover cursor-none"
                        >
                            {company}
                        </a>
                    </span>
                </h3>
                <span className="text-sm font-normal font-regular text-pro800">
                    {start_date} - {end_date}
                </span>

                <ul className="text-xs group-hover/job:mt-2 font-text text-pro700 opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover/job:opacity-100 group-hover/job:max-h-96 space-y-1 leading-relaxed">
                    {description.map((item, i) => (
                        <li key={i} className="notes-item relative pl-4">{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
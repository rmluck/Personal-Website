import Image from "next/image";

type ExperienceItemProps = {
    company: string;
    role: string;
    dates: string;
    description: string;
    logo: string;
};

export default function ExperienceItem({
    company,
    role,
    dates,
    description,
    logo,
} : ExperienceItemProps) {
    return (
        <div className="relative flex items-start group">
            {/* Company Logo */}
            <div className="relative z-10 flex-shrink-0 w-10 h-10 border-3 border-pro600 rounded-full flex items-center justify-center bg-pro200 group-hover:bg-pro100 transition-colors duration-500">
                <Image src={logo} alt={company} width={24} height={24} />
                <div className="absolute left-full top-1/2 w-6 h-px bg-pro600"></div>
            </div>

            {/* Content */}
            <div className="ml-8 flex flex-col border border-pro800 rounded-md shadow-md p-4 w-full transition-all duration-500">
                <h3 className="text-lg font-semibold font-regular text-pro900">
                    <span>{role}</span>
                    <span className="text-pro800">
                        &nbsp;@&nbsp;
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                        >
                            {company}
                        </a>
                    </span>
                </h3>
                <span className="text-sm font-normal font-regular text-pro800">
                    {dates}
                </span>
                
                <p className="text-xs group-hover:mt-2 font-text text-pro700 opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-40">{description}</p>
            </div>
        </div>
    );
}
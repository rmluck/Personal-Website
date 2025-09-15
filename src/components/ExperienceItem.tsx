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
        <div className="relative flex items-start gap-6 pb-10">
            {/* Timeline */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

            {/* Company Logo */}
            <div className="relative z-10 flex-shrink-0 w-10 h-10 bg-light-pbg border-2 border-border rounded-full flex items-center justify-center">
                <Image src={logo} alt={company} width={24} height={24} />
            </div>

            {/* Content */}
            <div className="flex flex-col">
                <h3 className="text-xl font-semibold font-regular text-light-ptxt">{role}</h3>
                <span className="text-sm font-regular text-light-stxt">{dates}</span>
                <p className="mt-2 font-text text-light-stxt">{description}</p>
            </div>
        </div>
    );
}
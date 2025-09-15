import Image from "next/image";
import Link from "next/link";

type SkillCardProps = {
    name: string;
    logo: string;
    projects: { name: string; link: string; }[];
};

export default function SkillCard({ name, logo, projects } : SkillCardProps) {
    return (
        <div className="flex flex-col items-center bg-light-pbg border border-border shadow-md rounded-lg p-4">
            {logo && (
                <Image 
                    src={logo}
                    alt={`${name} logo`}
                    width={40}
                    height={40}
                    className="mb-2 object-contain"
                />
            )}
            <h4 className="font-semibold mb-2">{name}</h4>
            <div className="flex flex-col gap-1 text-sm">
                {projects.map((project, index) => (
                    <Link key={index} href={project.link} className="text-blue-600 hover:underline">
                        {project.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
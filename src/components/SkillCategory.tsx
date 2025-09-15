import SkillCard from "./SkillCard";

type SkillCategoryProps = {
    title: string;
    color: string;
    skills: {
        name: string;
        logo: string;
        projects: { name: string; link: string }[];
    }[];
};

export default function SkillCategory({ title, color, skills } : SkillCategoryProps) {
    return (
        <div className="mb-12">
            <h3 className={`text-2xl font-bold mb-6 ${color}`}>{title}</h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {skills.map((skill, index) => (
                    <SkillCard key={index} name={skill.name} logo={skill.logo} projects={skill.projects} />
                ))}
            </div>
        </div>
    );
}
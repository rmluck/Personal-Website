import Image from "next/image";

type SkillCategoryProps = {
    category: string;
    items: { skill: string; logo: string; }[];
    color?: string;
};

export default function SkillCategory({
    category,
    items,
    color,
} : SkillCategoryProps) {
    return (
        <div className={`${color}`}>
            <h3 className="text-lg font-semibold font-regular text-pro900 dark:text-pro200 mb-3">{category}</h3>
            <div
                className="grid gap-8"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))"
                }}
            >
                {items.map(({ skill, logo }) => (
                    <div key={skill} className="flex flex-col bg-accent/70 rounded-md shadow-md border-3 border-accent justify-center items-center gap-4 p-4 hover:scale-105 transition-transform duration-300 cursor-hover cursor-none clickable">
                        <Image src={logo} alt={skill} width={65} height={65} className="object-contain filter-bw" />
                        <span className="text-sm font-regular font-semibold text-center text-pro900 dark:text-pro200">{skill}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
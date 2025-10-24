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
            {/* Category Title */}
            <h3
                className="text-lg text-pro900 dark:text-pro200 font-semibold font-regular mb-3"
            >
                {category}
            </h3>

            {/* Skills Grid */}
            <div
                className="grid gap-8"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
            >
                {items.map(({ skill, logo }) => (
                    <div
                        key={skill}
                        className={`
                            flex flex-col
                            justify-center items-center
                            gap-4 p-4
                            bg-accent/70
                            border-3 border-accent
                            rounded-md shadow-md
                            transition-transform duration-300
                            hover:scale-105
                            cursor-hover cursor-none clickable
                        `}
                    >
                        <Image
                            src={logo}
                            alt={skill}
                            width={65}
                            height={65}
                            className="object-contain filter-bw"
                        />
                        <span className="text-sm text-pro900 dark:text-pro200 font-regular font-semibold text-center">{skill}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
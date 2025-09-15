import Image from "next/image";

type EducationItemProps = {
    school: string;
    degree: string;
    dates: string;
    coursework?: string[];
    extras?: string[];
    logo: string;
};

export default function EducationItem({
    school,
    degree,
    dates,
    coursework,
    extras,
    logo,
} : EducationItemProps) {
    return (
        <div className="bg-light-pbg shadow-md rounded-xl p-6 mb-6 border border-border">
            {/* School Information */}
            <div className="flex items-center gap-4 mb-2">
                {logo && (
                    <div className="flex-shrink-0">
                        <Image 
                            src={logo}
                            alt={`${school} logo`}
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                )}
                <div>
                    <h3 className="text-2xl font-bold font-regular">{school}</h3>
                    <p className="text-lg text-light-stxt font-regular">{degree}</p>
                    <span className="text-sm text-light-stxt font-regular">{dates}</span>
                </div>
            </div>

            {/* Coursework */}
            {coursework && coursework.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold font-regular">Relevant Coursework:</h4>
                    <ul className="list-disc list-inside text-light-stxt font-text">
                        {coursework.map((course, index) => (
                            <li key={index}>{course}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Extras */}
            {extras && extras.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold font-regular">Additional:</h4>
                    <ul className="list-disc list-inside text-light-stxt font-text">
                        {extras.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
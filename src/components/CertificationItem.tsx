import Image from "next/image";
import { ExternalLink } from "lucide-react";

type CertificationItemProps = {
  name: string;
  company: string;
  certification_badge: string;
  date: string;
  links: { label: string; url: string }[];
};

export default function CertificationItem({
  name,
  company,
  certification_badge,
  date,
  links,
}: CertificationItemProps) {
  function getIcon() {
    return <ExternalLink className="h-5 w-5" />;
  }

  return (
    <div className="flex flex-col group/cert">
      <div className="p-4 border border-pro800 dark:border-pro300 rounded-md shadow-md bg-pro100/50 dark:bg-pro850/40">
        <div className="flex items-center gap-3">
          <div className="group/logo">
            <div
              className={`
                relative w-20 h-20 shrink-0 shadow-md overflow-hidden
                cursor-hover cursor-none
              `}
            >
              <Image
                src={certification_badge}
                alt={name}
                fill
                className={`
                  object-contain
                  opacity-60 saturate-0
                  transition duration-500
                  group-hover/cert:opacity-80 group-hover/cert:saturate-50
                  group-hover/logo:opacity-100 group-hover/logo:saturate-100
                `}
              />

              <div
                className={`
                  absolute inset-0
                  bg-accent rounded-full
                  opacity-70 mix-blend-color
                  transition-opacity duration-500 ease-out
                  group-hover/cert:opacity-35
                  group-hover/logo:opacity-0
                `}
              />
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-base sm:text-lg text-pro900 dark:text-pro200 font-semibold">
              {name}
            </h3>
            <p className="text-sm text-pro800 dark:text-pro300">
              {company} · Issued {date}
            </p>
          </div>
        </div>
      </div>

      {links?.length > 0 && (
        <div className="mt-4 flex items-center gap-4">
          {links.map((link, i) => (
            <a
              key={`cert-link-${i}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`
                inline-block text-pro600 dark:text-pro400
                transition-all transform duration-200
                hover:text-accent hover:-translate-y-1
                cursor-hover cursor-none
              `}
            >
              {getIcon()}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
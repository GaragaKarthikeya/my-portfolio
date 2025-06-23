import Image, { type StaticImageData } from "next/image";
import type { FC } from "react";
import type { Project } from "@/types";
import { useIsMobile, useHapticFeedback } from "@/hooks/useMobile";

type ProjectProps = Omit<Project, 'image'> & {
  readonly image: string | StaticImageData;
};

const ProjectCard: FC<ProjectProps> = ({
  title,
  description,
  link,
  image,
  technologies,
}) => {
  const isMobile = useIsMobile();
  const { impactLight } = useHapticFeedback();

  const handleClick = () => {
    if (isMobile) {
      impactLight();
    }
  };

  return (
    <article className="group mobile-card hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] active:scale-[0.98]">
      {/* Image Container with improved aspect ratio */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 aspect-video">
        <Image
          src={image}
          alt={`Screenshot of ${title} project`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          quality={85}
          placeholder={typeof image === "string" ? "empty" : "blur"}
        />
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-6 space-y-4">
        <header>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-stone-100 line-clamp-2">
            {title}
          </h3>
        </header>

        <p className="text-gray-600 dark:text-stone-300 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, isMobile ? 4 : technologies.length).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded no-select"
              >
                {tech}
              </span>
            ))}
            {isMobile && technologies.length > 4 && (
              <span className="px-2 py-1 text-xs font-mono bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded no-select">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        )}

        <footer>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="mobile-button w-full sm:w-auto text-center justify-center inline-flex items-center"
            aria-label={`View ${title} project (opens in new tab)`}
          >
            <span>View Project</span>
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </footer>
      </div>
    </article>
  );
};

export default ProjectCard;

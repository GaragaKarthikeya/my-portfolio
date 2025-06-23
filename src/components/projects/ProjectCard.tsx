import Image, { type StaticImageData } from "next/image";
import type { FC } from "react";
import type { Project } from "@/types";

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
  return (
    <article className="group bg-white dark:bg-stone-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
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
      <div className="p-6 space-y-4">
        <header>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-stone-100">
            {title}
          </h3>
        </header>

        <p className="text-gray-600 dark:text-stone-300 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <footer>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors duration-200"
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

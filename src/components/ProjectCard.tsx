import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  title: string;
  description: React.ReactNode;
  link: string;
  image?: string; // Made optional to handle missing images
  techStack?: string[];
}

export default function ProjectCard({
  title,
  description,
  link,
  image = "/images/placeholder.png", // Default placeholder
  techStack = [],
}: ProjectProps) {
  return (
    <div className="p-5 rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:scale-[1.02] transition-transform duration-200">
      {/* Image Section */}
      <div className="relative w-full h-[250px]">
        <Image
          src={image}
          width={400}
          height={250}
          alt={title}
          className="rounded-md object-cover w-full h-full"
        />
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-bold my-2 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {description}
      </p>

      {/* Tech Stack Badges */}
      {techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Project Link */}
      <Link
        href={link}
        className="mt-3 inline-block text-blue-500 font-medium hover:underline"
      >
        🚀 View Project
      </Link>
    </div>
  );
}

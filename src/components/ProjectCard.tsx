import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  title: string;
  description: React.ReactNode;
  link: string;
  image: string;
  techStack?: string[];
}

export default function ProjectCard({
  title,
  description,
  link,
  image,
  techStack,
}: ProjectProps) {
  return (
    <div className="p-5 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <Image
        src={image}
        width={400}
        height={250}
        alt={title}
        className="rounded-md"
      />
      <h3 className="text-xl font-bold my-2">{title}</h3>
      <div className="text-sm text-gray-600 dark:text-gray-300">{description}</div>
      <div className="mt-4">
        {techStack?.map((tech) => (
          <span
            key={tech}
            className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-full mr-2"
          >
            {tech}
          </span>
        ))}
      </div>
      <Link href={link} className="mt-3 inline-block text-blue-500">
        🔥 View Project
      </Link>
    </div>
  );
}

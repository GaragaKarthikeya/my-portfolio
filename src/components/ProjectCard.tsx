import Image from "next/image";

type ProjectProps = {
  title: string;
  description: string;
  link: string;
  image: string; // Path to image in /public/images
};

export default function ProjectCard({ title, description, link, image }: ProjectProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Optimized Image */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
          priority
        />
      </div>
      {/* Project Details */}
      <h3 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${title}`}
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
      >
        View Project
      </a>
    </div>
  );
}

export default function ProjectCard({ title, description, link, image }: ProjectProps) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Use standard img for debugging */}
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-t-xl"
        />
        <h3 className="text-2xl font-bold mt-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
        <a
          href={link}
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </a>
      </div>
    );
  }
  
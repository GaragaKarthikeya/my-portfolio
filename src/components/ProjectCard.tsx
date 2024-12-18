type ProjectProps = {
    title: string;
    description: string;
    link: string;
    image: string;
  };
  
  export default function ProjectCard({ title, description, link, image }: ProjectProps) {
    return (
      <div
        className="bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 overflow-hidden"
      >
        {/* Responsive Image */}
        <div className="relative w-full h-40 sm:h-48 md:block hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
  
        {/* Content */}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm mb-4">{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
          >
            View Project
          </a>
        </div>
      </div>
    );
  }
  
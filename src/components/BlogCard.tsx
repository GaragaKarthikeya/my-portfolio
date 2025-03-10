type BlogProps = {
  title: string;
  description: string;
  link: string;
  date: string;
};

export default function BlogCard({ title, description, link, date }: BlogProps) {
  return (
    <div className="group relative bg-white/70 dark:bg-gray-700/70 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm border border-white/40 dark:border-gray-700/50 p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Published: {date}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
      >
        Read More →
      </a>
    </div>
  );
}

import { useIsMobile, useHapticFeedback } from '@/hooks/useMobile';

type BlogProps = {
  title: string;
  description: string;
  link: string;
  date: string;
};

export default function BlogCard({ title, description, link, date }: BlogProps) {
  const isMobile = useIsMobile();
  const { impactLight } = useHapticFeedback();

  const handleClick = () => {
    if (isMobile) {
      impactLight();
    }
  };

  return (
    <article className="group mobile-card hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
      <div className="space-y-4">
        <header>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-stone-100 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-stone-400 mt-2">
            Published: {date}
          </p>
        </header>
        
        <p className="text-gray-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed line-clamp-3">
          {description}
        </p>
        
        <footer>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="mobile-button w-full sm:w-auto text-center justify-center inline-flex items-center no-select"
            aria-label={`Read "${title}" blog post (opens in new tab)`}
          >
            <span>Read More</span>
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
}

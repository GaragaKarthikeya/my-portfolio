"use client"; // Force client-side rendering

export default function Footer() {
  return (
    <footer className="w-full bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-300 py-6">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex space-x-6">
          <a
            href="https://github.com/GaragaKarthikeya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/karthikeya-garaga/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:Garaga.Karthikeya@iiitb.ac.in"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            Email Me
          </a>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-500">
          &copy; 2025 My Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

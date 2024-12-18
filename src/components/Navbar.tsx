import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 shadow-md">
      <div className="flex justify-between items-center px-8 py-4">
        <Link href="/" className="text-xl font-bold hover:text-blue-500">
          My Portfolio
        </Link>
        <ul className="flex space-x-6">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/projects">Projects</Link></li>
        </ul>
        <DarkModeToggle />
      </div>
    </nav>
  );
}

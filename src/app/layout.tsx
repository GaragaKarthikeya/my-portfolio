"use client";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./components/footer"; // Import the Footer component
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("Vercel Analytics Loaded");
  }, []);

  const pathname = usePathname();

  const linkClass = (path: string) =>
    `hover:text-blue-400 transition duration-200 ${
      pathname === path ? "text-blue-400 font-semibold" : "text-white"
    }`;

  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 px-8 py-4 shadow-md">
          <ul className="flex justify-center space-x-8 items-center">
            <li>
              <Link href="/" className={linkClass("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkClass("/about")}>
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className={linkClass("/projects")}>
                Projects
              </Link>
            </li>
          </ul>
        </nav>
        <main className="p-6">{children}</main>

        {/* Use the Footer Component */}
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}

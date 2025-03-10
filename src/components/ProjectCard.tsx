"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: React.ReactNode; // 💀🔥 Accepts JSX/React Components
  link: string;
  image: string;
  techStack: string[];
}

export default function ProjectCard({
  title,
  description,
  link,
  image,
  techStack,
}: ProjectCardProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl shadow-xl">
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className="rounded-lg"
      />
      <h2 className="text-2xl font-bold mt-4">{title}</h2>
      <div className="text-gray-600 dark:text-gray-300 my-2">
        {description} {/* 💀🔥 Now supports JSX */}
      </div>
      <div className="flex flex-wrap gap-2 my-3">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="text-sm bg-blue-500 text-white px-2 py-1 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>
      <Link
        href={link}
        target="_blank"
        className="text-blue-500 font-bold underline mt-3 inline-block"
      >
        🔗 View Project
      </Link>
    </div>
  );
}

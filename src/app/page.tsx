export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
        Welcome to My Portfolio
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Explore my projects, achievements, and blog posts!
      </p>
      <div className="flex space-x-4">
        <a
          href="/about"
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          About Me
        </a>
        <a
          href="/projects"
          className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
        >
          My Projects
        </a>
      </div>
    </div>
  );
}

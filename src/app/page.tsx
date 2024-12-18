export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">
        Welcome to My Portfolio
      </h1>
      <p className="text-gray-700 text-xl mb-8">
        Explore my projects, achievements, and blogs!
      </p>
      <div className="flex space-x-4">
        <a
          href="/about"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-shadow"
        >
          About Me
        </a>
        <a
          href="/projects"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-shadow"
        >
          Projects
        </a>
      </div>
    </div>
  );
}

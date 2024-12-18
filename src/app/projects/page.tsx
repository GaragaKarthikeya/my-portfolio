export default function Projects() {
    return (
      <div className="min-h-screen bg-white text-gray-800 p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Project 1 */}
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Project Title 1</h2>
            <p className="text-gray-600 mb-2">A brief description of the project.</p>
            <a
              href="#"
              className="text-blue-500 hover:underline"
            >
              View Project
            </a>
          </div>
          {/* Project 2 */}
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Project Title 2</h2>
            <p className="text-gray-600 mb-2">Another amazing project description.</p>
            <a
              href="#"
              className="text-blue-500 hover:underline"
            >
              View Project
            </a>
          </div>
          {/* Add more projects */}
        </div>
      </div>
    );
  }
  
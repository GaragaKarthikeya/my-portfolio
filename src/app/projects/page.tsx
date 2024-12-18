export default function Projects() {
  const projects = [
    {
      title: "Project Title 1",
      description: "A brief description of the project.",
      link: "#",
    },
    {
      title: "Project Title 2",
      description: "Another amazing project description.",
      link: "#",
    },
    // Add more projects here
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <a href={project.link} className="text-blue-500 hover:underline">
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
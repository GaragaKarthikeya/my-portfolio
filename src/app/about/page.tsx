export default function About() {
    return (
      <div className="min-h-screen bg-white text-gray-800 p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg leading-relaxed">
            Hello! I'm <span className="font-semibold">Karthikeya</span>, a passionate developer and learner. 
            I am currently in my first semester of college and love building beautiful and dynamic web experiences.
            This portfolio showcases my journey, projects, and everything I’m proud of.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Skills</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            <li className="bg-gray-100 p-2 rounded text-center shadow">HTML</li>
            <li className="bg-gray-100 p-2 rounded text-center shadow">CSS</li>
            <li className="bg-gray-100 p-2 rounded text-center shadow">JavaScript</li>
            <li className="bg-gray-100 p-2 rounded text-center shadow">React.js</li>
            <li className="bg-gray-100 p-2 rounded text-center shadow">Next.js</li>
            <li className="bg-gray-100 p-2 rounded text-center shadow">Tailwind CSS</li>
          </ul>
        </div>
      </div>
    );
  }
  
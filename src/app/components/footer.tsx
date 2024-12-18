"use client"; // Force client-side rendering

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-8">
      <div className="flex justify-center space-x-6">
        <a
          href="https://github.com/GaragaKarthikeya"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/karthikeya-garaga/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
        >
          LinkedIn
        </a>
        <a
          href="mailto:Garaga.Karthikeya@iiitb.ac.in"
          className="hover:text-blue-400 transition"
        >
          Email Me
        </a>
      </div>
      <p className="mt-4">&copy; 2024 My Portfolio. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

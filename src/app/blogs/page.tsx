"use client";

import { motion } from "framer-motion";
import BlogCard from "@/components/blog/BlogCard";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import blogs from "@/constants/blogs.json";

export default function BlogsPage() {
  return (
    <>
      <NeuralBackground />
      <div className="relative z-10 min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto mb-12 p-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl shadow-2xl"
        >
          <div className="rounded-2xl p-10 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-100">
              My Blogs
            </h1>
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-6xl mx-auto p-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <div className="rounded-2xl p-8 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard
                  title={blog.title}
                  description={blog.description}
                  link={blog.link}
                  date={blog.date}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

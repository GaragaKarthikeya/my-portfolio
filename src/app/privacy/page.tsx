"use client";

import { motion } from "framer-motion";
import { NeuralBackground } from "@/components/ui/NeuralBackground";

export default function PrivacyPolicy() {
  return (
    <>
      {/* Neural Network Background */}
      <NeuralBackground />

      {/* Ultra Glossy Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-transparent px-6 py-10">
        {/* Main Heading Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-4xl p-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl shadow-2xl mb-8"
        >
          <div className="rounded-2xl p-10 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
              Privacy Policy
            </h1>
          </div>
        </motion.div>

        {/* Privacy Policy Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-4xl p-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl shadow-2xl"
        >
          <div className="rounded-2xl p-8 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm text-left space-y-8">
            <section className="rounded-2xl p-6 bg-white/70 dark:bg-gray-700/70 shadow-inner">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                1. Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                Welcome to my portfolio website. This Privacy Policy explains how I collect, use, and protect your personal information when you visit my site. By using this website, you agree to the terms outlined in this policy.
              </p>
            </section>

            <section className="rounded-2xl p-6 bg-white/70 dark:bg-gray-700/70 shadow-inner">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                2. Information I Collect
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                I may collect the following types of information:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li className="rounded-xl p-2">
                  <strong>Personal Information:</strong> Such as your name and email address, if you choose to contact me or subscribe to my newsletter.
                </li>
                <li className="rounded-xl p-2">
                  <strong>Usage Data:</strong> Information about how you interact with my website, including your IP address, browser type, and pages visited.
                </li>
                <li className="rounded-xl p-2">
                  <strong>Cookies:</strong> Small data files stored on your device to enhance your browsing experience.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl p-6 bg-white/70 dark:bg-gray-700/70 shadow-inner">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                3. How I Use Your Information
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li className="rounded-xl p-2">To respond to your inquiries or requests.</li>
                <li className="rounded-xl p-2">To send you updates or newsletters, if you have subscribed.</li>
                <li className="rounded-xl p-2">To analyze website traffic and improve user experience.</li>
              </ul>
            </section>

            <section className="rounded-2xl p-6 bg-white/70 dark:bg-gray-700/70 shadow-inner">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                4. Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                I take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is completely secure, and I cannot guarantee absolute security.
              </p>
            </section>

            <section className="rounded-2xl p-6 bg-white/70 dark:bg-gray-700/70 shadow-inner">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                5. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                This website may use third-party services (e.g., Google Analytics, EmailJS) that collect, monitor, and analyze information to improve user experience. These services have their own privacy policies, and I encourage you to review them.
              </p>
            </section>

            <section className="rounded-2xl p-6 bg-white/70 dark:bg-gray-700/70 shadow-inner">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                6. Your Rights
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li className="rounded-xl p-2">Access, update, or delete your personal information.</li>
                <li className="rounded-xl p-2">Opt out of receiving communications from me.</li>
                <li className="rounded-xl p-2">Request details about how your data is being used.</li>
              </ul>
            </section>

            <section className="rounded-2xl p-6 bg-white/70 dark:bg-gray-700/70 shadow-inner">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                I may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will be effective immediately upon posting.
              </p>
            </section>

            <section className="rounded-2xl p-6 bg-white/70 dark:bg-gray-700/70 shadow-inner">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
                8. Contact Me
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                If you have any questions about this Privacy Policy, please contact me at:
              </p>
              <p className="mt-4">
                <a
                  href="mailto:Garaga.Karthikeya@iiitb.ac.in"
                  className="text-blue-500 dark:text-blue-400 hover:underline text-lg"
                >
                  Garaga.Karthikeya@iiitb.ac.in
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}

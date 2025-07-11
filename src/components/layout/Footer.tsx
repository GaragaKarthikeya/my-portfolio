"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import emailjs from '@emailjs/browser';

type GtagFunction = (
  command: string,
  eventName: string,
  eventParams?: Record<string, unknown>
) => void;

interface FormState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  successMessage: string | null;
}

export default function Footer() {
  const form = useRef<HTMLFormElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const creationYear = 2024;
  const currentYear = new Date().getFullYear();
  const yearRange = currentYear > creationYear ? `${creationYear}-${currentYear}` : creationYear;
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<FormState>({
    isLoading: false,
    isSuccess: false,
    error: null,
    successMessage: null,
  });
  const [submittedEmails, setSubmittedEmails] = useState<Set<string>>(new Set());
  const [inputFocused, setInputFocused] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load subscribed emails from localStorage
  useEffect(() => {
    try {
      const storedEmails = localStorage.getItem('subscribedEmails');
      if (storedEmails) {
        setSubmittedEmails(new Set(JSON.parse(storedEmails)));
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Show back-to-top button when scrolling past 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    if (!form.current) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Form configuration error. Please try again later.",
      }));
      return;
    }

    const formData = new FormData(form.current);
    const email = formData.get('user_email') as string;

    if (!validateEmail(email)) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Please enter a valid email address",
      }));
      return;
    }

    if (submittedEmails.has(email)) {
      setState(prev => ({ 
        ...prev,
        isLoading: false,
        successMessage: "You're already subscribed!",
      }));
      setTimeout(() => setState(s => ({ ...s, successMessage: null })), 3000);
      return;
    }

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      const updatedEmails = new Set([...submittedEmails, email]);
      try {
        localStorage.setItem('subscribedEmails', JSON.stringify([...updatedEmails]));
      } catch (storageError) {
        console.error('Error storing email in localStorage:', storageError);
      }
      setSubmittedEmails(updatedEmails);

      setState({
        isLoading: false,
        isSuccess: true,
        error: null,
        successMessage: "Thank you for subscribing! 🎉",
      });

      form.current.reset();
      setTimeout(() => {
        setState(s => ({ ...s, successMessage: null, isSuccess: false }));
      }, 5000);

      trackAnalyticsEvent('newsletter_subscription');

    } catch (error: unknown) {
      console.error('EmailJS Error:', error);
      setState({
        isLoading: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : "Subscription failed. Please try again.",
        successMessage: null,
      });
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const trackAnalyticsEvent = (eventName: string) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as Window & { gtag?: GtagFunction }).gtag?.('event', eventName, {
        event_category: 'engagement',
        event_label: 'Newsletter Subscription',
      });
    }
  };

  const slideIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { type: 'spring', bounce: 0.4, duration: 0.8 }
    }
  };

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <footer className="relative w-full bg-transparent py-6">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center space-y-8">
            <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 w-full mb-8 rounded-full" />
            <p className="text-center">Loading...</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <>
      {/* Progress Bar with warm gradient */}
      <motion.div
        style={{ scaleX }}
        className="h-1 bg-gradient-to-r from-orange-500 to-rose-500 fixed bottom-0 left-0 right-0 origin-left z-50"
      />

      {/* Footer with Transparent Background in Both Light and Dark Modes */}
      <motion.footer 
        className="relative w-full bg-transparent text-gray-800 dark:text-stone-300 py-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
          <div className="flex flex-col items-center space-y-8">
            <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 w-full mb-8 rounded-full" />
            <motion.div 
              className="w-full max-w-xs sm:max-w-md"
              variants={slideIn}
              initial="hidden"
              animate="visible"
            >
              {state.successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg mb-4"
                >
                  {state.successMessage}
                </motion.div>
              )}
              {state.error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg mb-4"
                >
                  {state.error}
                </motion.div>
              )}
              <div className="group relative">
                <form 
                  ref={form} 
                  onSubmit={sendEmail} 
                  className="flex flex-col gap-3 w-full"
                >
                  <motion.input
                    type="email"
                    name="user_email"
                    placeholder="Email address"
                    className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none bg-orange-100 dark:bg-stone-700 text-orange-800 dark:text-orange-200 placeholder-orange-500 dark:placeholder-stone-400"
                    required
                    disabled={state.isLoading}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    animate={
                      inputFocused
                        ? { scale: 1.02, boxShadow: '0 0 0 2px rgba(249, 115, 22, 0.5)' }
                        : { scale: 1, boxShadow: 'none' }
                    }
                  />
                  <motion.button
                    type="submit"
                    className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-medium relative overflow-hidden"
                    disabled={state.isLoading}
                    whileHover={!state.isLoading ? { scale: 1.05 } : undefined}
                    whileTap={!state.isLoading ? { scale: 0.95 } : undefined}
                  >
                    {state.isLoading && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-white/30"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {state.isLoading ? (
                        <>
                          <SpinnerIcon />
                          Subscribing...
                        </>
                      ) : (
                        'Get Updates'
                      )}
                    </div>
                  </motion.button>
                </form>
                <div className="absolute -top-8 right-2 bg-stone-800 dark:bg-stone-700 text-white dark:text-orange-200 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  I'll never spam you
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                Join the newsletter for updates
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 text-center mt-2">
                I respect your privacy. Unsubscribe at any time.
                <br />
                <a 
                  href="/privacy"
                  className="text-orange-500 dark:text-orange-400 hover:underline"
                  aria-label="View privacy policy"
                >
                  Privacy Policy
                </a>
              </p>
            </motion.div>
            <motion.div 
              className="flex space-x-5 px-2 w-full justify-center"
              variants={slideIn}
            >
              <SocialLink href="https://github.com/GaragaKarthikeya" label="GitHub">
                <GitHubIcon />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/karthikeya-garaga/" label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
              <SocialLink href="mailto:Garaga.Karthikeya@iiitb.ac.in" label="Email">
                <EmailIcon />
              </SocialLink>
            </motion.div>
            <motion.p 
              className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 text-center px-4"
              variants={slideIn}
            >
              &copy; {yearRange} Karthikeya Garaga. All rights reserved.<br className="sm:hidden" />
              Built with <span className="text-orange-500 dark:text-orange-400">Next.js</span> &amp; <span className="text-rose-500 dark:text-rose-400">Tailwind</span>
            </motion.p>
          </div>
        </div>
      </motion.footer>

      {/* Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && <BackToTopButton key="back-to-top" />}
      </AnimatePresence>
    </>
  );
}

// Back-to-Top Button with click-to-play sound effect
const BackToTopButton = () => {
  const handleClick = () => {
    const audio = new Audio('/sounds/hover.mp3');
    audio.play().catch(err => console.error('Failed to play sound:', err));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-20 right-5 p-3 bg-gradient-to-r from-orange-600 to-rose-600 text-white rounded-full shadow-lg z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Back to top"
    >
      <ChevronUpIcon />
    </motion.button>
  );
};

const ChevronUpIcon = memo(function ChevronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );
});
ChevronUpIcon.displayName = 'ChevronUpIcon';

const SocialLink = memo(function SocialLink({ 
  href, 
  children, 
  label 
}: { 
  href: string; 
  children: React.ReactNode;
  label: string; 
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg hover:bg-orange-200 dark:hover:bg-stone-700 transition-colors"
      aria-label={label}
      whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        whileHover={{ rotateY: 10, rotateX: -5, transition: { type: 'spring' } }}
        className="w-6 h-6 block text-gray-800 dark:text-gray-200"
      >
        {children}
      </motion.span>
    </motion.a>
  );
});
SocialLink.displayName = 'SocialLink';

const GitHubIcon = memo(function GitHubIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.253-4.555-1.113-4.555-4.951 0-1.305.465-2.385 1.23-3.225-.12-.253-.446-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 3.848-2.805 4.695-5.475 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
});
GitHubIcon.displayName = 'GitHubIcon';

const LinkedInIcon = memo(function LinkedInIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
});
LinkedInIcon.displayName = 'LinkedInIcon';

const EmailIcon = memo(function EmailIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    </svg>
  );
});
EmailIcon.displayName = 'EmailIcon';

const SpinnerIcon = memo(function SpinnerIcon() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
});
SpinnerIcon.displayName = 'SpinnerIcon';

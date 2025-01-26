import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-white">
      <div className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="border-t border-gray-100 pt-8 dark:border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © Company 2025 ARENA. All rights reserved.
            </p>
            <Link href={"/arenasignup"} className="inline-flex border-black items-center gap-2 rounded-full border  bg-black px-8 py-3 text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:bg-white/90 py-12 px-4 sm:px-6 lg:px-8">
              <span className="text-sm font-medium">Register</span>
              <svg
                className="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


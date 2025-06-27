"use client";

import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black text-black dark:text-white py-4 sm:py-6">
      <div className="container mx-auto px-2 sm:px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-3 sm:mb-4 md:mb-0">
          <p className="text-base sm:text-sm text-gray-700 dark:text-white">
            © 2024 Tiny Vothena. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-start space-x-2 sm:space-x-4 mt-1 sm:mt-2">
            <Link
              href="/cookie-policy"
              className="text-sm sm:text-xs hover:underline text-gray-600 dark:text-gray-300 p-2"
            >
              Cookie Policy
            </Link>
            <Link
              href="/legal"
              className="text-sm sm:text-xs hover:underline text-gray-600 dark:text-gray-300 p-2"
            >
              Legal
            </Link>
            <Link
              href="/starliumcircus"
              className="text-sm sm:text-xs hover:underline text-gray-600 dark:text-gray-300 p-2"
            >
              Starlium Circus
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            href="https://instagram.com/tinyvothena"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 dark:hover:text-gray-300 text-black dark:text-white p-3 sm:p-0"
          >
            <Instagram size={20} />
          </Link>
          <Link
            href="https://x.com/tinyvothena"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 dark:hover:text-gray-300 text-black dark:text-white p-3 sm:p-0"
          >
            <Twitter size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

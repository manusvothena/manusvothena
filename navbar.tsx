"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/logo";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isStarliumCircusPage = pathname === "/starliumcircus";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Fragments", href: "/fragments" },
    { name: "Dream Maps", href: "/dreammaps" },
    { name: "Dreams", href: "/dreams" },
    { name: "Starlium Circus", href: "/starliumcircus" },
  ];

  if (!isHomePage && !mounted) return null;
  if (isHomePage) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/70 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors text-sm uppercase tracking-wider font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="text-white z-50 p-3 sm:p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center z-40"
            >
              <nav className="flex flex-col items-center gap-6 sm:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors text-xl uppercase tracking-wider font-medium p-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Navbar;

import React from "react";
import Link from "next/link";
import { Cable } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6 text-lg font-semibold tracking-wide text-white">
        <div className="flex items-center gap-2 hover:opacity-85 transition-opacity">
          <Cable size={22} className="text-red-500" />
          <Link href="/">ClipLink</Link>
        </div>
        <nav>
          <ul className="flex items-center gap-6 text-sm sm:text-base">
            <li>
              <Link href="/" className="hover:text-red-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shorten" className="hover:text-red-400 transition-colors">
                Shorten
              </Link>
            </li>
            <li>
              <Link 
                href="https://github.com/Anubhab38/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-red-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

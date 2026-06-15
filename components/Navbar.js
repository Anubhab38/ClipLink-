import React from "react";
import Link from "next/link";
import { Link2, Cable } from "lucide-react";
const Navbar = () => {
  return (
    <div
      className="flex justify-between items-center h-16 p-5 text-xl font-bold tracking-wide 
                      opacity sticky top-0"
    >
      <div className="flex items-center gap-2">
        <Cable size={20} />
        <Link href="/">ClipLink</Link>
      </div>
      <ul className="flex justify-center items-center gap-4">
        <Link href="/" className="hover:text-blue-500">
          <li>Home</li>
        </Link>
        <Link href="shorten/" className="hover:text-blue-500">
          <li>Shorten</li>
        </Link>
        <Link href="https://github.com/Anubhab38/" className="hover:text-blue-500">
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  );};

export default Navbar;

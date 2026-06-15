import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-3">
      <div className="flex flex-col items-center gap-2 text-sm text-gray-300">
        <p>© 2026 ClipLink. All rights reserved.</p>
        <p>
          Built with Next.js and MongoDB
        </p>

        <div className="flex gap-4">
          <Link
            href="/"
            className="hover:text-white transition-colors"
          >
            Home
          </Link>

          <Link
            href="/shorten"
            className="hover:text-white transition-colors"
          >
            Shorten
          </Link>

          <Link
            href="https://github.com/Anubhab38/"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://x.com/apz_999/"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            X
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
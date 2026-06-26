import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
      <section className="max-w-4xl w-full text-center flex flex-col items-center gap-6 md:gap-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
          Shorter Links.<br className="hidden sm:inline" /> Lesser Stress.
        </h1>

        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-200/90 leading-relaxed font-medium">
          Shorten your URLs instantly with ClipLink - fast, simple, and
          reliable URL shortening. No login or sign up required. Shorten your
          URLs on the go.
        </p>

        <Link href="/shorten">
          <button className="bg-red-800 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all active:scale-95 shadow-lg shadow-red-900/30 hover:shadow-red-800/40 cursor-pointer">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
}

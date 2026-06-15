import Link from "next/link";
export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center pt-60">
      <section className="grid grid-cols-2 gap-16 items-center max-w-7xl px-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-extrabold tracking-wider text-clip ">
            Shorter Links. Lesser Stress.
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-100 text-clip">
            Shorten your URLs instantly with ClipLink - fast, simple, and
            reliable URL shortening. No login or sign up required. Shorten your
            URLs on the go.
          </p>
          <Link href="/shorten/">
            <button className="self-center bg-red-800 text-white px-6 py-3 rounded-lg w-fit font-semibold tracking-wide text-clip active:scale-95">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

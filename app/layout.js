import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import Silk from "@/components/Silk";
import Footer from "@/components/Footer";
const zalando = localFont({
  src: [
    {
      path: "./fonts/ZalandoSansSemiExpanded-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ZalandoSansSemiExpanded-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ZalandoSansSemiExpanded-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/ZalandoSansSemiExpanded-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-zalando",
});

export const metadata = {
  title: "ClipLink",
  description:
    "Shorten your URLs instantly with ClipLink - fast, simple, and reliable URL shortening.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${zalando.variable} h-full antialiased`}
    >
      <body className={`min-h-screen flex flex-col ${zalando.className}`}>
        <div className="fixed inset-0 -z-10 ">
          <Silk 
            speed={5}
            scale={1}
            color="#21398c"
            noiseIntensity={2.6}
            rotation={3.4}
          />
        </div>
        <Navbar/>
        <main className="flex-1"> 
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}

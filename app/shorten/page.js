"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import QRCode from "react-qr-code";

const Shorten = () => {
  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [generated, setgenerated] = useState(false);
  const [error, seterror] = useState("");
  const [copy, setcopy] = useState(false);

  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: shorturl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (!url.trim()) {
      setgenerated(false);
      seterror("Please enter the URL");
      return;
    }
    try {
      new URL(url);
    } catch {
      setgenerated(false);
      seterror("Please enter a valid URL");
      return;
    }
    seterror("");

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        seturl("");
        setshorturl("");
        seterror("");
        setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${result.shorturl}`);
      })
      .catch(() => {
        setgenerated(false);
        seterror("Unable to generate URL. Please try again.");
      });
  };
  let copied = async () => {
    await navigator.clipboard.writeText(generated);
    setcopy(true);

    setTimeout(() => {
      setcopy(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-start pt-16 md:pt-28 px-4 pb-12">
      <div className="flex flex-col w-full max-w-[500px] gap-6 p-6 md:p-8 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-lg shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center tracking-wide text-white">
          Shorten a Link
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider pl-1">
              Destination URL
            </label>
            <input
              type="text"
              value={url}
              placeholder="https://example.com/very-long-url"
              className="bg-white/5 border border-white/10 text-white p-3 rounded-xl font-medium focus:border-red-500/50 focus:bg-white/10 focus:outline-none transition-all duration-200 placeholder-gray-500 text-sm"
              onChange={(a) => {
                seturl(a.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider pl-1">
              Custom Alias (Optional)
            </label>
            <input
              type="text"
              value={shorturl}
              placeholder="my-custom-alias"
              className="bg-white/5 border border-white/10 text-white p-3 rounded-xl font-medium focus:border-red-500/50 focus:bg-white/10 focus:outline-none transition-all duration-200 placeholder-gray-500 text-sm"
              onChange={(a) => {
                setshorturl(a.target.value);
              }}
            />
          </div>
        </div>

        <button
          className="self-center rounded-xl active:scale-95 px-6 py-3 font-bold bg-red-800 hover:bg-red-700 text-white text-sm transition-all duration-200 shadow-lg shadow-red-900/20 hover:shadow-red-800/40 w-full sm:w-auto sm:px-10 cursor-pointer"
          onClick={generate}
        >
          Generate Short Link
        </button>

        {(generated || error) && (
          <div className="mt-2 flex flex-col items-center gap-4 w-full">
            {generated && (
              <div className="flex items-center justify-between gap-3 p-3.5 bg-green-500/10 border border-green-500/20 rounded-xl w-full">
                <Link
                  target="_blank"
                  href={generated}
                  className="hover:underline text-green-400 break-all font-semibold text-sm transition-colors"
                >
                  {generated}
                </Link>

                <button
                  onClick={copied}
                  className="p-2 rounded-lg hover:bg-green-500/20 text-green-400 transition shrink-0 cursor-pointer"
                  title="Copy link"
                >
                  {copy ? (
                    <Check size={18} strokeWidth={2.5} />
                  ) : (
                    <Copy size={18} strokeWidth={2.5} />
                  )}
                </button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl w-full text-center">
                <p className="text-red-400 text-sm font-semibold">{error}</p>
              </div>
            )}

            {generated && (
              <div className="mt-2 flex flex-col items-center gap-2">
                <div className="p-3 bg-white rounded-2xl shadow-xl">
                  <QRCode
                    value={generated}
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
                <p className="text-xs font-semibold text-gray-400">Scan QR Code to open</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Shorten;

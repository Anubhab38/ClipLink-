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
    <div className="flex justify-center items-start pt-32">
      <div className="flex flex-col w-[500px] gap-4 p-5 rounded-xl">
        <h1 className="text-2xl font-semibold text-center tracking-wide">
          Generate your shortened URL
        </h1>

        <input
          type="text"
          value={url}
          placeholder="Enter your URL"
          className="bg-gray-800 text-white p-2 rounded font-medium border-black "
          onChange={(a) => {
            seturl(a.target.value);
          }}
        />

        <input
          type="text"
          value={shorturl}
          placeholder="Enter custom alias (optional)"
          className="bg-gray-800 text-white p-2 rounded font-medium border-black "
          onChange={(a) => {
            setshorturl(a.target.value);
          }}
        />

        <button
          className=" self-center rounded-lg active:scale-90 px-4 py-2 border font-semibold border-black bg-red-800 text-white text-sm "
          onClick={generate}
        >
          Generate
        </button>
        <>
          <div className="mt-1 h-5 ml-4 font-semibold">
            {generated && (
              <code>
                YOUR URL:{" "}
                <Link
                  target="_blank"
                  href={generated}
                  className="hover:underline hover:text-green-600"
                >
                  {generated}
                </Link>
                <button
                  onClick={copied}
                  className="ml-2 p-2 rounded-md hover:bg-gray-800 transition justify-end-safe items-end-safe place-content-end"
                >
                  {copy ? (
                    <Check size={20} strokeWidth={1.25} />
                  ) : (
                    <Copy size={20} strokeWidth={1.25} />
                  )}
                </button>
              </code>
            )}

            {error && <p>{error}</p>}
          </div>
          <div>
            {generated && (
              <div className="mt-5 flex flex-col items-center">
                <QRCode
                  value={generated}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  className="p-2 bg-white rounded-xl"
                />

                <p className="mt-3 text-sm text-gray-100">
                  Scan to open
                </p>
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  );
};
export default Shorten;
